import { PrivateRoute } from '@/app/_layout'
import { InputField } from '@/components/input-field'
import { PressableText } from '@/components/pressable-text'
import { FeedItem } from '@/components/widgets/feed-item'
import { colors } from '@/constants/colors.constant'
import { useGetPost } from '@/queries/use-get-post.query'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams()
  const { data: post, isPending, isError } = useGetPost({ id: Number(id) })

  if (isPending) {
    return null
  }

  if (isError) {
    return null
  }

  return (
    <PrivateRoute>
      <SafeAreaView style={styles.container}>
        {/* 키패드업 되었을때 포스트가 가려지는 이슈. */}
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.feedContainer}>
              <FeedItem item={post.data} isFeedDetailScreen />
              <Text style={styles.commentCount}>댓글 {post.data.commentCount}개</Text>
            </View>
          </ScrollView>

          <View style={styles.inputContainer}>
            <InputField
              variant="fill"
              rightSlot={
                <PressableText size="large" variant="fill" style={styles.inputRightSlotContainer}>
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
