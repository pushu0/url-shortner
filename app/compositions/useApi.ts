import { computed, ref } from '@nuxtjs/composition-api'
import { UrlModel } from '../../api/src/db/models/Url.model'
import useUtils from './useUtils'

const baseApiUrl = 'http://localhost:8080'

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
  try {
    const response = await post(url)
    const data = await response.json()
    addToCollection(data)
    return data
  } catch (e) {
    // TODO Error page
  } finally {
    loading.value = false
  }

}

const useApi = () => {
  return {
    loading,
    collection: computed(() => Object.values(collection.value)),
    shortenUrl,
    fetchCollection,
  }
}

const post = (data: string) => {
  const { validators } = useUtils()
  const protocol = validators.isProtocol(data) ? '' : 'http://'
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

export default useApi
