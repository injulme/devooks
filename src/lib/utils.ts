import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CodeType } from '@/constant/common';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 기본 옵션 파싱
export function codeToArray<T extends string>(code: CodeType<T>): { label: string; value: T }[] {
  return Object.keys(code).map((key) => ({
    label: code[key as T].label,
    value: code[key as T].value,
  }));
}

// 파일 데이터 가져오기
export function getFileData(file: File, callbackPreview: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      alert('파일 형식이 맞지 않습니다. JPG, PNG 파일을 업로드해주세요.');
      reject('Invalid file type');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (!reader.result) {
          reject('Failed to read file');
          return;
        }

        callbackPreview((prev: any) => [...prev, reader.result as string]);

        const base64Raw = (reader.result as string).split(',')[1]; // Base64 데이터 추출
        const extension = file.name.split('.').pop(); // 파일 확장자 추출
        const byteSize = file.size; // 파일 크기 (바이트 단위)

        const imageData = {
          base64Raw,
          extension: extension?.toUpperCase(),
          byteSize,
        };
        resolve(imageData);
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
    }
  });
}
