import { getSecureStore } from '@/utils/secure-store.util'
import { http } from './http'

type LoginPayload = {
  email: string
  password: string
}

async function login(payload: LoginPayload) {
  return http.post('/auth/login', payload)
}

type SignupPayload = {
  email: string
  password: string
  passwordConfirmation: string
}

async function signup(payload: SignupPayload) {
  return http.post('/auth/signup', payload)
}

async function getMe() {
  const accessToken = await getSecureStore('token')

  return http.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const authApi = {
  login,
  signup,
  getMe,
}
