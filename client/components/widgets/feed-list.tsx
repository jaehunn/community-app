import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { FeedItem } from './feed-item'
import { dummyPosts } from '@/mocks/dummy'

export function FeedList() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <FeedItem item={item} />}
      keyExtractor={(item) => `${item.id}`}
    />
  )
}

const styles = StyleSheet.create({})
