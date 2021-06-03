import React from "react"
import classes from "./Button.module.scss"

interface indexProps {
  onClick: () => void
}

const Button: React.FC<indexProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={classes.Button}>
      {children}
    </button>
  )
}

export default Button
