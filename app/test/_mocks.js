export const mockArrayOfOne = jest.fn(() =>
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

export const mockArrayOfTwo = jest.fn(() =>
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

export const mockUrlModel = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(urlModel),
  })
)

export const urlModel = {
  id: 'newEntry',
  short: 'https://pbid.io/newEntry',
  timestamp: '2021-02-21T19:42:13.173Z',
  url: 'http://testNew.com',
}
