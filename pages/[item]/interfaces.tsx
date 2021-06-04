export interface RatingProps {
  rating: number
  numReviews?: number
}

export interface indexProps {
  item_data: IItemDetail
  error: any
}

export interface IOpen {
  start: string
  end: string
  day: number
}
export interface IHour {
  hours_type: string
  is_open_now: boolean
  open: IOpen[]
}

export interface IUser {
  id: string
  profile_url: string
  name: string
  image_url: string
}
export interface IReview {
  text: string
  rating: number
  time_created: string
  url: string
  user: IUser
}
export interface IItemDetail {
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
