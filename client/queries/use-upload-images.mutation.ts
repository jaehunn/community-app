import { uploadImages } from '@/apis/upload-images.post'
import { useMutation } from '@tanstack/react-query'

export function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
    onSuccess: () => {
      // ...
    },
  })
}
