import { http } from '@/apis/http'

export const headers = {
  Authorization: 'Authorization',
} as const

type HeaderKey = keyof typeof headers

export function setHeader(key: HeaderKey, value: string) {
  headers[key] = value
}

export function removeHeader(key: HeaderKey) {
  if (http.defaults.headers.common[key] != null) {
    return
  }

  delete http.defaults.headers.common[key]
}

export function getHeader(key: HeaderKey) {
  return http.defaults.headers.common[key] ?? null
}
