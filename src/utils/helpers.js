export const datetimeToLocaleString = (isoDatetime) => {
  let d = new Date(isoDatetime)
  return d.toLocaleString()
}
