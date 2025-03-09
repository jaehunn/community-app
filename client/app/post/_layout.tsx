import { colors } from '@/constants/colors.constant'
import { Feather } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'

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
    </Stack>
  )
}
