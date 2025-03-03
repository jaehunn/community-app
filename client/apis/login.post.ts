import { http } from './http'

type Payload = {
  email: string
  password: string
}

type Response = {
  accessToken: string
}

export async function login(payload: Payload) {
  return http.post<Response>('/auth/signin', payload)
}
