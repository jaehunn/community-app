import { PrivateRoute } from '@/app/_layout'
import ListItem from '@/components/widgets/list-item'
import { colors } from '@/constants/colors.constant'
import { useLogout } from '@/queries/use-logout.mutation'
import { Entypo, Octicons } from '@expo/vector-icons'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export default function SettingScreen() {
  const { logout } = useLogout()

  return (
    <PrivateRoute>
      <SafeAreaView>
        <View style={styles.space} />
        <ListItem title="언어 설정" icon={<Entypo name="language" size={16} color={colors.black} />} />
        <View style={styles.space} />
        <ListItem
          title="로그아웃"
          onPress={logout}
          icon={<Octicons name="sign-out" size={16} color={colors.black} />}
        />
      </SafeAreaView>
    </PrivateRoute>
  )
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
})
