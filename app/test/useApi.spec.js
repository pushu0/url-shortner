import useApi from '@/compositions/useApi'

const mockArrayOfOne = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: '6myi4tws',
          short: 'https://pbid.io/6myi4tws',
          timestamp: '2021-02-21T19:42:13.173Z',
          url: 'http://test.com',
        },
      ]),
  })
)

const mockArrayOfTwo = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: '6myi4tws',
          short: 'https://pbid.io/6myi4tws',
          timestamp: '2021-02-21T19:42:13.173Z',
          url: 'http://test.com',
        },
        {
          id: '4tws6myi',
          short: 'https://pbid.io/4tws6myi',
          timestamp: '2021-02-21T19:42:13.173Z',
          url: 'http://test2.com',
        },
      ]),
  })
)

const mockUrlModel = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 'newEntry',
        short: 'https://pbid.io/newEntry',
        timestamp: '2021-02-21T19:42:13.173Z',
        url: 'http://testNew.com',
      }),
  })
)

describe('Use Api', () => {
  const { collection, fetchCollection, shortenUrl } = useApi()
  test('Collection gets fetched and populated correctly', async () => {
    global.fetch = () => ({})
    await fetchCollection()
    expect(collection.value.length).toBe(0)
    expect(collection.value).toEqual([])

    global.fetch = mockArrayOfOne
    await fetchCollection()

    expect(collection.value.length).toBe(1)
    expect(collection.value[0].id).toBe('6myi4tws')

    global.fetch = mockArrayOfTwo
    await fetchCollection()

    expect(collection.value.length).toBe(2)
    expect(collection.value[0].id).toBe('6myi4tws')
    expect(collection.value[1].id).toBe('4tws6myi')
  })

  test('Shorten url to return the model and add it to collection', async () => {

    global.fetch = mockUrlModel
    const received = await shortenUrl()
    expect(received.id).toBe('newEntry')
    expect(received.short).toBe('https://pbid.io/newEntry')

    expect(collection.value.length).toBe(3)
    expect(collection.value[0].id).toBe('newEntry')
  })
})
