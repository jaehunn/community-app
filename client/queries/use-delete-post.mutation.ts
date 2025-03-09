import { deletePost } from '@/apis/delete-post.delete'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.post] })
    },
  })
}
