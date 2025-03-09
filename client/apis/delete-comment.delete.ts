import { http } from '@/apis/http'

type Params = {
  id: number
}

export async function deleteComment(params: Params) {
  return http.delete(`/comments/${params.id}`)
}
