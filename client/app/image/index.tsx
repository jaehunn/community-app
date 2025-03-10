import { colors } from '@/constants/colors.constant'
import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'

export default function ImageScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>()

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            router.back()
          }}
        >
          <Feather name="arrow-left" size={20} color={colors.white} />
        </Pressable>

        <Image
          source={{ uri }}
          resizeMode="contain"
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    backgroundColor: colors.black,
    height: 40,
    width: 40,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
