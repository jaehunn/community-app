import React, { useMemo, useState } from 'react'
import { FlatList, Platform, StatusBar, StyleSheet, View } from 'react-native'
import SearchInput from './search-input'
import { Feather } from '@expo/vector-icons'
import { colors } from '@/constants/colors.constant'
import { router } from 'expo-router'
import { FeedItem } from './feed-item'
import { useGetSearchPosts } from '@/queries/use-get-search-posts.query'

function SearchFeedList() {
  const [keyword, setKeyword] = useState('')
  const [submitKeyword, setSubmitKeyword] = useState('')
  const { data: postsData, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useGetSearchPosts(submitKeyword)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const posts = useMemo(() => {
    if (postsData == null) {
      return []
    }

    return postsData.pages.flatMap((page) => page.data)
  }, [postsData])

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.arrowLeft}>
          <Feather name="arrow-left" size={28} color={colors.black} onPress={() => router.back()} />
        </View>
        <SearchInput
          //keypad up
          autoFocus
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          onSubmit={() => setSubmitKeyword(keyword)}
          onSubmitEditing={() => setSubmitKeyword(keyword)}
          placeholder="글 제목 검색"
        />
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <FeedItem item={item} />}
        keyExtractor={(item) => `${item.id}`}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true)
          await refetch()
          setIsRefreshing(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.gray200,
    gap: 12,
  },
  arrowLeft: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.white,
    height: 44,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})

export default SearchFeedList
