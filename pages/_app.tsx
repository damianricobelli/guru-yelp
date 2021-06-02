import type { AppProps } from "next/app"
import "../styles/globals.css"

import { Router } from "next/dist/client/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

import { QueryClient, QueryClientProvider } from "react-query"

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 200 })

Router.events.on("routeChangeStart", () => {
  NProgress.start()
})

Router.events.on("routeChangeComplete", () => {
  NProgress.done()
})

Router.events.on("routeChangeError", () => {
  NProgress.done()
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
