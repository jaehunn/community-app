import { colors } from '@/constants/colors.constant'
import { Feather } from '@expo/vector-icons'
import { Link, router, Stack } from 'expo-router'

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
        name="write"
        options={{
          title: '글쓰기',
          headerShown: true,
          headerLeft: () => (
            <Link replace href="/">
              <Feather name="arrow-left" size={28} color="black" />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="edit/[id]"
        options={{
          title: '글수정',
          headerShown: true,
          headerLeft: () => (
            <Link replace href="/">
              <Feather
                name="arrow-left"
                size={28}
                color="black"
                onPress={() => {
                  router.back()
                }}
              />
            </Link>
          ),
        }}
      />
    </Stack>
  )
}
