import { Post } from '@/types/post.type'
import { http } from './http'

type Params = {
  id: number
}

type Response = Post
export async function getPost(params: Params) {
  return http.get<Response>(`/posts/${params.id}`)
}
