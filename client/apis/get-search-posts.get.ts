import { Post } from '@/types/post.type'
import { http } from './http'

type Params = {
  page?: number
  query: string
}

type Response = Post[]

export async function getSearchPosts({ page = 1, query }: Params) {
  return http.get<Response>(`/posts/search?query=${query}&page=${page}`)
}
