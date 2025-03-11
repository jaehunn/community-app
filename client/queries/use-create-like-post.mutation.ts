import { createLikePost } from '@/apis/create-like-post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { Post } from '@/types/post.type'
import { Profile } from '@/types/profile.type'

// Optimistic Update 로 UX 개선하기
/** @see https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates */
// 1. onMutate 로 Optimistic Update 를 덮어쓰지 않도록 GET 쿼리키를 취소하고
// 2. 기존 쿼리키 데이터에 가짜 상태로 업데이트하고
// 3. onError 시 이전 상태로 돌리고
// 4. onSettled 로 성공하든 에러든 서버 상태와 동기화한다.

export function useCreateLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLikePost,
    // mutate 전에 실행된다. 이전 캐시를 업데이트 해주자.
    onMutate: async (params: Parameters<typeof createLikePost>[0]) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.post, `get-post-${params.postId}`],
      })

      const previousPost = queryClient.getQueryData<{ data: Post }>([queryKeys.post, `get-post-${params.postId}`])

      const user = queryClient.getQueryData<{ data: Profile }>([queryKeys.auth, 'get-me'])

      const isMyLikeIndex = previousPost?.data.likes.findIndex((like) => like.userId === user?.data.id) ?? -1

      const newPost = { ...previousPost } as { data: Post }

      if (isMyLikeIndex !== -1) {
        newPost?.data.likes.splice(isMyLikeIndex, 1)
      } else {
        newPost?.data.likes.push({
          userId: Number(user?.data.id),
        })
      }

      queryClient.setQueryData([queryKeys.post, `get-post-${params.postId}`], newPost)

      return { previousPost, newPost }
    },
    onError: (err, newPost, context) => {
      // restore
      queryClient.setQueryData([queryKeys.post, `get-post-${context?.previousPost?.data?.id}`], context?.previousPost)
    },
    onSettled: (data, error, variables, context) => {
      // sync server state
      queryClient.invalidateQueries({ queryKey: [queryKeys.post, `get-post-${variables.postId}`] })
      // queryClient.invalidateQueries({ queryKey: [queryKeys.post] })
    },
  })
}
