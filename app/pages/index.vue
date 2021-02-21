<template>
  <div class="container">
    <transition name="fade" appear>
      <hero-card />
    </transition>

    <div v-if="collection.length" class="outer-card table">
      <h2>Recent</h2>
      <div v-if="loading">Loading</div>
      <ul>
        <transition-group
          v-for="item in collection"
          :key="item.id"
          name="slide-fade"
          mode="in-out"
          appear
          tag="li"
        >
          <div :key="item.id" class="list-item">
            <div>
              <div class="url">{{ item.short }}</div>
              <div class="timestamp">{{ formatDate(item.timestamp) }}</div>
            </div>
            <div class="spacer"></div>
            <div>
              <img src="info-24px.svg" alt="" />
              <img src="content_copy-24px.svg" alt="" />
            </div>
          </div>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HeroCard from '../components/HeroCard.vue'
import useApi from '../compositions/useApi'
// import { UrlModel } from '../../api/src/db/models/Url.model'

export default defineComponent({
  components: {
    HeroCard,
  },
  setup() {
    const { loading, collection, utils, fetchCollection } = useApi()

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

.list-item {
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: row;
}

li:first-child .list-item {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
li:last-child .list-item {
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

.timestamp {
  font-size: 10px;
  margin-top: 4px;
  text-transform: uppercase;
}
</style>
