import { http } from '@/apis/http'

type Payload = Partial<
  AvatarItemType & {
    nickname: string
    introduce: string
  }
>

export type AvatarItemType = Record<'hatId' | 'faceId' | 'topId' | 'bottomId' | 'handId' | 'skinId', string>

export const updateProfile = async (payload: Payload) => {
  return http.patch('/auth/me', payload)
}
