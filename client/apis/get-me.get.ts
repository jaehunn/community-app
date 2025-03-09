import { getSecureStore, secureStoreKeys } from '@/utils/secure-store.util'
import { http } from './http'
import { Profile } from '@/types/profile.type'

type Response = Profile

export async function getMe() {
  const accessToken = await getSecureStore(secureStoreKeys.accessToken)

  return http.get<Response>('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
