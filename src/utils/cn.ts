import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - A utility for merging tailwind classes with clsx
 * @param {ClassValue} inputs - The classes to merge
 * @returns {string} - The merged classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
