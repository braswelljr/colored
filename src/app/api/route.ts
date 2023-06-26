import { NextResponse } from 'next/server'
import { siteConfig } from '~/config/site'

export async function GET() {
  return NextResponse.json({ app: siteConfig.title, message: siteConfig.description })
}
