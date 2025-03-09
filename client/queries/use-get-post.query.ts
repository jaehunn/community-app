import { getPost } from '@/apis/get-post.get'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './keys'

export function useGetPost(params: Parameters<typeof getPost>[0]) {
  return useQuery({
    queryKey: [queryKeys.post, `get-post-${params.id}`],
    queryFn: () => getPost(params),
    enabled: params.id != null,
  })
}
