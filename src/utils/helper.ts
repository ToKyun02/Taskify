import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorByString(value: string, colorArray: string[]) {
  const charCode = value.toLowerCase().charCodeAt(0);
  const index = charCode % colorArray.length;
  return colorArray[index];
}
