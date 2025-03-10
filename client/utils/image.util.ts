import { ImagePickerAsset } from 'expo-image-picker'

export function createFormData(assets: ImagePickerAsset[]) {
  const formData = new FormData()

  assets.forEach(({ uri, mimeType }) => {
    formData.append('images', {
      // name 추출
      name: uri.split('/').pop(),

      type: mimeType ?? 'image/jpeg',
      uri,
    } as unknown as Blob)
  })

  return formData
}
