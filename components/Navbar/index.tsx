import React from "react"
import classes from "./Navbar.module.scss"
import Logo from "@components/Logo"
import { AiOutlineMenu } from "react-icons/ai"

import Button from "@components/Button"
import useDisclousure from "@hooks/useDisclousure"

import Grid from "@components/Grid"

const Navbar: React.FC = ({}) => {
  const { isOpen, onToggle } = useDisclousure()
  const Menu = () => (
    <Grid container>
      <Grid xs={12} style={{ marginLeft: "1rem" }}>
        <a href="https://github.com/damianricobelli/guru-yelp" target="_blank">
          <h4>Repositorio</h4>
        </a>
      </Grid>
    </Grid>
  )

  return (
    <div className={classes.Navbar}>
      <Grid container align="center" justify="space-between">
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <Button onClick={() => onToggle()}>
            <AiOutlineMenu size={20} />
          </Button>
        </Grid>
      </Grid>
      {isOpen && <Menu />}
    </div>
  )
}

export default Navbar
