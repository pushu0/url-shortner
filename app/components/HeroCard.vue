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
            v-model="url"
            type="text"
            name="url"
            class="text-input"
            placeholder="Enter long url here"
            @keydown.enter="shortenUrl"
          />
          <button
            target="_blank"
            rel="noopener noreferrer"
            class="button--main"
            :disabled="!isValid"
            @click="shortenUrl"
          >
            Shorten Url
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
import HeroImage from './HeroImage.vue'

const isURL = (str: string) =>
  /(?:https?:\/\/)?(?:[a-zA-Z0-9.-]+?\.(?:[a-zA-Z])|\d+\.\d+\.\d+\.\d+)/.test(
    str
  )

const isProtocol = (url: string) => {
  try {
    const urlObj = new URL(url)
    return !!urlObj.protocol
  } catch {
    return false
  }
}

export default defineComponent({
  components: {
    HeroImage,
  },
  setup() {
    const url = ref<string>('')
    const loading = ref<boolean>(false)
    const shortenUrl = async () => {
      const protocol = isProtocol(url.value) ? '' : 'http://'
      loading.value = true
      try {
        await fetch('http://localhost:8080/url-create', {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            url: `${protocol}${url.value}`,
          }),
        })
      } catch (e) {
      } finally {
        loading.value = true
      }
    }

    const isValid = computed(() => isURL(url.value))

    return {
      url,
      isValid,
      shortenUrl,
    }
  },
})
</script>
<style scoped>
.hero-image {
  max-width: 500px;
  width: 100%;
  margin: auto;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 500;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 0.2em;
}
.heading {
  max-width: 80%;
  margin: auto;
}
.heading p {
  font-weight: 300;
  font-size: 15px;
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
</style>
