// // ==================== UNIT TESTS ====================

// import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
// import * as fs from 'fs';

// // Mock dependencies
// vi.mock('color-name-list', () => ({
//   colornames: [
//     { name: 'Red', hex: '#ff0000' },
//     { name: 'Green', hex: '#00ff00' },
//     { name: 'Blue', hex: '#0000ff' },
//     { name: 'White', hex: '#ffffff' },
//     { name: 'Black', hex: '#000000' }
//   ]
// }));

// vi.mock('nearest-color', () => ({
//   default: {
//     from: vi.fn(() => vi.fn((hex: string) => ({ name: 'NearestColor' })))
//   }
// }));

// vi.mock('fs');
// vi.mock('path');

// describe('Color Generator Functions', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     // Clear the color cache
//     colorCache.clear();
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   describe('getColorName', () => {
//     it('should return exact color match', () => {
//       const result = getColorName('#ff0000');
//       expect(result).toEqual({ name: 'Red', hex: '#ff0000' });
//     });

//     it('should handle colors without # prefix', () => {
//       const result = getColorName('ff0000');
//       expect(result).toEqual({ name: 'Red', hex: '#ff0000' });
//     });

//     it('should cache color lookups', () => {
//       const color1 = getColorName('#ff0000');
//       const color2 = getColorName('#ff0000');
//       expect(color1).toBe(color2); // Should be same reference
//     });

//     it('should handle case insensitive hex colors', () => {
//       const result1 = getColorName('#FF0000');
//       const result2 = getColorName('#ff0000');
//       expect(result1).toEqual(result2);
//     });

//     it('should throw error for invalid hex color', () => {
//       expect(() => getColorName('invalid')).toThrow('Invalid hex color format');
//       expect(() => getColorName('#xyz123')).toThrow('Invalid hex color format');
//       expect(() => getColorName('')).toThrow('Invalid hex color provided');
//       expect(() => getColorName(null as any)).toThrow('Invalid hex color provided');
//     });

//     it('should find nearest color for non-exact matches', () => {
//       const result = getColorName('#ff0001'); // Close to red but not exact
//       expect(result.name).toBe('NearestColor');
//       expect(result.hex).toBe('#ff0001');
//     });
//   });

//   describe('generateRandomHexColor', () => {
//     it('should generate valid hex color format', () => {
//       const color = generateRandomHexColor();
//       expect(color).toMatch(/^#[0-9a-f]{6}$/);
//     });

//     it('should generate different colors on multiple calls', () => {
//       const colors = Array.from({ length: 10 }, () => generateRandomHexColor());
//       const uniqueColors = new Set(colors);
//       expect(uniqueColors.size).toBeGreaterThan(1);
//     });
//   });

//   describe('generateColorList', () => {
//     it('should generate requested number of colors', () => {
//       const colors = generateColorList(5);
//       expect(colors).toHaveLength(5);
//       expect(colors[0]).toHaveProperty('name');
//       expect(colors[0]).toHaveProperty('hex');
//     });

//     it('should generate unique colors', () => {
//       const colors = generateColorList(10);
//       const hexValues = colors.map(c => c.hex);
//       const uniqueHex = new Set(hexValues);
//       expect(uniqueHex.size).toBe(colors.length);
//     });

//     it('should throw error for invalid count', () => {
//       expect(() => generateColorList(0)).toThrow('Count must be positive');
//       expect(() => generateColorList(-5)).toThrow('Count must be positive');
//     });

//     it('should handle default parameter', () => {
//       const colors = generateColorList();
//       expect(colors.length).toBe(CONFIG.TOTAL_COLORS);
//     });
//   });

//   describe('generatePalettesFromColorList', () => {
//     const mockColors: NamedColorType[] = [
//       { name: 'Red', hex: '#ff0000' },
//       { name: 'Green', hex: '#00ff00' },
//       { name: 'Blue', hex: '#0000ff' },
//       { name: 'Yellow', hex: '#ffff00' },
//       { name: 'Purple', hex: '#800080' }
//     ];

//     it('should generate requested number of palettes', () => {
//       const palettes = generatePalettesFromColorList(mockColors, 5, 2, 3);
//       expect(palettes).toHaveLength(5);
//     });

//     it('should respect palette length constraints', () => {
//       const palettes = generatePalettesFromColorList(mockColors, 10, 2, 4);
//       palettes.forEach(palette => {
//         expect(palette.length).toBeGreaterThanOrEqual(2);
//         expect(palette.length).toBeLessThanOrEqual(4);
//       });
//     });

//     it('should throw error for empty color list', () => {
//       expect(() => generatePalettesFromColorList([], 5)).toThrow('Color list cannot be empty');
//     });

//     it('should throw error for invalid parameters', () => {
//       expect(() => generatePalettesFromColorList(mockColors, 0)).toThrow('Total must be positive');
//       expect(() => generatePalettesFromColorList(mockColors, 5, 0, 3)).toThrow('Invalid palette length constraints');
//       expect(() => generatePalettesFromColorList(mockColors, 5, 5, 3)).toThrow('Invalid palette length constraints');
//     });

//     it('should use default parameters', () => {
//       const palettes = generatePalettesFromColorList(mockColors, 3);
//       expect(palettes).toHaveLength(3);
//       palettes.forEach(palette => {
//         expect(palette.length).toBeGreaterThanOrEqual(CONFIG.MIN_COLORS_PER_PALETTE);
//         expect(palette.length).toBeLessThanOrEqual(CONFIG.MAX_COLORS_PER_PALETTE);
//       });
//     });
//   });

//   describe('generateColorsFile', () => {
//     beforeEach(() => {
//       vi.mocked(fs.existsSync).mockReturnValue(false);
//       vi.mocked(fs.readFileSync).mockReturnValue('');
//       vi.mocked(fs.writeFileSync).mockImplementation(() => {});
//     });

//     it('should generate new file when none exists', () => {
//       vi.mocked(fs.existsSync).mockReturnValue(false);

//       generateColorsFile('/test-colors.ts');

//       expect(fs.writeFileSync).toHaveBeenCalledWith(
//         expect.stringContaining('test-colors.ts'),
//         expect.stringContaining('export const colors'),
//         'utf-8'
//       );
//     });

//     it('should reuse existing colors when file exists', () => {
//       vi.mocked(fs.existsSync).mockReturnValue(true);
//       vi.mocked(fs.readFileSync).mockReturnValue(`
//         export const colors: NamedColorType[] = [
//           { name: 'Red', hex: '#ff0000' },
//           { name: 'Blue', hex: '#0000ff' }
//         ];
//       `);

//       const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

//       generateColorsFile('/test-colors.ts');

//       expect(consoleLogSpy).toHaveBeenCalledWith(
//         expect.stringContaining('Reusing 2 colors')
//       );

//       consoleLogSpy.mockRestore();
//     });

//     it('should handle file read errors gracefully', () => {
//       vi.mocked(fs.existsSync).mockReturnValue(true);
//       vi.mocked(fs.readFileSync).mockImplementation(() => {
//         throw new Error('File read error');
//       });

//       const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

//       expect(() => generateColorsFile('/test-colors.ts')).not.toThrow();
//       expect(consoleErrorSpy).toHaveBeenCalled();

//       consoleErrorSpy.mockRestore();
//     });
//   });

//   describe('toTsObject', () => {
//     it('should serialize simple objects correctly', () => {
//       const obj = { name: 'Red', hex: '#ff0000' };
//       const result = toTsObject(obj);
//       expect(result).toContain("name: 'Red'");
//       expect(result).toContain("hex: '#ff0000'");
//     });

//     it('should serialize arrays correctly', () => {
//       const arr = [1, 2, 3];
//       const result = toTsObject(arr);
//       expect(result).toContain('1,');
//       expect(result).toContain('2,');
//       expect(result).toContain('3');
//     });

//     it('should handle null and undefined', () => {
//       expect(toTsObject(null)).toBe('null');
//       expect(toTsObject(undefined)).toBe('null');
//     });

//     it('should handle primitive types', () => {
//       expect(toTsObject('test')).toBe("'test'");
//       expect(toTsObject(42)).toBe('42');
//       expect(toTsObject(true)).toBe('true');
//     });

//     it('should escape strings properly', () => {
//       expect(toTsObject("test'quote")).toBe("'test\\'quote'");
//       expect(toTsObject("test\nline")).toBe("'test\\nline'");
//     });
//   });

//   describe('CONFIG constants', () => {
//     it('should have reasonable default values', () => {
//       expect(CONFIG.TOTAL_COLORS).toBeGreaterThan(0);
//       expect(CONFIG.TOTAL_PALETTES).toBeGreaterThan(0);
//       expect(CONFIG.MIN_COLORS_PER_PALETTE).toBeGreaterThan(0);
//       expect(CONFIG.MAX_COLORS_PER_PALETTE).toBeGreaterThanOrEqual(CONFIG.MIN_COLORS_PER_PALETTE);
//     });
//   });
// });

// // Integration tests
// describe('Integration Tests', () => {
//   it('should generate complete color workflow', () => {
//     const colors = generateColorList(10);
//     expect(colors).toHaveLength(10);

//     const palettes = generatePalettesFromColorList(colors, 3, 2, 4);
//     expect(palettes).toHaveLength(3);

//     palettes.forEach(palette => {
//       expect(palette.length).toBeGreaterThanOrEqual(2);
//       expect(palette.length).toBeLessThanOrEqual(4);
//       palette.forEach(color => {
//         expect(color).toHaveProperty('name');
//         expect(color).toHaveProperty('hex');
//         expect(color.hex).toMatch(/^#[0-9a-f]{6}$/);
//       });
//     });
//   });
// });
