import { login } from '@/apis/login.post'
import { headers, setHeader } from '@/utils/header.util'
import { secureStoreKeys, setSecureStore } from '@/utils/secure-store.util'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: async ({ data }) => {
      // App 을 껐다가 켠 경우에 header 설정이 되지 않는 이슈가 생긴다.
      // 인가를 제대로 처리하지 못함. -> useGetMe() onSuccess 시에 헤더를 설정하도록 수정.
      setHeader(headers.Authorization, `Bearer ${data.accessToken}`)
      await setSecureStore(secureStoreKeys.accessToken, data.accessToken)

      router.push('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })
}
