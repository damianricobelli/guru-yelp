import { ApolloClient, InMemoryCache } from "@apollo/client"

console.log(process.env.YELP_API_KEY)

const client = new ApolloClient({
  uri: "https://api.yelp.com/v3/graphql",
  cache: new InMemoryCache(),
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.YELP_API_KEY}`,
        "Content-Type": "application/graphql"
      }
    })
  },
  fetchOptions: {
    mode: "no-cors"
  }
})

export default client
