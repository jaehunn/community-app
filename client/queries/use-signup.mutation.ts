import { signup } from '@/apis/signup.post'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      // ...
    },
    onError: () => {
      // ...
    },
  })
}
