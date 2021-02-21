<template>
  <div class="link-container">
    <input
      :value="url"
      type="text"
      readonly
      name="generatedUrl"
      class="text-input"
    />

    <button rel="noopener noreferrer" class="button--main" @click="input">
      <copy fill="white" />
    </button>
    <button rel="noopener noreferrer" class="button--main" @click="reset">
      Shorten new url
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Copy from './icons/Copy'

export default defineComponent({
  components: {
    Copy
  },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup(_, { emit }) {
    const input = () => emit('input')
    const reset = () => emit('reset')
    return {
      input,
      reset,
    }
  },
})
</script>
<style scoped>
.text-input {
  display: inline-block;
  border-radius: 4px;
  border: 0px;
  color: var(--charcoal);
  text-decoration: none;
  padding: 10px 10px;
  margin-left: 15px;
  font-size: 16px;
  display: flex;
  flex: 1;
  background-color: var(--light-gray);
}
.text-input:focus {
  outline: var(--dark-blue) auto 1px;
}
.link-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
