<template>
  <div class="link-container">
    <input
      v-model="url"
      type="text"
      name="url"
      class="text-input"
      placeholder="Enter long url here"
      @keydown.enter="input"
    />
    <button
      rel="noopener noreferrer"
      class="button--main"
      :disabled="!isValid"
      @click="input"
    >
      Shorten Url
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import useUtils from '../compositions/useUtils'

export default defineComponent({
  setup(_, { emit }) {
    const url = ref<string>('')
    const input = () => emit('input', url.value)

    const { validators } = useUtils()

    const isValid = computed(() => validators.isURL(url.value))
    return {
      isValid,
      url,
      input,
    }
  },
})
</script>
<style>
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
  flex: 6;
  background-color: var(--light-gray);
}
.text-input:focus {
  outline: var(--dark-blue) auto 1px;
}
button {
  flex: 1;
}
.link-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
