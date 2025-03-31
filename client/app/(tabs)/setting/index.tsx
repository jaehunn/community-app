import { PrivateRoute } from '@/app/_layout'
import ListItem from '@/components/widgets/list-item'
import { colors } from '@/constants/colors.constant'
import { useLogout } from '@/queries/use-logout.mutation'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Entypo, Octicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { setSecureStore } from '@/utils/secure-store.util'

export default function SettingScreen() {
  const { logout } = useLogout()
  const { i18n } = useTranslation()
  const { showActionSheetWithOptions } = useActionSheet()

  function handlePressLanguage() {
    const options = ['English', '한국어', t('Cancel')]
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        // 앱을 종료해도 언어 설정이 유지되도록 secure-store 설정
        switch (selectedIndex) {
          case 0:
            i18n.changeLanguage('en')
            setSecureStore('language', 'en')
            break
          case 1:
            i18n.changeLanguage('ko')
            setSecureStore('language', 'ko')
            break
          default:
            break
        }
      }
    )
  }

  return (
    <PrivateRoute>
      <SafeAreaView>
        <View style={styles.space} />
        <ListItem
          title={'언어 설정'}
          icon={<Entypo name="language" size={16} color={colors.black} />}
          onPress={handlePressLanguage}
        />
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
