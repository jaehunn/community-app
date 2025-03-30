import { colors } from '@/constants/colors.constant'
import { Stack } from 'expo-router'

// Tab 이 아닌 스크린은 Stack 사용.
export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.gray200,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: '설정',
        }}
      />
    </Stack>
  )
}
