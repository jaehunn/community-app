import { getMe } from '@/apis/get-me.get'
import { headers, removeHeader } from '@/utils/header.util'
import { deleteSecureStore, secureStoreKeys } from '@/utils/secure-store.util'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useGetMe() {
  const { data, isError } = useQuery({ queryKey: ['get-me'], queryFn: getMe, select: (data) => data?.data ?? null })

  /**
   * (NOBRIDGE) LOG  {"data": undefined, "isError": false, "isLoading": true}
   * (NOBRIDGE) LOG  {"me": undefined}
   *
   * (NOBRIDGE) LOG  {"data": undefined, "isError": true, "isLoading": false}
   * (NOBRIDGE) LOG  {"me": undefined}
   */

  useEffect(() => {
    if (isError) {
      removeHeader(headers.Authorization)
      deleteSecureStore(secureStoreKeys.accessToken)
    }
  }, [isError])

  return { data }
}
