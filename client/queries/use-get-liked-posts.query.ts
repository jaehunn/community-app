import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { getLikesPosts } from '@/apis/get-liked-posts.get'

export function useGetLikedPosts() {
  return useInfiniteQuery({
    queryKey: [queryKeys.post, 'get-liked-posts'],
    queryFn: ({ pageParam }) => getLikesPosts({ page: pageParam }),
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
