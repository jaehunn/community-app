import { http } from './http'

type Response = string[]

export async function getAvatarHands() {
  return http.get<Response>('/avatar/hands')
}
