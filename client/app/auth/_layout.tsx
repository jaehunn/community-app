import { colors } from '@/constants/colors.constant'
import { Foundation } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.black,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '로그인',
          headerShown: true,
          headerLeft: () => (
            <Link replace href="/">
              <Foundation name="home" size={28} color="black" />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: '이메일 로그인',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          title: '회원가입',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  )
}
