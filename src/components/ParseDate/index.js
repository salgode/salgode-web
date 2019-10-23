function ParseDate(props) {
  const today = new Date(props)
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()

  const date = dd + '/' + mm + '/' + yyyy
  return date
}

function ParseHour(props) {
  const hours = props.split('T')[1]
  const hour = hours.split(':')[0]
  const minutes = hours.split(':')[1]
  return hour + ':' + minutes
}

export { ParseDate, ParseHour }
