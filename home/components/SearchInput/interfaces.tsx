interface IAddressComponents {
  long_name: string
  short_name: string
  types: string[]
}

interface IGeometry {
  lat: string
  lng: string
}

export interface IAutocomplete {
  address_components: IAddressComponents[]
  formatted_address: string
  geometry: IGeometry
}
