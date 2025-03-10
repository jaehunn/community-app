import { colors } from '@/constants/colors.constant'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Profile } from './profile'
import { Comment } from '@/types/comment.type'
import { useGetMe } from '@/queries/use-get-me.query'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { InputField } from '../input-field'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useDeleteComment } from '@/queries/use-delete-comment.mutation'
import { PressableText } from '../pressable-text'
import { useRef, useState } from 'react'

interface Props {
  item: Comment
  isReplyComment?: boolean
  parentCommentId?: number | null
  onPressInputReplyButton?: () => void
  onCancelInputReplyButton?: () => void
}

const ACTION_SHEET_OPTIONS = ['삭제', '취소'] as const

export function CommentItem({
  item,

  // 모든 대댓글
  isReplyComment = false,

  parentCommentId,
  onPressInputReplyButton,
  onCancelInputReplyButton,
}: Props) {
  const { data: me } = useGetMe()

  const { showActionSheetWithOptions } = useActionSheet()
  const { mutate: deleteComment } = useDeleteComment()

  // 내 댓글
  const isMyComment = me?.id === item.user.id

  // 내 대댓글
  const isMyReplyComment = parentCommentId === item.id

  return (
    <View
      style={[
        styles.container,
        isReplyComment ? { backgroundColor: colors.orange100 } : null,
        isMyReplyComment ? { backgroundColor: colors.gray50 } : null,
      ]}
    >
      <View style={styles.profileContainer}>
        {isReplyComment ? <MaterialCommunityIcons name="arrow-right-bottom" size={24} color={colors.black} /> : null}

        <Profile
          imageUri={item.isDeleted ? undefined : item.user.imageUri}
          nickname={item.isDeleted ? '삭제된 댓글' : item.user.nickname}
          createdAt={item.createdAt}
          onPress={() => {
            // ...
          }}
          option={
            !item.isDeleted && isMyComment ? (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.black}
                onPress={() => {
                  showActionSheetWithOptions(
                    {
                      options: [...ACTION_SHEET_OPTIONS],
                      cancelButtonIndex: ACTION_SHEET_OPTIONS.indexOf('취소'),
                      destructiveButtonIndex: ACTION_SHEET_OPTIONS.indexOf('삭제'),
                    },
                    (index) => {
                      switch (index) {
                        case ACTION_SHEET_OPTIONS.indexOf('취소'):
                          break
                        case ACTION_SHEET_OPTIONS.indexOf('삭제'):
                          deleteComment(
                            { id: item.id },
                            {
                              onSuccess: () => {
                                // ...
                              },
                            }
                          )

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
      </View>

      <InputField variant="fill" editable={false} value={item.isDeleted ? '삭제된 댓글입니다.' : item.content} />

      {/* 대댓글에 대한 답변 기능은 지원안함. 대댓글까지만 */}
      {!item.isDeleted && !isReplyComment && (
        <View style={styles.replyContainer}>
          <PressableText
            size="small"
            variant="outline"
            onPress={() => {
              onPressInputReplyButton?.()
            }}
          >
            <Text style={styles.replyText}>답글 달기</Text>
          </PressableText>

          {/* parentCommentId 는 대댓글 중일 때 설정됨. 대댓글 대상에 취소버튼 노출 */}
          {isMyReplyComment && (
            <PressableText
              size="small"
              variant="outline"
              onPress={() => {
                onCancelInputReplyButton?.()
              }}
            >
              <Text style={styles.cancelText}>취소</Text>
            </PressableText>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    gap: 12,
    borderColor: colors.gray200,
    borderWidth: 1,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  replyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  replyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.orange600,
  },
  cancelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
  },
})
