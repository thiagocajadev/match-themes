import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classNames: ClassValue[]): string {
  const merged = twMerge(clsx(classNames));
  return merged;
}
