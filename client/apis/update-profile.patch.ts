import { http } from '@/apis/http'

type Payload = Partial<
  AvatarItemType & {
    nickname: string
    introduce: string
  }
>

export type AvatarItemType = Record<'hatsId' | 'facesId' | 'topsId' | 'bottomsId' | 'handsId' | 'skinsId', string>

export const updateProfile = async (payload: Payload) => {
  return http.patch('/auth/me', payload)
}
