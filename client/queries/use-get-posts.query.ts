import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { getPosts } from '@/apis/get-posts.get'

export function useGetPosts() {
  return useInfiniteQuery({
    queryKey: [queryKeys.post, 'get-posts'],
    queryFn: ({ pageParam }) => getPosts({ page: pageParam }),
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
