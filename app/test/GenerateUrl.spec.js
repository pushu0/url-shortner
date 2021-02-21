import { mount } from '@vue/test-utils'
import GenerateUrl from '@/components/GenerateUrl.vue'

describe('GenerateUrl', () => {
  test('Button is disabled if url not valid', async () => {
    const wrapper = mount(GenerateUrl)
    const button = wrapper.find('button')
    const input = wrapper.find('input')
    await input.setValue('someIncompleteUrl')
    expect(button.element.disabled).toBe(true)
  })

  test('Button is enabled and emits if url valid', async () => {
    const wrapper = mount(GenerateUrl)
    const button = wrapper.find('button')
    const input = wrapper.find('input')
    await input.setValue('someUrl.com')
    expect(button.element.disabled).toBe(false)
    button.trigger('click')
    expect(wrapper.emitted().input).toEqual([['someUrl.com']])
  })

  test('Input emits whe url valid', async () => {
    const wrapper = mount(GenerateUrl)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    await input.setValue('someUrl.com')
    expect(input.element.value).toBe('someUrl.com')
    input.trigger('keydown.enter')
    expect(wrapper.emitted().input).toEqual([['someUrl.com']])
  })

  test('Input doesnt emit when url invalid', async () => {
    const wrapper = mount(GenerateUrl)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    await input.setValue('someIncompleteUrl')
    expect(input.element.value).toBe('someIncompleteUrl')
    input.trigger('keydown.enter')
    expect(wrapper.emitted().input).toBe(undefined)
  })
})
