import { PressableText } from '@/components/pressable-text'
import { Link, router } from 'expo-router'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.ctaContainer}>
        <PressableText size="large" variant="fill" onPress={() => router.push('/auth/login')}>
          이메일 로그인
        </PressableText>
        <Link href="/auth/signup" style={styles.signupText}>
          이메일로 가입하기
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  ctaContainer: {
    paddingHorizontal: 32,
    flex: 1,
  },
  logo: {
    width: 112,
    height: 112,
  },
  signupText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
})
