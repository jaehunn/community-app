import { headers, removeHeader } from '@/utils/header.util'
import { deleteSecureStore, secureStoreKeys } from '@/utils/secure-store.util'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './keys'
export function useLogout() {
  const queryClient = useQueryClient()

  return {
    logout: () => {
      removeHeader(headers.Authorization)
      deleteSecureStore(secureStoreKeys.accessToken)
      queryClient.resetQueries({ queryKey: queryKeys.auth })
    },
  }
}
