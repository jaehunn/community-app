export function createFormData(uris: string[], mimeType = 'image/jpeg') {
  const formData = new FormData()

  uris.forEach((uri) => {
    formData.append('images', {
      // name 추출
      name: uri.split('/').pop(),
      type: mimeType,
      uri,
    } as unknown as Blob)
  })

  return formData
}
