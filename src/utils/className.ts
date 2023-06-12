import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * classNames - A utility for merging tailwind classes with clsx
 * @param {ClassValue} inputs - The classes to merge
 * @returns {string} - The merged classes
 */
export function classNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs))
}
