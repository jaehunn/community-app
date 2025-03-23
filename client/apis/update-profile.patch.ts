import { http } from '@/apis/http'

type Payload = {
  nickname: string
  introduce: string
}

export const updateProfile = async (payload: Payload) => {
  return http.patch('/auth/me', payload)
}
