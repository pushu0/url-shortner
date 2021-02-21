<template>
  <div>
    <h2>Recent</h2>
    <ul>
      <transition-group
        v-for="item in items"
        :key="item.id"
        name="slide-fade"
        mode="in-out"
        appear
        tag="li"
      >
        <recent-list-item :key="item.id" :item="item" />
      </transition-group>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UrlModel } from '../compositions/useApi'
import RecentListItem from './RecentListItem.vue'

export default defineComponent({
  components: {
    RecentListItem,
  },
  props: {
    items: {
      type: Array as PropType<UrlModel[]>,
      required: true,
    },
  },
})
</script>
