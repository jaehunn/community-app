import { http } from './http'

type Response = string[]

export async function getAvatarSkins() {
  return http.get<Response>('/avatar/skins')
}
