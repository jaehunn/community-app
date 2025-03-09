import { http } from '@/apis/http'
import { CreateCommentDto } from '@/types/comment.type'

type Payload = CreateCommentDto

export async function createComment(payload: Payload) {
  return http.post('/comments', payload)
}
