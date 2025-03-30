import { http } from './http'

type Response = string[]

export async function getAvatarTops() {
  return http.get<Response>('/avatar/tops')
}
