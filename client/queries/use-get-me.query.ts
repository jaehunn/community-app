import { getMe } from '@/apis/get-me.get'
import { headers, removeHeader, setHeader } from '@/utils/header.util'
import { deleteSecureStore, getSecureStore, secureStoreKeys, setSecureStore } from '@/utils/secure-store.util'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryKeys } from './keys'

export function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: [queryKeys.auth, 'get-me'],
    queryFn: getMe,
    select: (data) => data?.data ?? null,
  })

  useEffect(() => {
    ;(async () => {
      if (isSuccess) {
        // 앱을 껐다 키더라도 secureStore 에는 토큰이 남아있다.
        const accessToken = await getSecureStore(secureStoreKeys.accessToken)

        // getMe() 호출 후 auth header 설정
        setHeader(headers.Authorization, `Bearer ${accessToken}`)
      }
    })()
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      removeHeader(headers.Authorization)
      deleteSecureStore(secureStoreKeys.accessToken)
    }
  }, [isError])

  return { data }
}
