export const keyBy = (arr: any, key: string) =>
  arr.reduce((acc: any, el: any) => {
    acc[el[key]] = [el]
    return acc
  }, {})

export const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
]

export const getHour = (hour: string) => {
  return hour.slice(0, 2) + ":" + hour.slice(2)
}
