import { http } from './http'

export function uploadImages(formData: FormData) {
  return http.post<string[]>('/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
