import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateRandomHexColor, getColorName } from '~/utils/color'

export async function GET(request: NextRequest) {
  // get total number of palettes to generate from the query string
  const { total: t } = Object.fromEntries(new URL(request.url).searchParams)
  const total = parseInt(t) || 180

  // generate unique random hex colors efficiently and remove duplicates
  let colors: string[] = []

  while (colors.length < total) {
    const color = generateRandomHexColor()
    if (!colors.includes(color)) colors.push(color)
  }

  return NextResponse.json({
    colors: colors.map(color => {
      const colorName = getColorName(color)
      return { name: colorName.name, hex: colorName.color }
    })
  })
}
