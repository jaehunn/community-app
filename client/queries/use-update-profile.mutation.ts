import { updateProfile } from '@/apis/update-profile.patch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // profile
      queryClient.invalidateQueries({ queryKey: [queryKeys.auth] })

      // feed
      queryClient.invalidateQueries({ queryKey: [queryKeys.post] })

      // FIXME:
      // queryClient.setQueryData([queryKeys.auth], data)
    },
  })
}
