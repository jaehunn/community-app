import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { getMyPosts } from '@/apis/get-my-posts.get'

export function useGetMyPosts() {
  return useInfiniteQuery({
    queryKey: [queryKeys.post, 'get-my-posts'],
    queryFn: ({ pageParam }) => getMyPosts({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPageData = lastPage.data[lastPage.data.length - 1]

      if (lastPageData == null) {
        return null
      }

      // next page params
      return allPages.length + 1
    },
  })
}
