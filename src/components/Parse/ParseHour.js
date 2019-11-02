function ParseHour(props) {
  const today = new Date(props)
  const hour = today.getHours()
  const minutes = today.getMinutes()
  const hourSet = hour + ':' + minutes
  return hourSet
}

export default ParseHour
