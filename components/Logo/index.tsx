import React from "react"
import classes from "./Logo.module.scss"

const Logo: React.FC = (props) => (
  <div className={classes.Logo} {...props}>
    <span>Guru Yelp</span>
  </div>
)

export default Logo
