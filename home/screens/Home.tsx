import React from "react"
import { useRouter } from "next/router"
import Card from "@components/Card"
import Grid from "@components/Grid"
import classes from "./Home.module.scss"

import { IAutocomplete } from "../components/SearchInput/interfaces"
import SearchLocation from "../components/SearchInput"
import useWindowSize from "@hooks/useWindowSize"
import { v4 as uuid } from "uuid"

import { gql, useQuery } from "@apollo/client"

interface HomeProps {
  initialBusiness: IItem[]
}

export interface IItem {
  name: string
  display_phone: string
  phone: string
  id: string
  location: {
    __typename: string
    address1: string
    city: string
    state: string
    country: string
  }
  rating: number
  review_count: number
  __typename: string
  photos: string[]
}

const MobileSearch: React.FC = ({ children }) => (
  <Grid
    container
    spacing={"sm"}
    align="center"
    justify="center"
    style={{
      marginTop: 40,
      marginBottom: 20
    }}
  >
    <Grid item xs={12}>
      <input
        className={classes.InputSearch}
        placeholder="Busca Restaurantes, negocios, etc..."
      />
    </Grid>
    <Grid item xs={12}>
      {children}
    </Grid>
    <Grid item xs={12}>
      <button className={classes.ButtonSearch}>Buscar</button>
    </Grid>
  </Grid>
)

const DesktopSearch: React.FC = ({ children }) => (
  <Grid
    container
    xs={12}
    spacing={"sm"}
    align="center"
    justify="center"
    style={{
      marginTop: 40,
      marginBottom: 20
    }}
  >
    <div className={classes.InputGroup}>
      <input
        className={classes.InputSearch}
        placeholder="Busca Restaurantes, negocios, etc..."
      />
      {children}
      <button className={classes.ButtonSearch}>Buscar</button>
    </div>
  </Grid>
)

const GET_NEW_DATA = gql`
  query GetDataSearch($term: String!) {
    search(term: $term, location: "Rosario", limit: 10) {
      business {
        id
        phone
        display_phone
        review_count
        rating
        photos
        name
        location {
          address1
          city
          state
          country
        }
      }
    }
  }
`

const Home: React.FC<HomeProps> = ({ initialBusiness }) => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const [query, setQuery] = React.useState<string>("")
  const [queryObject, setQueryObject] = React.useState<IAutocomplete>(null)

  const { loading, error, data } = useQuery(GET_NEW_DATA, {
    variables: { term: "Rock" }
  })

  console.log(error)

  const SearchLocationComponent = (
    <SearchLocation
      queryValue={query}
      handleQuery={setQuery}
      handleQueryObject={setQueryObject}
    />
  )

  const handleClickItem = (i: string) => {
    router.push({
      pathname: "/[item]",
      query: { item: i }
    })
  }

  return (
    <>
      <Grid container align="center" justify="center">
        <span className={classes.Title}>
          Todos los comercios en un solo lugar
        </span>
      </Grid>
      {windowSize?.width < 576 ? (
        <MobileSearch>{SearchLocationComponent}</MobileSearch>
      ) : (
        <DesktopSearch>{SearchLocationComponent}</DesktopSearch>
      )}
      <div className="GridContainer">
        {initialBusiness?.map((item: IItem) => (
          <div
            key={uuid()}
            style={{ paddingTop: 50 }}
            onClick={() => handleClickItem(item.id)}
          >
            <Card data={item} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
