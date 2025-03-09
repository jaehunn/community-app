import { FeedList } from '@/components/widgets/feed-list'
import { useGetMe } from '@/queries/use-get-me.query'
import { SafeAreaView } from 'react-native'

export default function HomeScreen() {
  const { data: me } = useGetMe()

  /**
   * first render
   *   (NOBRIDGE) LOG  undefined
   *
   * second render
   *   (NOBRIDGE) LOG  {"background": null, "bottomId": null, "email": "jack@example.com", "faceId": null, "handId": null, "hatId": null, "id": 1, "imageUri": null, "introduce": null, "nickname": "익명1", "skinId": "01", "topId": null}
   */

  return (
    <SafeAreaView>
      <FeedList />
    </SafeAreaView>
  )
}
