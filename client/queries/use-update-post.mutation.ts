import { updatePost } from '@/apis/update-post.patch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: Parameters<typeof updatePost>) => updatePost(...params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.post] })
    },
  })
}
