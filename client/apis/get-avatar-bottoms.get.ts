import { http } from './http'

type Response = string[]

export async function getAvatarBottoms() {
  return http.get<Response>('/avatar/bottoms')
}
