import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { useReactQueryDevTools } from '@dev-plugins/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
})

export function QueryClientProvider({ children }: PropsWithChildren<unknown>) {
  /** @see https://docs.expo.dev/debugging/devtools-plugins/ */
  // npm run start > shift+m
  // Open @dev-plugins/react-query
  useReactQueryDevTools(queryClient)

  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}
