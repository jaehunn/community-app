import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { deleteComment } from '@/apis/delete-comment.delete'

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.post] })
    },
  })
}
