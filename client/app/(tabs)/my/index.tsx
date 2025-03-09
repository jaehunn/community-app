import { PrivateRoute } from '@/app/_layout'
import { SafeAreaView, Text } from 'react-native'

export default function MyScreen() {
  return (
    <PrivateRoute>
      <SafeAreaView>
        <Text>내 정보 스크린</Text>
      </SafeAreaView>
    </PrivateRoute>
  )
}
