import { mount } from '@vue/test-utils'
import RecentListItem from '@/components/RecentListItem.vue'
import useUtils from '@/compositions/useUtils'
import { urlModel } from './_mocks'

describe('RecentListItem', () => {
  const wrapper = mount(RecentListItem, {
    propsData: {
      item: urlModel,
    },
  })
  test('Renders prop correctly', () => {
    const { utils } = useUtils()

    expect(wrapper.props().item.id).toBe(urlModel.id)
    expect(wrapper.find('.url').text()).toBe(urlModel.short)
    expect(wrapper.find('.timestamp').text()).toBe(
      utils.formatDate(urlModel.timestamp)
    )
  })
})
