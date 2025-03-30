import { signup } from '@/apis/signup.post'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.replace('/auth/login')
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: (error as AxiosError<{ message: string }>)?.response?.data.message,
      })
    },
  })
}
