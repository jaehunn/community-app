import { Profile } from '@/types/profile.type'
import { http } from './http'

type Params = {
  id: string
}

type Response = Profile

export async function getUserProfile(params: Params) {
  return http.get<Response>(`/auth/${params.id}`)
}
