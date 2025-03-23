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
