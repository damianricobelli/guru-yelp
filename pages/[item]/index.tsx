import React from "react"
import Grid from "@components/Grid"
import { useRouter } from "next/router"
import classes from "./Item.module.scss"
import Box from "@components/Box"

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import { FiPhoneCall } from "react-icons/fi"
import { FaRegBuilding } from "react-icons/fa"
import { HiOutlineChatAlt2 } from "react-icons/hi"

interface RatingProps {
  rating: number
  numReviews?: number
}

interface indexProps {}

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
                <BsStarHalf size={18} key={i} style={{ marginLeft: "1" }} />
              )
            }
            return <BsStar size={18} key={i} style={{ marginLeft: "1" }} />
          })}
      </Grid>
      <Grid style={{ marginLeft: 10, fontSize: 18 }}>
        <h5 style={{ margin: 0 }}>{numReviews} comentarios</h5>
      </Grid>
    </div>
  )
}

function RatingReview({ rating }: RatingProps) {
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
      <Grid style={{ marginLeft: 10, fontSize: 14 }}>
        <h5 style={{ margin: 0 }}>10/08/2020</h5>
      </Grid>
    </div>
  )
}

const Item: React.FC<indexProps> = ({}) => {
  const router = useRouter()
  return (
    <Grid container style={{ position: "relative" }}>
      <Box style={{ position: "relative" }}>
        <div className={classes.GridContainer}>
          <button
            className={classes.BackButton}
            style={{ position: "absolute", top: 40 }}
            onClick={() => router.back()}
          >
            Volver
          </button>
          <img
            className={classes.CardImage}
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
          />
          <div className="FlexColumn">
            <div className={classes.Title}>
              <h1>1. Rock & Feller's</h1>
              <div className={classes.Status}>
                <span className={classes.StatusClose}>Cerrado</span>
                <span className={classes.StatusOpen}>$$$</span>
              </div>
            </div>
            <Rating rating={data.rating} numReviews={data.numReviews} />
            <span style={{ paddingTop: 20 }}>
              <FiPhoneCall
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              3413104099
            </span>
            <span>
              <FaRegBuilding
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              Avenida Juan Jose Paso
            </span>
            <h4 style={{ textDecoration: "underline", margin: "20px 0 0 0" }}>
              Días y horarios
            </h4>
            <div
              className="FlexColumn"
              style={{
                gap: 8,
                marginTop: 14
              }}
            >
              <div
                className="FlexRowCenter"
                style={{
                  gap: 12
                }}
              >
                <span style={{ fontWeight: 600 }}>Lunes:</span>
                <span style={{ fontWeight: 400 }}>
                  11:00 AM - 2:00 PM 9:00 PM - 10:00 PM
                </span>
              </div>
              <div
                className="FlexRowCenter"
                style={{
                  gap: 12
                }}
              >
                <span style={{ fontWeight: 600 }}>Lunes:</span>
                <span style={{ fontWeight: 400 }}>
                  11:00 AM - 2:00 PM 9:00 PM - 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.GridReviewsContainer}>
          <div
            className="FlexColumn"
            style={{
              gap: 20
            }}
          >
            <div
              className="FlexRowCenter"
              style={{
                gap: 12
              }}
            >
              <HiOutlineChatAlt2 size={24} />
              <h2
                style={{ margin: "0 0 0 0" }}
                className={classes.CommentaryTitle}
              >
                Comentarios destacados
              </h2>
            </div>
            <div
              className={classes.Review}
              style={{
                flexDirection: "column",
                display: "flex",
                gap: 12
              }}
            >
              <div
                className="FlexRowCenter"
                style={{
                  gap: 12
                }}
              >
                {" "}
                <img
                  className={classes.UserImage}
                  src={data.imageURL}
                  alt={`Picture of ${data.name}`}
                />
                <div className="FlexColumn" style={{}}>
                  <span style={{ fontWeight: 600 }}>Agustina D.</span>
                  <span>Rosario, Argentina</span>
                </div>
              </div>
              <RatingReview rating={data.rating} />
              <span>
                Customer service: it really depends on who the waiter is. S/he
                can be very attentive or quite rude. Food: it's always mouth
                watering and abundant. Price: might be just a little bit more
                expensive than other places in town, but taking into account the
                decoration, atmosphere and cleaning it is worth it.
              </span>
            </div>
          </div>
        </div>
      </Box>
    </Grid>
  )
}

export default Item
