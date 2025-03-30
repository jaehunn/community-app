import { colors } from '@/constants/colors.constant'
import { Feather } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { Pressable } from 'react-native'

export default function ProfileLayout() {
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
        name="edit"
        options={{
          headerShown: true,
          headerTitle: '프로필 수정',

          // remove Back Title
          headerBackButtonDisplayMode: 'minimal',

          // remove line
          headerShadowVisible: false,

          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()}>
                <Feather name="arrow-left" size={28} color={colors.black} />
              </Pressable>
            )
          },
        }}
      />

      <Stack.Screen
        name="avatar"
        options={{
          headerShown: true,
          headerTitle: '프로필 이미지 변경',

          // remove Back Title
          headerBackButtonDisplayMode: 'minimal',

          // remove line
          headerShadowVisible: false,

          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()}>
                <Feather name="arrow-left" size={28} color={colors.black} />
              </Pressable>
            )
          },
        }}
      />

      <Stack.Screen
        // dynamic path (유저 ID)
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: '',

          // remove Back Title
          headerBackButtonDisplayMode: 'minimal',

          // remove line
          headerShadowVisible: false,

          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()}>
                <Feather name="arrow-left" size={28} color={colors.black} />
              </Pressable>
            )
          },
        }}
      />
    </Stack>
  )
}
