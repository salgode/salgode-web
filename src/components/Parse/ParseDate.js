function ParseDate(props) {
  const today = new Date(props)
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  const date = dd + '/' + mm + '/' + yyyy
  return date
}

export default ParseDate
