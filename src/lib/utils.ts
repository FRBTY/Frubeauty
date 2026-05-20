import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely. Used by shadcn-style components and ours.
 *
 * Why: when conditionally applying classes, later ones should win over earlier.
 * tailwind-merge dedupes conflicting utilities (e.g. "px-4 px-6" → "px-6").
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
