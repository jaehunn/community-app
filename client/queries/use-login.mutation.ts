import { login } from '@/apis/login.post'
import { headers, setHeader } from '@/utils/header.util'
import { secureStoreKeys, setSecureStore } from '@/utils/secure-store.util'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: async ({ data }) => {
      setHeader(headers.Authorization, `Bearer ${data.accessToken}`)
      await setSecureStore(secureStoreKeys.accessToken, data.accessToken)

      router.push('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })
}
