const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const prependZero = (no: number) => (no < 10 ? '0' + no : no)
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  const hour = prependZero(date.getHours())
  const minutes = prependZero(date.getMinutes())
  const seconds = prependZero(date.getSeconds())

  return (
    day + ' ' + month + ' ' + year + ' @' + hour + ':' + minutes + ':' + seconds
  )
}

const isURL = (str: string) =>
  /(?:https?:\/\/)?(?:[a-zA-Z0-9.-]+?\.(?:[a-zA-Z])|\d+\.\d+\.\d+\.\d+)/.test(
    str
  )

const isProtocol = (url: string) => {
  try {
    const urlObj = new URL(url)
    return !!urlObj.protocol
  } catch {
    return false
  }
}

const validators = {
  isURL,
  isProtocol,
}

const utils = {
  formatDate,
}

const useUtils = () => ({
  validators,
  utils,
})

export default useUtils
