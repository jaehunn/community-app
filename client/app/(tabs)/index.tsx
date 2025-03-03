import { PressableText } from '@/components/pressable-text'
import { FeedItem } from '@/components/widgets/feed-item'
import { Post } from '@/types/post.type'
import { router } from 'expo-router'
import { SafeAreaView, Text } from 'react-native'

export default function HomeScreen() {
  const post: Post = {
    id: 1,
    userId: 1,
    title: '테스트 게시글',
    description: '테스트 게시글 내용',
    createdAt: '2021-01-01',
    author: { id: 1, nickname: '홍길동' },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
  }

  return (
    <SafeAreaView>
      <FeedItem item={post} />
    </SafeAreaView>
  )
}
