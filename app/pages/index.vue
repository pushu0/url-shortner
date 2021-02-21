<template>
  <div class="container">
    <transition name="fade" appear>
      <hero-card />
    </transition>

    <recent-list
      v-if="collection.length"
      :items="collection"
      class="outer-card table"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HeroCard from '../components/HeroCard.vue'
import useApi from '../compositions/useApi'
import useUtils from '../compositions/useUtils'
import RecentList from '../components/RecentList.vue'

export default defineComponent({
  components: {
    HeroCard,
    RecentList,
  },
  setup() {
    const { loading, collection, fetchCollection } = useApi()
    const { utils } = useUtils()

    fetchCollection()

    return {
      loading,
      collection,
      formatDate: utils.formatDate,
    }
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #eaeaea;
  flex-direction: column;
}

.outer-card {
  position: relative;
  border-radius: 20px;
  width: 80%;
  margin: 2%;
}

.outer-card.table {
  padding: 0;
  border-radius: 0px;
  box-shadow: 0 0 0;
  background-color: transparent;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  text-align: left;
  font-size: 12px;
  border-bottom: 1px solid var(--light-gray);
}

li:first-child >>> .list-item {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
li:last-child >>> .list-item {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.outer-card .wrapper {
  max-width: 70%;
  margin: auto;
}

.spacer {
  flex: 1 1 auto;
}
</style>
