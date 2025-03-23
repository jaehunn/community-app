import { getUserProfile } from '@/apis/get-user-profile.get'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './keys'

export function useGetUserProfile(params: Parameters<typeof getUserProfile>[0]) {
  return useQuery({
    queryKey: [queryKeys.auth, 'get-user-profile'],
    queryFn: () => getUserProfile(params),
    select: (data) => data?.data ?? null,
    enabled: params.id != null,
  })
}
