<template>
  <div class="container">
    <transition name="fade" appear>
      <hero-card />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HeroCard from '../components/HeroCard.vue'

export default defineComponent({
  components: {
    HeroCard,
  },
  setup() {},
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
}

.outer-card {
  position: relative;
  background-color: white;
  border-radius: 20px;
  width: 80%;
  padding: 6% 10% 8% 8%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.outer-card .wrapper {
  max-width: 70%;
  margin: auto;
}
</style>
