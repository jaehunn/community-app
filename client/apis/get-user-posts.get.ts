import { Post } from '@/types/post.type'
import { http } from './http'

type Params = {
  id: string
  page: number
}

type Response = Post[]

export async function getUserPosts(params: Params) {
  return http.get<Response>(`/posts/user/${params.id}`, {
    params,
  })
}
