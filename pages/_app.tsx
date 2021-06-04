import type { AppProps } from "next/app"
import "@styles/globals.scss"
import "@styles/theme.scss"

import { Router } from "next/dist/client/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

import { QueryClient, QueryClientProvider } from "react-query"
import Layout from "@components/Layout"

import { ApolloProvider } from "@apollo/client/react"
import client from "apollo/apollo-client"

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
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export default MyApp
