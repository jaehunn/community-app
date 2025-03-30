import { PressableText } from '@/components/pressable-text'
import { FeedList } from '@/components/widgets/feed-list'
import { useGetMe } from '@/queries/use-get-me.query'
import { router } from 'expo-router'
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors.constant'
import SearchInput from '@/components/widgets/search-input'

export default function HomeScreen() {
  const { data: me } = useGetMe()

  const isAuthenticated = me?.id != null

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <SearchInput readOnly placeholder="글 제목 검색" onPress={() => router.push('/post/search')} />
      </View>
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
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.white,
    flexDirection: 'row',

    /** @see https://reactnative.dev/docs/statusbar */
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    height: 44,
    width: 44,
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
