import React, { useState, useEffect, useRef } from "react"
import { GoLocation } from "react-icons/go"
import { IAutocomplete } from "./interfaces"

import classes from "../../screens/Home.module.scss"

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

function SearchLocationInput({ queryValue, handleQuery, handleQueryObject }) {
  const autoCompleteRef = useRef(null)
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(handleQuery, handleQueryObject, autoCompleteRef)
    )
  }, [])

  return (
    <input
      className={classes.InputSearch}
      ref={autoCompleteRef}
      onChange={(event) => handleQuery(event.target.value)}
      value={queryValue}
      type="text"
      placeholder="Cerca de..."
    />
  )
}

export default SearchLocationInput
