import { Post } from '@/types/post.type'
import { http } from './http'

type Params = {
  page: number
}

type Response = Post[]
export async function getPosts(params: Params) {
  return http.get<Response>('/posts', {
    params,
  })
}
