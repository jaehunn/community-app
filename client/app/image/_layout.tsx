import { colors } from '@/constants/colors.constant'
import { Foundation } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'

export default function ImageLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.black,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
