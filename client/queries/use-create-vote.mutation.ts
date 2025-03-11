import { createVote } from '@/apis/create-vote.post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'

export function useCreateVote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.post] })
    },
  })
}
