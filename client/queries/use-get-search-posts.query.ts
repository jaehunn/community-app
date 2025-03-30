import { getSearchPosts } from '@/apis/get-search-posts.get'
import { queryKeys } from '@/queries/keys'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useGetSearchPosts(query: string) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getSearchPosts({ page: pageParam, query }),
    queryKey: [queryKeys.post, 'get-search-posts', query],
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
