import React from "react"
import { useRouter } from "next/router"
import Card from "@components/Card"
import Grid from "@components/Grid"
import classes from "./Home.module.scss"

import { IAutocomplete } from "../components/SearchInput/interfaces"
import SearchLocation from "../components/SearchInput"
import { v4 as uuid } from "uuid"

import { useForm } from "react-hook-form"

import { gql, useLazyQuery } from "@apollo/client"

import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { useStoreData } from "@stores/useStoreData"

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

const GET_NEW_DATA = gql`
  query search($term: String!, $latitude: Float!, $longitude: Float!) {
    search(term: $term, latitude: $latitude, longitude: $longitude, limit: 10) {
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
  const [term, setTerm] = React.useState<string>("")
  const [query, setQuery] = React.useState<string>("")
  const [queryObject, setQueryObject] = React.useState<IAutocomplete>(null)

  const { handleSubmit } = useForm()

  const latitude = queryObject?.geometry.lat
  const longitude = queryObject?.geometry.lng

  const [search, { loading, error, data }] = useLazyQuery(GET_NEW_DATA, {
    variables: {
      term: term,
      latitude: latitude,
      longitude: longitude
    }
  })

  const handleClickItem = (i: string) => {
    router.push({
      pathname: "/[item]",
      query: { item: i }
    })
  }

  const handleChangeTerm = (e: any) => {
    setTerm(e.target.value)
  }

  const handleSearchData = (e: any) => {
    e.preventDefault()
    search()
  }

  if (data) {
    initialBusiness = data.search.business
  }

  const onSubmit = async (formData: any) => {
    if (queryObject) {
      search()
    }
  }

  return (
    <>
      <Grid container align="center" justify="center">
        <span className={classes.Title}>
          Todos los comercios en un solo lugar
        </span>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.GridContainer}>
          <input
            onChange={handleChangeTerm}
            className={classes.InputSearch}
            placeholder="Busca Restaurantes, negocios, etc..."
          />
          <SearchLocation
            queryValue={query}
            handleQuery={setQuery}
            handleQueryObject={setQueryObject}
          />
          <button type="submit" className={classes.ButtonSearch}>
            Buscar
          </button>
        </div>
      </form>
      {!loading ? (
        <div className="GridContainer">
          {initialBusiness.map((item: IItem) => (
            <div
              key={uuid()}
              style={{ paddingTop: 50 }}
              onClick={() => handleClickItem(item.id)}
            >
              <Card data={item} />
            </div>
          ))}
        </div>
      ) : (
        <Grid
          container
          align="center"
          justify="center"
          style={{ paddingTop: "2rem" }}
        >
          <Loader
            type="Puff"
            color="#319795"
            height={100}
            width={100}
            // timeout={3000}
          />
        </Grid>
      )}
    </>
  )
}

export default Home
