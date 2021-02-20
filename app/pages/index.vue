<template>
  <div class="container">
    <transition name="fade" appear>
      <hero-card />
    </transition>
    <div class="outer-card table">
      <div v-if="loading">Loading</div>
      <ul v-for="item in collection" :key="item.id">
        <li>
          <div>
            <div class="url">{{ item.short }}</div>
            <div class="timestamp">12 Dec 1983</div>
          </div>
          <div class="spacer"></div>
          <div>
            <img src="info-24px.svg" alt="">
            <img src="content_copy-24px.svg" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import HeroCard from '../components/HeroCard.vue'
// import { UrlModel } from '../../api/src/db/models/Url.model'

export default defineComponent({
  components: {
    HeroCard,
  },
  setup() {
    const loading = ref<boolean>(false)
    const collection = ref<any[]>(null)

    loading.value = true

    fetch('http://localhost:8080/urls', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => (collection.value = data))
      .finally(() => {
        loading.value = false
      })

    return {
      loading,
      collection,
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
  background-color: white;
  border-radius: 20px;
  width: 80%;
  margin: 2%;
  padding: 6% 10% 8% 8%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.outer-card.table {
  padding: 0;
  border-radius: 0px;
  box-shadow: 0 0 0;
}

ul {
  padding: 0;
}

li {
  padding: 16px;
  list-style: none;
  text-align: left;
  border-bottom: 1px solid var(--light-gray);
  font-size: 12px;
  display: flex;
  flex-direction: row;
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
