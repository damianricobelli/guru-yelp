import { RatingProps } from "./interfaces"

import Grid from "@components/Grid"

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"

export function Rating({ rating, numReviews }: RatingProps) {
  return (
    <div className="FlexRowCenter">
      <Grid item>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  size={18}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "#319795" : "#cbd5e0"}
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf
                  size={18}
                  key={i}
                  style={{ marginLeft: "1", color: "#319795" }}
                />
              )
            }
            return (
              <BsStar
                size={18}
                key={i}
                style={{ marginLeft: "1", color: "#319795" }}
              />
            )
          })}
      </Grid>
      <Grid style={{ marginLeft: 10, fontSize: 18 }}>
        <h5 style={{ margin: 0 }}>
          {numReviews} review{numReviews > 1 && "s"}
        </h5>
      </Grid>
    </div>
  )
}

export function RatingReview({ rating }: RatingProps) {
  return (
    <div className="FlexRowCenter">
      <Grid item>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  size={12}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "#319795" : "#cbd5e0"}
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf size={12} key={i} style={{ marginLeft: "1" }} />
              )
            }
            return <BsStar size={12} key={i} style={{ marginLeft: "1" }} />
          })}
      </Grid>
    </div>
  )
}
