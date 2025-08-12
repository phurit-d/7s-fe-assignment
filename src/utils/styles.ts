import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class name values into a single string.
 *
 * @param classNames - The class name values to combine.
 * @returns The resulting merged class name string.
 */
export const toClassNames = (...classNames: ClassValue[]): string => {
  return twMerge(clsx(...classNames));
};
