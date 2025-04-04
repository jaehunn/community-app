import { http } from '@/apis/http'

export const headers = {
  Authorization: 'Authorization',
} as const

type HeadersType = keyof typeof headers

export function setHeader(key: HeadersType, value: string) {
  http.defaults.headers.common[key] = value
}

export function removeHeader(key: HeadersType) {
  if (http.defaults.headers.common[key] != null) {
    return
  }

  delete http.defaults.headers.common[key]
}

export function getHeader(key: HeadersType) {
  return http.defaults.headers.common[key] ?? null
}
