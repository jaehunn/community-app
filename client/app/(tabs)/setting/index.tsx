import { PrivateRoute } from '@/app/_layout'
import { useLogout } from '@/queries/use-logout'
import { SafeAreaView, Text, View } from 'react-native'

export default function SettingScreen() {
  const { logout } = useLogout()

  return (
    <PrivateRoute>
      <SafeAreaView>
        <View>
          <Text
            onPress={() => {
              logout()
            }}
          >
            로그아웃
          </Text>
        </View>
      </SafeAreaView>
    </PrivateRoute>
  )
}
