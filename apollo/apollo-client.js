import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: "https://api.yelp.com/v3/graphql"
})

const authLink = setContext((_, { headers }) => {
  const token = process.env.YELP_API_KEY
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Accept-Language": "en-US"
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
