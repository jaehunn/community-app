import { colors } from '@/constants/colors.constant'
import { Feather } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { Pressable } from 'react-native'

export default function PostLayout() {
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
        // write/index 로 잡아야 타이틀 정상적으로 설정가능.
        name="write/index"
        options={{
          headerTitle: '글쓰기',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.replace('/')}>
              <Feather name="arrow-left" size={28} color={colors.black} />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="[id]/index"
        options={{
          headerTitle: '게시글',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.black} />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="edit/[id]"
        options={{
          headerTitle: '글수정',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.black} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}
