function ParseHour(props) {
  const hours = props.split('T')[1]
  const hour = hours.split(':')[0]
  const minutes = hours.split(':')[1]
  const hourSet = hour + ':' + minutes
  return hourSet
}

export default ParseHour
