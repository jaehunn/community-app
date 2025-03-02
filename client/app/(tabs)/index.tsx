import { PressableText } from '@/components/pressable-text'
import { router } from 'expo-router'
import { SafeAreaView, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home</Text>

      <PressableText
        size="large"
        variant="fill"
        onPress={() => {
          router.push('/auth')
        }}
      >
        버튼
      </PressableText>
    </SafeAreaView>
  )
}
