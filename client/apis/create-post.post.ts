import { http } from './http'
import { CreatePostDto } from '@/types/post.type'

type Payload = CreatePostDto

type Response = {
  // ...
}

export async function createPost(payload: Payload) {
  return http.post<Response>('/posts', payload)
}
