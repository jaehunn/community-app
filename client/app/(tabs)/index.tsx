import { PressableText } from '@/components/pressable-text'
import { SafeAreaView, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home</Text>

      <PressableText
        size="large"
        variant="fill"
        onPress={() => {
          console.log('버튼 클릭')
        }}
      >
        버튼
      </PressableText>
    </SafeAreaView>
  )
}
