import classes from "./Card.module.scss"
import React from "react"
import Grid from "@components/Grid"

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import { FiShoppingCart, FiPhoneCall } from "react-icons/fi"
import { FaRegBuilding } from "react-icons/fa"

interface indexProps {}

interface RatingProps {
  rating: number
  numReviews: number
}

const data = {
  isNew: true,
  imageURL: "https://www.webnode.es/blog/files/2018/07/online-store.png",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Grid container style={{ paddingTop: 18 }}>
      <Grid item>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "#319795" : "#cbd5e0"}
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />
          })}
      </Grid>
      <Grid>
        <h5 style={{ margin: "2px 0 20px 0" }}>({numReviews})</h5>
      </Grid>
    </Grid>
  )
}

const Card: React.FC<indexProps> = ({}) => {
  return (
    <div className={classes.Card}>
      <Grid spacing={"xs"} container align="center" justify="space-between">
        <Grid item xs={12}>
          <img
            className={classes.CardImage}
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
          />
        </Grid>
        <Grid item xs={6} className={classes.Spacing}>
          <span className={classes.BusinessText}>1. Rock n fellers</span>
        </Grid>
        <Grid item xs={6} className={classes.Spacing}>
          <Rating rating={data.rating} numReviews={data.numReviews} />
        </Grid>
        <div style={{ paddingBottom: "1.75rem" }}>
          <Grid item xs={6} className={classes.Spacing}>
            <span className={classes.SecondaryText}>
              <FiPhoneCall
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              3413104099
            </span>
          </Grid>
          <Grid item xs={6} className={classes.Spacing}>
            <span className={classes.SecondaryText}>
              {" "}
              <FaRegBuilding
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              Avenida Juan Jose Paso
            </span>
          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default Card
