import { QueryClientProvider } from '@/providers/query-client.provider'
import { useGetMe } from '@/queries/use-get-me.query'
import React from 'react'
import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { PropsWithChildren, useEffect } from 'react'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

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
    <QueryClientProvider>
      <Router />
    </QueryClientProvider>
  )
}

/**
 * Route 마다 렌더링되지 않음.
 */
function Router() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Auth Route */}
      <Stack.Screen name="auth" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export function PrivateRoute({ children }: PropsWithChildren<unknown>) {
  const { data: me } = useGetMe()

  console.log('layout', me)

  useEffect(() => {
    if (me?.id == null) {
      router.replace('/auth')
    }
  }, [me?.id])

  return <>{children}</>
}
