import { http } from './http'

type Response = string[]

export async function getAvatarHats() {
  return http.get<Response>('/avatar/hats')
}
