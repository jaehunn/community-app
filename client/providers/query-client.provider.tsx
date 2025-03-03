import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

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
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}
