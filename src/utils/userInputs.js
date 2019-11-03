function formatPhone(phone) {
  const phoneWithoutSpaces = phone.replace(/ /g, '')
  let finalPhone = ''
  const offset = phoneWithoutSpaces.slice(0, 1) === '+' ? [3, 4, 8] : [1, 5]
  for (const index in phoneWithoutSpaces) {
    if (offset.includes(parseInt(index))) {
      finalPhone = finalPhone.concat(' ')
    }
    finalPhone = finalPhone.concat(phoneWithoutSpaces[parseInt(index)])
  }
  return finalPhone.slice(0, maxLengthPhone(finalPhone))
}

function notWrongPhone(phone) {
  if (!phone) {
    return true
  }
  const phoneWithoutSpaces = phone.replace(/ /g, '')
  if (phoneWithoutSpaces.length < 4) {
    return /^(\+|\+5|\+56)$/g.test(phoneWithoutSpaces)
  }
  return /^\+569[0-9]*$/g.test(phoneWithoutSpaces)
}

function validPhone(phone) {
  if (!phone) {
    return false
  }
  const phoneWithoutSpaces = phone.replace(/ /g, '')
  return /^(\+[0-9]{11}|[0-9]{9})$/g.test(phoneWithoutSpaces)
}

function maxLengthPhone(phone) {
  if (phone.slice(0, 1) === '+') {
    return 12 + 3 // 3 Spaces
  } else {
    return 9 + 2 // 2 Spaces
  }
}

export { formatPhone, notWrongPhone, validPhone, maxLengthPhone }
