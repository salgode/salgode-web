/* DEFINE KEYS */
export const USER_DATA = 'userData'
export const TOKEN = 'token'
/* HELPERS */

export function setObject(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, btoa(JSON.stringify(value)))
  }
}

export function getObject(key) {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key)
    return value && JSON.parse(atob(value))
  }
  return {}
}

export function resetStorage() {
  setObject(USER_DATA, {})
  setObject(TOKEN, {})
}
