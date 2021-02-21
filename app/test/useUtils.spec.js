import useUtils from '@/compositions/useUtils'

describe('Use Utils', () => {
  const { utils, validators } = useUtils()
  test('Format date returns in correct format', () => {
    const { formatDate } = utils
    const timestamp = '2021-02-21T19:42:13.173Z'
    expect(formatDate(timestamp)).toBe('21 February 2021 @19:42:13')

    const timesBelowZero = '2021-02-21T09:02:03.173Z'
    expect(formatDate(timesBelowZero)).toBe('21 February 2021 @09:02:03')
  })

  test('isUrl validates as expected', () => {
    const { isURL } = validators
    const incorrectUrl = 'random'
    expect(isURL(incorrectUrl)).toBe(false)

    const incorrectUrlWithProtocol = 'http://random'
    expect(isURL(incorrectUrlWithProtocol)).toBe(false)

    const simpleUrl = 'random.com'
    expect(isURL(simpleUrl)).toBe(true)

    const simpleUrlWithProtocol = 'http://random.com'
    expect(isURL(simpleUrlWithProtocol)).toBe(true)
  })

  test('isProtocol checks if protocol exists', () => {
    const { isProtocol } = validators
    const incorrectUrl = 'random'
    expect(isProtocol(incorrectUrl)).toBe(false)

    const incorrectUrlWithProtocol = 'http://random'
    expect(isProtocol(incorrectUrlWithProtocol)).toBe(true)

    const simpleUrl = 'random.com'
    expect(isProtocol(simpleUrl)).toBe(false)

    const simpleUrlWithProtocol = 'ftp://random.com'
    expect(isProtocol(simpleUrlWithProtocol)).toBe(true)
  })
})
