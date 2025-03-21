import { http } from './http'

type Params = {
  postId: number
  optionId: number
}

export async function createVote({ postId, optionId }: Params) {
  return http.post<number>(`/posts/${postId}/vote/${optionId}`)
}
