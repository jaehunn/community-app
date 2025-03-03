import { signup } from '@/apis/signup.post'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.replace('/auth/login')
    },
    onError: () => {
      // ...
    },
  })
}
