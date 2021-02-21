<template>
  <div :key="item.id" class="list-item">
    <div>
      <div class="url">{{ item.short }}</div>
      <div class="timestamp">{{ formatDate(item.timestamp) }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import useUtils from '../compositions/useUtils'
import { UrlModel } from '../../api/src/db/models/Url.model'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<UrlModel>,
      required: true,
    }
  },
  setup() {
    const { utils } = useUtils()

    return {
      formatDate: utils.formatDate,
    }
  },
})
</script>
<style scoped>
.list-item {
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: row;
}

.timestamp {
  font-size: 10px;
  margin-top: 4px;
  text-transform: uppercase;
}
</style>
