import { mount } from '@vue/test-utils'
import GeneratedUrl from '@/components/GeneratedUrl.vue'

describe('GeneratedUrl', () => {
  const wrapper = mount(GeneratedUrl, {
    propsData: {
      url: 'nameOfUrl.here',
    },
  })
  test('Renders prop correctly', () => {
    const input = wrapper.find('input')

    expect(wrapper.props().url).toBe('nameOfUrl.here')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('nameOfUrl.here')
  })

  test('Button exists and emits', async () => {
    const button = wrapper.find('button')

    await button.trigger('click')
    expect(wrapper.emitted().reset).toBeTruthy()
  })
})

