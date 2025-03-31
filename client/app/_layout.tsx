import { QueryClientProvider } from '@/providers/query-client.provider'
import { useGetMe } from '@/queries/use-get-me.query'
import React from 'react'
import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { PropsWithChildren, useEffect } from 'react'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import * as Notifications from 'expo-notifications'
import i18n, { t } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { i18nOptions } from '@/libs/i18n'
import { getSecureStore } from '@/utils/secure-store.util'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

/** @see https://docs.expo.dev/push-notifications/push-notifications-setup/#add-a-minimal-working-example */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ActionSheetProvider>
      <QueryClientProvider>
        <Router />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  )
}

i18n.use(initReactI18next).init(i18nOptions)

/**
 * Route 마다 렌더링되지 않음.
 */
function Router() {
  const { data: me } = useGetMe()

  useEffect(() => {
    if (me?.nickname != null) {
      Toast.show({
        type: 'success',
        text1: t('Welcome Message', { nickname: me.nickname }),
        position: 'bottom',
      })
    }
  }, [me?.id])

  useEffect(() => {
    ;(async () => {
      const language = await getSecureStore('language')

      if (language != null) {
        i18n.changeLanguage(language)
      }
    })()
  }, [i18n])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Auth Route */}
      <Stack.Screen name="auth" options={{ headerShown: false }} />

      {/* Post Route */}
      <Stack.Screen name="post" options={{ headerShown: false }} />

      {/* Image Route */}
      <Stack.Screen name="image" options={{ headerShown: false }} />

      {/* Profile Route */}
      <Stack.Screen name="profile" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export function PrivateRoute({ children }: PropsWithChildren<unknown>) {
  const { data: me } = useGetMe()

  useEffect(() => {
    if (me?.id == null) {
      router.replace('/auth')

      return
    }
  }, [me?.id])

  return <>{children}</>
}
