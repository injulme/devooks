import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CodeType } from '@/constant/common';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 기본 옵션 파싱
export function codeToOptions<T extends string>(
  code: CodeType<T>,
): { label: string; value: string }[] {
  return Object.keys(code).map((key) => ({
    label: code[key as T].label,
    value: code[key as T].value,
  }));
}
