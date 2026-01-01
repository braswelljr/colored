import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { PaletteType } from '~/types/types';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/palettes.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(fileContent);

    // Normalize response (unwrap { data: ... } if it exists)
    let data: PaletteType[] = [];

    if (json?.data && Array.isArray(json.data)) {
      data = json.data as PaletteType[];
    }

    if (Array.isArray(json)) {
      data = json as PaletteType[];
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading palettes:', error);
    return NextResponse.json([], { status: 500 });
  }
}
