import { http } from './http'

type Params = {
  postId: number
}

export async function createLikePost(params: Params) {
  return http.post(`/likes/${params.postId}`)
}
