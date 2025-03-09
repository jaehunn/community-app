import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors.constant'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { Post } from '@/types/post.type'
import { Profile } from './profile'
import { useGetMe } from '@/queries/use-get-me.query'
import { useActionSheet } from '@expo/react-native-action-sheet'

interface Props {
  item: Post
}

const ACTION_SHEET_OPTIONS = ['삭제', '수정', '취소'] as const

export function FeedItem({ item }: Props) {
  const { data: user } = useGetMe()
  const likeUsers = item.likes.map((like) => like.userId)
  const isLiked = user?.id != null ? likeUsers.includes(user.id) : false

  const { showActionSheetWithOptions } = useActionSheet()

  const isMyFeed = user?.id === item.author.id

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          imageUri={item.author.imageUri}
          nickname={item.author.nickname}
          createdAt={item.createdAt}
          onPress={() => {
            // ...
          }}
          option={
            isMyFeed ? (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.black}
                onPress={() => {
                  // @see https://reactnative.dev/docs/actionsheetios
                  // @see https://www.npmjs.com/package/@expo/react-native-action-sheet

                  showActionSheetWithOptions(
                    {
                      options: ACTION_SHEET_OPTIONS,
                      destructiveButtonIndex: ACTION_SHEET_OPTIONS.indexOf('삭제'),
                      cancelButtonIndex: ACTION_SHEET_OPTIONS.indexOf('취소'),
                    },
                    (index) => {
                      switch (index) {
                        case ACTION_SHEET_OPTIONS.indexOf('삭제'):
                          // ...
                          break
                        case ACTION_SHEET_OPTIONS.indexOf('수정'):
                          // ...
                          break
                        case ACTION_SHEET_OPTIONS.indexOf('취소'):
                          // ...
                          break
                        default:
                          break
                      }
                    }
                  )
                }}
              />
            ) : null
          }
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable
          style={styles.menu}
          onPress={() => {
            // TODO: 좋아요 추가
          }}
        >
          <Octicons
            name={isLiked ? 'heart-fill' : 'heart'}
            size={16}
            color={isLiked ? colors.orange600 : colors.black}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>{item.likes.length}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <MaterialCommunityIcons name="comment-processing-outline" size={16} color={colors.black} />
          <Text style={styles.menuText}>{item.commentCount}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Octicons name="eye" size={16} color={colors.black} />
          <Text style={styles.menuText}>{item.viewCount}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.white,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.black,
  },
  content: {
    fontSize: 16,
    color: colors.black,
    marginTop: 14,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.gray300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: '33%',
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.gray700,
  },
  activeMenuText: {
    fontWeight: 500,
    color: colors.orange600,
  },
})
