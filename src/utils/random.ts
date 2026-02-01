/**
 * randomId - generates a random id
 * @returns string
 */
export function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Generates a random hex color seeded by the current time.
 * Uses timestamp to ensure unique colors on each call.
 * @returns string - A random hex color (e.g., "#3b82f6")
 */
export function randomColor(): string {
  const timestamp = Date.now();
  // Combine timestamp with random for uniqueness
  const seed = timestamp + Math.random() * 1000;
  const color =
    '#' +
    Math.floor((seed * 0xffffff) % 0xffffff)
      .toString(16)
      .padStart(6, '0');
  return color;
}

/**
 * Generates a random hex color with a custom seed value.
 * Useful for reproducible colors.
 * @param seed - A number to use as the seed
 * @returns string - A random hex color based on the seed
 */
export function seededRandomColor(seed: number): string {
  const color =
    '#' +
    Math.floor((seed * 0xffffff) % 0xffffff)
      .toString(16)
      .padStart(6, '0');
  return color;
}
