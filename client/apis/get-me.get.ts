import { getSecureStore, secureStoreKeys } from '@/utils/secure-store.util'
import { http } from './http'

export async function getMe() {
  const accessToken = await getSecureStore(secureStoreKeys.accessToken)

  return http.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
