import { PrivateRoute } from '@/app/_layout'
import { InputField } from '@/components/input-field'
import { PressableText } from '@/components/pressable-text'
import { CommentItem } from '@/components/widgets/comment-item'
import { FeedItem } from '@/components/widgets/feed-item'
import { colors } from '@/constants/colors.constant'
import { useCreateComment } from '@/queries/use-create-comment.mutation'
import { useGetPost } from '@/queries/use-get-post.query'
import { useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams()
  const { data: post, isPending, isError } = useGetPost({ id: Number(id) })

  const { mutate: createComment } = useCreateComment()
  const [content, setContent] = useState('')
  const scrollViewRef = useRef<ScrollView | null>(null)
  const inputFieldRef = useRef<TextInput | null>(null)
  const [parentCommentId, setParentCommentId] = useState<number | null>(null)

  if (isPending || isError) {
    return null
  }

  return (
    <PrivateRoute>
      <SafeAreaView style={styles.container}>
        {/* 키패드업 되었을때 포스트가 가려지는 이슈. */}
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
          <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
            <View style={styles.feedContainer}>
              <FeedItem item={post.data} isFeedDetailScreen />
              <Text style={styles.commentCount}>댓글 {post.data.commentCount}개</Text>
            </View>

            {post.data.comments?.map((comment) => {
              return (
                <>
                  <CommentItem
                    key={comment.id}
                    item={comment}
                    parentCommentId={parentCommentId}
                    onPressInputReplyButton={() => {
                      setParentCommentId(comment.id)
                      inputFieldRef.current?.focus()
                    }}
                    onCancelInputReplyButton={() => {
                      setParentCommentId(null)
                      Keyboard.dismiss()
                    }}
                  />
                  {comment.replies.map((reply) => {
                    return <CommentItem isReplyComment key={reply.id} item={reply} />
                  })}
                </>
              )
            })}
          </ScrollView>

          {/* Form 으로 분리할 수 있을 듯. */}
          <View style={styles.inputContainer}>
            <InputField
              ref={inputFieldRef}
              variant="fill"
              returnKeyType="send"
              placeholder={parentCommentId !== null ? '답글을 남기는 중...' : '댓글을 남겨보세요.'}
              value={content}
              onChangeText={(text) => setContent(text)}
              rightSlot={
                <PressableText
                  size="large"
                  variant="fill"
                  disabled={content.length === 0}
                  style={styles.inputRightSlotContainer}
                  onPress={() => {
                    createComment(
                      {
                        content,
                        postId: post.data.id,

                        // 대댓글
                        parentCommentId: parentCommentId ?? undefined,
                      },
                      {
                        onSuccess: () => {
                          // 비동기적으로 상태 업데이트하므로 scrollToEnd 가 의도한 대로 작동하지않음.
                          // setContent('')
                          // scrollViewRef.current?.scrollToEnd()

                          // 좀 더 세련된 방식은 없을까. 지연시간이 너무 상수적이다.
                          setContent('')
                          setTimeout(() => {
                            scrollViewRef.current?.scrollToEnd()
                          }, 300)

                          if (parentCommentId !== null) {
                            setParentCommentId(null)
                            Keyboard.dismiss()
                          }
                        },
                      }
                    )
                  }}
                >
                  <Text style={styles.inputRightSlotText}>등록</Text>
                </PressableText>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PrivateRoute>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAwareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.gray200,
  },
  scrollViewContainer: {
    backgroundColor: colors.gray200,
  },
  scrollView: {
    marginBottom: 75,
  },
  feedContainer: {
    marginTop: 12,
  },
  commentCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    borderTopColor: colors.gray200,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  inputRightSlotContainer: {
    backgroundColor: colors.orange600,
    padding: 8,
    borderRadius: 5,
  },
  inputRightSlotText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})
