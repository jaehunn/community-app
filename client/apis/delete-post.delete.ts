import { http } from './http'

type Params = {
  postId: number
}

export async function deletePost(params: Params) {
  return await http.delete(`/posts/${params.postId}`)
}
