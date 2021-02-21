import { computed, ref } from '@nuxtjs/composition-api'
import { UrlModel } from '../../api/src/db/models/Url.model'

const baseApiUrl = 'http://localhost:8080'
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

type Collection<T> = {
  [id: string]: T
}

const loading = ref<boolean>(false)
const collection = ref<Collection<UrlModel>>({})

const fetchCollection = async () => {
  loading.value = true
  try {
    const data = await getAll()
    populateCollection(data)
  } catch (e) {
    // TODO error page
  } finally {
    loading.value = false
  }
}

const populateCollection = (data: UrlModel[]) =>
  (collection.value = data.reduce(
    (collection, item: UrlModel) => ({ ...collection, [item.id]: item }),
    {}
  ))

const addToCollection = (data: UrlModel) => {
  const isInCollection = collection.value[data.id]
  if (isInCollection) return
  collection.value = {
    [data.id]: data,
    ...collection.value,
  }
}

const shortenUrl = async (url: string) => {
  // loading.value = true
  try {
    const response = await post(url)
    const data = await response.json()
    addToCollection(data)
  } catch (e) {
    // TODO Error page
  } finally {
    // loading.value = false
  }
}

const useApi = () => {
  return {
    loading,
    collection: computed(() => Object.values(collection.value)),
    shortenUrl,
    fetchCollection,
    validators: {
      isURL,
      isProtocol,
    },
    utils: {
      formatDate,
    },
  }
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

const post = (data: string) => {
  const protocol = isProtocol(data) ? '' : 'http://'
  return fetch(`${baseApiUrl}/url-create`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      url: `${protocol}${data}`,
    }),
  })
}

const getAll = async () => {
  const response = await fetch(`${baseApiUrl}/urls`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  const data = await response.json()

  return data
}

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

export default useApi
