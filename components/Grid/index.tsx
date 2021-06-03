import React, { ReactNode } from "react"
import styles from "./Grid.module.scss"
import cn from "classnames"

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Spacing = "xs" | "sm" | "md" | "lg"

type JustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
type AlignItems = "flex-start" | "center" | "flex-end"

const Grid: React.FC<
  {
    children: ReactNode
    container?: boolean
    item?: boolean
    xs?: Cols
    sm?: Cols
    md?: Cols
    lg?: Cols
    spacing?: Spacing
    justify?: JustifyContent
    align?: AlignItems
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  container,
  item,
  xs,
  sm,
  md,
  lg,
  spacing,
  justify,
  align,
  ...props
}) => {
  const classNames = cn({
    [styles.Grid_container]: container,
    [styles.Grid_item]: item,
    [styles[`Grid_xs_${xs}`]]: xs,
    [styles[`Grid_sm_${sm}`]]: sm,
    [styles[`Grid_md_${md}`]]: md,
    [styles[`Grid_lg_${lg}`]]: lg,
    [styles[`Grid_spacing_${spacing}`]]: spacing,
    [styles[`Grid_justifyContent_${justify}`]]: justify,
    [styles[`Grid_alignItems_${align}`]]: align
  })

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  )
}

export default Grid
