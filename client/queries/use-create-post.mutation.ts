import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { createPost } from '@/apis/create-post.post'

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace('/')

      // stale time 설정했으면, invalidate 필요.
    },
    onError: () => {
      // ...
    },
  })
}
