import classes from "./Card.module.scss"
import React from "react"
import Grid from "@components/Grid"

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import { FiPhoneCall } from "react-icons/fi"
import { FaRegBuilding } from "react-icons/fa"
import { IItem } from "home/screens/Home"

interface RatingProps {
  rating: number
  numReviews: number
}

interface ICard {
  data: IItem
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
    <Grid container className={classes.RatingPosition}>
      <Grid item>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  size={12}
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "#319795" : "#cbd5e0"}
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf
                  size={12}
                  key={i}
                  style={{ marginLeft: "1", color: "#319795" }}
                />
              )
            }
            return (
              <BsStar
                size={12}
                key={i}
                style={{ marginLeft: "1", color: "#319795" }}
              />
            )
          })}
        <h6 style={{ margin: "2px 0 20px 0", fontWeight: 600 }}>
          {numReviews} review{numReviews > 1 && "s"}
        </h6>
      </Grid>
    </Grid>
  )
}

const Card: React.FC<ICard> = ({ data }: ICard) => {
  return (
    <div className={classes.Card}>
      <div className="FlexColCenter">
        <img
          className={classes.CardImage}
          src={data.photos[0]}
          alt={`Picture of ${data.name}`}
        />
        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <div className={classes.TitleReviewContainer}>
            <span
              style={{ textAlign: "start" }}
              className={classes.BusinessText}
            >
              {data.name}
            </span>
            <Rating rating={data.rating} numReviews={data.review_count} />
          </div>
          <div style={{ position: "relative", bottom: 10 }}>
            <span className={classes.SecondaryText}>
              <FiPhoneCall
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              {data.display_phone ? data.display_phone : "Sin teléfono"}
            </span>
          </div>
          <div style={{ position: "relative", bottom: 10 }}>
            <span className={classes.SecondaryText}>
              {" "}
              <FaRegBuilding
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              {data.location.address1}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
