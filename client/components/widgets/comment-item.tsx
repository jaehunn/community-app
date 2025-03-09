import { colors } from '@/constants/colors.constant'
import { StyleSheet, View } from 'react-native'
import { Profile } from './profile'
import { Comment } from '@/types/comment.type'
import { useGetMe } from '@/queries/use-get-me.query'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { InputField } from '../input-field'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useDeleteComment } from '@/queries/use-delete-comment.mutation'

interface Props {
  item: Comment
  isReplyComment?: boolean
}

const ACTION_SHEET_OPTIONS = ['삭제', '취소'] as const

export function CommentItem({ item, isReplyComment = false }: Props) {
  const { data: me } = useGetMe()

  const { showActionSheetWithOptions } = useActionSheet()
  const { mutate: deleteComment } = useDeleteComment()

  const isMyComment = me?.id === item.user.id

  return (
    <View style={styles.container}>
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
})
