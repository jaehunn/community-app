import { http } from './http'

type Response = string[]

export async function getAvatarFaces() {
  return http.get<Response>('/avatar/faces')
}
