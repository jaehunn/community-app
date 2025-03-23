import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { FeedItem } from './feed-item'
import { useGetUserPosts } from '@/queries/use-get-user-posts.query'
import { useScrollToTop } from '@react-navigation/native'
import { colors } from '@/constants/colors.constant'

interface Props {
  id: string
}

export function UserFeedList({ id }: Props) {
  const { data: postsData, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useGetUserPosts({ id })

  const [shouldRefresh, setShouldRefresh] = useState(false)

  const flatListRef = useRef<FlatList | null>(null)
  useScrollToTop(flatListRef)

  // [[a, b, c, ...], [d, e, f, ...], [g, h, i, ...], ...]
  // to-be: [a, b, c, d, e, f, g, h, i, ...]
  const posts = useMemo(() => {
    if (postsData == null) {
      return []
    }

    return postsData.pages.flatMap((page) => page.data)
  }, [postsData])

  return (
    /** @see https://reactnative.dev/docs/flatlist */
    <FlatList
      ref={flatListRef}
      data={posts}
      renderItem={({ item }) => <FeedItem item={item} />}
      keyExtractor={(item) => `${item.id}`}
      // @see https://reactnative.dev/docs/virtualizedlist#onendreachedthreshold
      // 끝에 도달하기 전에 불러오도록 threshold 설정.
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        // 다음 페이지가 있으면서, 가져오는 중이 아닐 때
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      }}
      // Pull to Refresh
      // @see https://reactnative.dev/docs/virtualizedlist#refreshing
      refreshing={shouldRefresh}
      onRefresh={async () => {
        setShouldRefresh(true)
        await refetch()
        setShouldRefresh(false)
      }}
      // @see https://reactnative.dev/docs/flatlist#listemptycomponent
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>작성한 글이 없습니다.</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: colors.white,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
  },
})
