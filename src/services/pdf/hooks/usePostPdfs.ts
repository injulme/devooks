import { POST_pdfs } from '../api';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';

export const usePostPdfs = () => {
  const [progress, setProgress] = useState<number>(0);
  const mutation = useMutation({
    mutationKey: [POST_pdfs.name],
    mutationFn: (args: File) =>
      POST_pdfs(args, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent?.total ?? 1),
          );
          setProgress(percentCompleted);
        },
      }),
  });

  return { ...mutation, progress };
};
