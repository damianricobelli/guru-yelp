import React from "react"
import styles from "./Box.module.scss"

interface BoxProps {}

const Box: React.FC<any> = ({ children, style }: any) => {
  return (
    <div className={styles.Box} style={style}>
      {children}
    </div>
  )
}

export default Box
