<template>
  <div class="outer-card">
    <div class="hero-image">
      <hero-image />
    </div>
    <div class="card">
      <div class="wrapper">
        <h1 class="title">Shorten any <span class="highlight">links</span>.</h1>
        <div class="heading">
          <p class="heading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            ornare id neque vel semper. Nunc augue magna, blandit ac lorem at,
            ornare tempor diam.
          </p>
        </div>
        <div class="links">
          <input
            v-if="!isGeneratedState"
            v-model="url"
            type="text"
            name="url"
            class="text-input"
            placeholder="Enter long url here"
            @keydown.enter="shorten"
          />

          <input
            v-else
            :value="generatedUrl"
            type="text"
            readonly
            name="generatedUrl"
            class="text-input"
          />

          <button
            v-if="!isGeneratedState"
            rel="noopener noreferrer"
            class="button--main"
            :disabled="!isValid"
            @click="shorten"
          >
            Shorten Url
          </button>
          <button
            v-else
            rel="noopener noreferrer"
            class="button--main"
            @click="shorten"
          >
            Copy
            <img src="content_copy-24px.svg" alt="copy to clipboard" />
          </button>
          <button
            v-if="isGeneratedState"
            rel="noopener noreferrer"
            class="button--main"
            @click="resetState"
          >
            Shorten new url
          </button>
        </div>
        <div class="credentials">
          Powered by <span class="highlight">IWantThisJob</span>.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import useApi from '../compositions/useApi'
import useUtils from '../compositions/useUtils'
import HeroImage from './HeroImage.vue'

export default defineComponent({
  components: {
    HeroImage,
  },
  setup() {
    const url = ref<string>('')
    const isGeneratedState = ref<boolean>(false)
    const generatedUrl = ref<string>('')
    const { shortenUrl } = useApi()
    const { validators } = useUtils()
    const isValid = computed(() => validators.isURL(url.value))

    const resetState = () => {
      url.value = ''
      isGeneratedState.value = false
      generatedUrl.value = ''
    }

    return {
      url,
      isValid,
      isGeneratedState,
      generatedUrl,
      resetState,
      shorten: async () => {
        isGeneratedState.value = true
        const response = await shortenUrl(url.value)
        generatedUrl.value = response.short
      },
    }
  },
})
</script>
<style scoped>
.hero-image {
  max-width: 400px;
  width: 100%;
  margin: auto;
  margin-bottom: 3.2em;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 500;
  font-size: 40px;
  color: var(--charcoal);
  letter-spacing: 1px;
  margin-bottom: 0.2em;
}
.heading {
  max-width: 86%;
  margin: auto;
  margin-bottom: 0.7em;
}
.heading p {
  font-weight: 300;
  font-size: 13px;
  color: black;
  word-spacing: 5px;
  padding-bottom: 15px;
  text-align: center;
}

.links {
  padding-top: 15px;
  display: flex;
}

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

.credentials {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.outer-card {
  flex-direction: row;
  display: flex;
  align-items: center;

  padding: 4% 5% 6% 5%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
}

@media only screen and (max-width: 1200px) {
  .outer-card {
    flex-direction: column;
  }
}
</style>
