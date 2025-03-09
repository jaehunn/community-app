import { PressableText } from '@/components/pressable-text'
import { FeedList } from '@/components/widgets/feed-list'
import { useGetMe } from '@/queries/use-get-me.query'
import { router } from 'expo-router'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors.constant'

export default function HomeScreen() {
  const { data: me } = useGetMe()

  const isAuthenticated = me?.id != null

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />

      {isAuthenticated && (
        <PressableText
          size="medium"
          variant="fill"
          style={styles.writeButton}
          onPress={() => router.push('/post/write')}
        >
          <Ionicons name="pencil" size={32} color="white" />
        </PressableText>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  writeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.orange600,
    width: 64,
    height: 64,
    borderRadius: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // shadow, @see https://reactnative.dev/docs/shadow-props
    shadowColor: colors.orange600,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,

    // Android OS 에서는 elevation attribute 필요.
    elevation: 2,
  },
})
