import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors.constant'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { Post } from '@/types/post.type'
import { Profile } from './profile'
import { useGetMe } from '@/queries/use-get-me.query'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useDeletePost } from '@/queries/use-delete-post.mutation'
import { router } from 'expo-router'
import { ImagePreviewList } from './image-preview-list'
import { Vote } from './vote'
import auth from '@/app/auth'
import { useCreateLikePost } from '@/queries/use-create-like-post.mutation'

interface Props {
  item: Post
  isFeedDetailScreen?: boolean
}

const ACTION_SHEET_OPTIONS = ['삭제', '수정', '취소'] as const

export function FeedItem({ item, isFeedDetailScreen = false }: Props) {
  const { data: user } = useGetMe()
  const likeUsers = item.likes.map((like) => like.userId)
  const isLiked = user?.id != null ? likeUsers.includes(user.id) : false

  const { showActionSheetWithOptions } = useActionSheet()
  const { mutate: deletePost } = useDeletePost()
  const { mutate: createLikePost } = useCreateLikePost()

  const handlePressLike = () => {
    if (auth == null) {
      router.push('/auth')

      return
    }

    if (!isFeedDetailScreen) {
      router.push(`/post/${item.id}`)
    }

    createLikePost({ postId: item.id })
  }

  const handlePressFeed = () => {
    //
  }

  const isMyFeed = user?.id === item.author.id

  const Container = isFeedDetailScreen ? View : Pressable

  return (
    <Container
      style={styles.container}
      onPress={() => {
        if (!isFeedDetailScreen) {
          router.push(`/post/${item.id}`)
        }
      }}
    >
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
                      options: [...ACTION_SHEET_OPTIONS],
                      destructiveButtonIndex: ACTION_SHEET_OPTIONS.indexOf('삭제'),
                      cancelButtonIndex: ACTION_SHEET_OPTIONS.indexOf('취소'),
                    },
                    (index) => {
                      switch (index) {
                        case ACTION_SHEET_OPTIONS.indexOf('삭제'):
                          deletePost(
                            { postId: item.id },
                            {
                              onSuccess: () => {
                                if (isFeedDetailScreen) {
                                  router.back()
                                }
                              },
                            }
                          )

                          break
                        case ACTION_SHEET_OPTIONS.indexOf('수정'):
                          router.push(`/post/edit/${item.id}`)

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
        <ImagePreviewList imageUris={item.imageUris} />

        {item.hasVote && (
          <>
            {!isFeedDetailScreen ? (
              /* Vote Feed */
              <View style={styles.voteContainer}>
                <View style={styles.voteTitleContainer}>
                  <MaterialCommunityIcons name="vote" size={24} color={colors.orange600} />
                  <Text style={styles.voteCountLabel}>투표</Text>
                </View>

                <Text style={styles.voteCountText}>{item.voteCount}명 참여중 ...</Text>
              </View>
            ) : (
              /* Vote Feed Detail */
              <Vote postId={item.id} postVotes={item.votes ?? []} voteCount={item.voteCount} />
            )}
          </>
        )}
      </View>

      <View style={styles.menuContainer}>
        <Pressable style={styles.menu} onPress={handlePressLike}>
          <Octicons
            name={isLiked ? 'heart-fill' : 'heart'}
            size={16}
            color={isLiked ? colors.orange600 : colors.black}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>{item.likes.length}</Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={handlePressFeed}>
          <MaterialCommunityIcons name="comment-processing-outline" size={16} color={colors.black} />
          <Text style={styles.menuText}>{item.commentCount}</Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={handlePressFeed}>
          <Octicons name="eye" size={16} color={colors.black} />
          <Text style={styles.menuText}>{item.viewCount}</Text>
        </Pressable>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
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

  // vote
  voteContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 14,
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.orange600,
    backgroundColor: colors.orange100,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  voteTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  voteCountLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.orange600,
  },
  voteCountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
})
