import { ReadonlyURLSearchParams } from 'next/navigation'
import { Primitive } from '~/types/types'

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: Primitive
) {
  const params = new URLSearchParams(searchParams)

  if (typeof value === 'undefined' || value === null) return params.toString()

  params.set(name, value.toString())

  return params.toString()
}
