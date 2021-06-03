import React from "react"

import { GetStaticProps, GetStaticPaths } from "next"
import axios from "axios"
import { gql } from "@apollo/client"
import client from "../../apollo/apollo-client"

import Grid from "@components/Grid"
import { useRouter } from "next/router"
import classes from "./Item.module.scss"
import Box from "@components/Box"

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import { FiPhoneCall } from "react-icons/fi"
import { FaRegBuilding } from "react-icons/fa"
import { HiOutlineChatAlt2 } from "react-icons/hi"
import { keyBy, days, getHour } from "@utils/index"
import { v4 as uuid } from "uuid"

interface RatingProps {
  rating: number
  numReviews?: number
}

interface indexProps {
  item_data: IItemDetail
}

interface IOpen {
  start: string
  end: string
  day: number
}
interface IHour {
  hours_type: string
  is_open_now: boolean
  open: IOpen[]
}

interface IUser {
  id: string
  profile_url: string
  name: string
  image_url: string
}
interface IReview {
  text: string
  rating: number
  time_created: string
  url: string
  user: IUser
}
interface IItemDetail {
  display_phone: string
  phone: string
  is_closed: boolean
  location: {
    __typename: string
    address1: string
    city: string
    state: string
    country: string
  }
  rating: number
  review_count: number
  url: string
  __typename: string
  photos: string[]
  price: string | null
  name: string
  hours: IHour[]
  reviews: IReview[]
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
    </div>
  )
}

const Item: React.FC<indexProps> = ({ item_data }: indexProps) => {
  console.log(item_data)
  const openHours = item_data.hours[0].open
  const indexedOpenHours = keyBy(openHours, "day")
  console.log(indexedOpenHours)
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
            src={item_data.photos[0]}
            alt={`Picture of ${item_data.name}`}
          />
          <div className="FlexColumn">
            <div className={classes.Title}>
              <h1>{item_data.name}</h1>
              <div className={classes.Status}>
                <span
                  className={classes.StatusClose}
                  style={{
                    backgroundColor: item_data.hours[0].is_open_now && "#38a169"
                  }}
                >
                  {!item_data.hours[0].is_open_now
                    ? "Cerrado"
                    : "Abierto ahora"}
                </span>
                <span
                  className={classes.StatusOpen}
                  style={{
                    backgroundColor: !item_data.price && "#718096",
                    color: !item_data.price && "white"
                  }}
                >
                  {item_data.price ? item_data.price : "Sin info de precios"}
                </span>
              </div>
            </div>
            <Rating
              rating={item_data.rating}
              numReviews={item_data.review_count}
            />
            <span style={{ paddingTop: 20 }}>
              <FiPhoneCall
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              {item_data.display_phone}
            </span>
            <span>
              <FaRegBuilding
                style={{ marginRight: 10, position: "relative", top: 2 }}
              />
              {item_data.location.address1}
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
              {Object.keys(indexedOpenHours).map((key: any) =>
                indexedOpenHours[key].map((hour: IOpen) => (
                  <div
                    key={uuid()}
                    className="FlexRowCenter"
                    style={{
                      gap: 12
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{days[key]}:</span>
                    <span style={{ fontWeight: 400 }}>
                      {getHour(hour.start)} - {getHour(hour.end)}
                    </span>
                  </div>
                ))
              )}
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
                {item_data.reviews.length > 0
                  ? "Comentarios destacados"
                  : "Sin comentarios"}
              </h2>
            </div>
            {item_data.reviews.slice(0, 5).map((review: IReview) => (
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
                  <img
                    className={classes.UserImage}
                    src={review.user.image_url}
                    alt={`Picture of ${review.user.name}`}
                  />
                  <div className="FlexColumn" style={{}}>
                    <span style={{ fontWeight: 600 }}>{review.user.name}</span>
                    <span>{review.time_created}</span>
                  </div>
                </div>
                <RatingReview rating={review.rating} />
                <span>{review.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Grid>
  )
}

export default Item

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.item
  try {
    const { data: item } = await client.query({
      query: gql`
        query GetDataItem {
          business(id: "${id}") {
            name
            photos
            is_closed
            url
            phone
            display_phone
            review_count
            rating
            price
            hours {
              hours_type
              is_open_now
              open {
                start
                end
                day
              }
            }
            reviews {
              text,
              rating,
              time_created,
              url,
              user {
                id,
                profile_url,
                name,
                image_url
              }
            }
            location {
              address1
              city
              state
              country
            }
          }
        }
      `
    })

    return {
      props: {
        item_data: item.business
      },
      revalidate: 300
    }
  } catch (error) {
    return {
      props: {
        error
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    fallback: true,
    paths: []
  }
}
