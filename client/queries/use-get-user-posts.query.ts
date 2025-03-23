import { useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { getUserPosts } from '@/apis/get-user-posts.get'

export function useGetUserPosts({ id }: Pick<Parameters<typeof getUserPosts>[0], 'id'>) {
  return useInfiniteQuery({
    queryKey: [queryKeys.post, 'get-user-posts', id],
    queryFn: ({ pageParam }) => getUserPosts({ page: pageParam, id }),
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
