import { CreatePostDto } from '@/types/post.type'
import { http } from './http'

type Params = {
  id: number
}

type Payload = CreatePostDto

export async function updatePost(params: Params, payload: Payload) {
  return http.patch(`/posts/${params.id}`, payload)
}
