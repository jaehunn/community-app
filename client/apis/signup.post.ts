import { http } from './http'

type Payload = {
  email: string
  password: string
  passwordConfirm: string
}

export async function signup(payload: Payload) {
  return http.post('/auth/signup', payload)
}
