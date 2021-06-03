import classes from "./Container.module.scss"
import React from "react"

const Container: any = ({ children, props }) => {
  return (
    <div className={classes.Container} {...props}>
      {children}
    </div>
  )
}

export default Container
