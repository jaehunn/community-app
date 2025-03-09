import { createComment } from '@/apis/create-comment.post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // comment 가 달린 포스트만 invalidate 시킬 수 있음. 일단 이렇게.
      queryClient.invalidateQueries({ queryKey: [queryKeys.post] })
    },
  })
}
