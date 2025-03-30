import { useQueries } from '@tanstack/react-query'
import { queryKeys } from './keys'
import { getAvatarFaces } from '@/apis/get-avatar-faces.get'
import { getAvatarHats } from '@/apis/get-avatar-hats.get'
import { getAvatarHands } from '@/apis/get-avatar-hands.get'
import { getAvatarBottoms } from '@/apis/get-avatar-bottoms.get'
import { getAvatarSkins } from '@/apis/get-avatar-skins.get'
import { getAvatarTops } from '@/apis/get-avatar-tops.get'

/** @see https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries#dynamic-parallel-queries-with-usequeries */
export function useGetAvatarItems() {
  const [hats, faces, tops, bottoms, hands, skins] = useQueries({
    queries: [
      {
        queryKey: [queryKeys.avatar, 'hats'],
        queryFn: getAvatarHats,
      },
      {
        queryKey: [queryKeys.avatar, 'faces'],
        queryFn: getAvatarFaces,
      },
      {
        queryKey: [queryKeys.avatar, 'tops'],
        queryFn: getAvatarTops,
      },
      {
        queryKey: [queryKeys.avatar, 'bottoms'],
        queryFn: getAvatarBottoms,
      },
      {
        queryKey: [queryKeys.avatar, 'hands'],
        queryFn: getAvatarHands,
      },
      {
        queryKey: [queryKeys.avatar, 'skins'],
        queryFn: getAvatarSkins,
      },
    ],
  })

  return {
    hats: hats?.data?.data ?? [],
    faces: faces?.data?.data ?? [],
    tops: tops?.data?.data ?? [],
    bottoms: bottoms?.data?.data ?? [],
    hands: hands?.data?.data ?? [],
    skins: skins?.data?.data ?? [],
  }
}
