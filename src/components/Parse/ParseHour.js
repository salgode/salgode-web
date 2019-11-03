function ParseHour(props) {
  const today = new Date(props)
  const hour = today.getHours()
  const minutes = today.getMinutes()
  const hourSet = ('0' + hour).slice(-2) + ':' + ('0' + minutes).slice(-2)
  return hourSet
}

export default ParseHour
