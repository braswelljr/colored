import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COLOR } from '~/types/color'
import { generateRandomHexColorArray, getColorName } from '~/utils/color'

export async function GET(request: NextRequest) {
  // get query string parameters
  const { total: t, pallete: p } = Object.fromEntries(new URL(request.url).searchParams)
  const total = parseInt(t) || 100 // total number of palletes to generate
  const palleteLen = parseInt(p) || 5 // number of colors in each pallete

  let palletes: COLOR[][] = []

  // Generate unique random colors asynchronously using Promise.all and avoid duplicates
  await Promise.all(
    Array.from({ length: total }, () => {
      const colors: COLOR[] = []

      while (colors.length < palleteLen) {
        const color = generateRandomHexColorArray(1)[0]
        const colorName = getColorName(color)
        const nc = { name: colorName.name, hex: colorName.color }

        if (!colors.includes(nc)) colors.push(nc)
      }

      palletes.push(colors)
    })
  )

  return NextResponse.json({ palletes })
}
