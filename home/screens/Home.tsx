import React from "react"
import Card from "@components/Card"
import Grid from "@components/Grid"
import classes from "./Home.module.scss"

import { IAutocomplete } from "../components/SearchInput/interfaces"
import SearchLocation from "../components/SearchInput"

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [query, setQuery] = React.useState<string>("")
  const [queryObject, setQueryObject] =
    React.useState<IAutocomplete | boolean>(null)

  return (
    <>
      <Grid container align="center" justify="center">
        <span className={classes.Title}>
          Todos los comercios en un solo lugar
        </span>
      </Grid>
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
        <Grid item xs={12} sm={8} md={8} lg={6}>
          <input
            className={classes.InputSearch}
            placeholder="Busca Restaurantes, negocios, etc..."
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={6}>
          <SearchLocation
            queryValue={query}
            handleQuery={setQuery}
            handleQueryObject={setQueryObject}
          />
        </Grid>
      </Grid>
      <div className="GridContainer">
        {Array(10)
          .fill("")
          .map((el: any, i: any) => (
            <div key={i} style={{ paddingTop: 50 }}>
              <Card />
            </div>
          ))}
      </div>
    </>
  )
}

export default Home
