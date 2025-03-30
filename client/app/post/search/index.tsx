import SearchFeedList from '@/components/widgets/search-feed-list'
import { colors } from '@/constants/colors.constant'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchFeedList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
