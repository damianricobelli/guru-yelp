import React from "react"
import { useRouter } from "next/router"
import Card from "@components/Card"
import Grid from "@components/Grid"
import classes from "./Home.module.scss"
import Box from "@components/Box"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { IAutocomplete } from "../components/SearchInput/interfaces"
import { v4 as uuid } from "uuid"

import { useForm } from "react-hook-form"

import { gql, useLazyQuery } from "@apollo/client"

import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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

let autoComplete: any
declare const google: any

const loadScript = (url: any, callback: any) => {
  let script: any = document.createElement("script")
  script.type = "text/javascript"

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = () => callback()
  }

  script.src = url
  document.getElementsByTagName("head")[0].appendChild(script)
}

function handleScriptLoad(
  updateQuery: any,
  setQueryObject: any,
  autoCompleteRef: any
) {
  autoComplete = new google.maps.places.Autocomplete(autoCompleteRef.current, {
    types: ["(cities)"]
    // componentRestrictions: { country: "us" }
  })
  autoComplete.setFields([
    "address_components",
    "formatted_address",
    "geometry"
  ])
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, setQueryObject)
  )
}

async function handlePlaceSelect(updateQuery: any, setQueryObject: any) {
  const addressObject = autoComplete.getPlace()
  if (!addressObject.name) {
    const address_components = addressObject.address_components
    const formatted_address = addressObject.formatted_address
    const lat = addressObject.geometry.location.lat()
    const lng = addressObject.geometry.location.lng()
    const geometry = { lat, lng }
    const data = {
      address_components: address_components,
      formatted_address: formatted_address,
      geometry: geometry
    }
    updateQuery(formatted_address)
    setQueryObject(data)
  } else {
    setQueryObject(false)
  }
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
  const [query, setQuery] = React.useState<string>("")
  const [queryObject, setQueryObject] = React.useState<IAutocomplete>(null)

  const { handleSubmit, register } = useForm()

  const latitude = queryObject?.geometry.lat
  const longitude = queryObject?.geometry.lng

  const handleClickItem = (i: string) => {
    router.push({
      pathname: "/comercios/[item]",
      query: { item: i }
    })
  }

  const onSubmit = async (formData: any) => {
    const term = formData.term
    const location = formData.location
    if (term && location) {
      search()
    } else {
      toast.error("👉 Complete el término a buscar y la ubicación", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  const autoCompleteRef = React.useRef(null)
  const termRef = React.useRef(null)

  const [search, { loading, error, data, called }] = useLazyQuery(
    GET_NEW_DATA,
    {
      variables: {
        term: termRef?.current?.value,
        latitude: latitude,
        longitude: longitude
      }
    }
  )

  React.useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, setQueryObject, autoCompleteRef)
    )
  }, [])

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
            {...register("term")}
            ref={termRef}
            // onChange={handleChangeTerm}
            className={classes.InputSearch}
            placeholder="Busca Restaurantes, negocios, etc..."
          />
          <input
            {...register("location")}
            className={classes.InputSearch}
            ref={autoCompleteRef}
            onChange={(event) => {
              event.preventDefault()
              setQuery(event.target.value)
            }}
            value={query}
            type="text"
            placeholder="Cerca de..."
          />
          <button type="submit" className={classes.ButtonSearch}>
            Buscar
          </button>
        </div>
      </form>
      {(!loading && data) || (!loading && initialBusiness) ? (
        <div className="GridContainer">
          {data
            ? data.search.business.map((item: IItem) => (
                <div
                  key={uuid()}
                  style={{ paddingTop: 50 }}
                  onClick={() => handleClickItem(item.id)}
                >
                  <Card data={item} />
                </div>
              ))
            : initialBusiness.map((item: IItem) => (
                <div
                  key={uuid()}
                  style={{ paddingTop: 50 }}
                  onClick={() => handleClickItem(item.id)}
                >
                  <Card data={item} />
                </div>
              ))}
        </div>
      ) : called && loading ? (
        <Grid
          container
          align="center"
          justify="center"
          style={{ paddingTop: "2rem" }}
        >
          <Loader type="Puff" color="#319795" height={100} width={100} />
        </Grid>
      ) : (
        <Grid container style={{ position: "relative" }}>
          <Box style={{ position: "relative" }}></Box>
        </Grid>
      )}
      <ToastContainer />
    </>
  )
}

export default Home
