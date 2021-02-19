<template>
  <div class="container">
    <transition name="fade" appear>
      <div class="outer-card">
        <div class="hero-image">
          <hero-image />
        </div>
        <div class="card">
          <div class="wrapper">
            <h1 class="title">
              Shorten any <span class="highlight">links</span>.
            </h1>
            <div class="heading">
              <p class="heading">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                ornare id neque vel semper. Nunc augue magna, blandit ac lorem
                at, ornare tempor diam.
              </p>
            </div>
            <div class="links">
              <input
                v-model="url"
                type="text"
                name="url"
                class="text-input"
                @keydown.enter="shortenUrl"
              />
              <button
                target="_blank"
                rel="noopener noreferrer"
                class="button--grey"
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
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import HeroImage from '../components/HeroImage.vue'

function isURL(str: string) {
  return /(?:https?:\/\/)?(?:[a-zA-Z0-9.-]+?\.(?:[a-zA-Z])|\d+\.\d+\.\d+\.\d+)/.test(
    str
  )
}

export default defineComponent({
  components: {
    HeroImage,
  },
  setup() {
    const url = ref<string>('')
    const shortenUrl = () => {
      console.log('shortening', isProtocol(url.value))
    }

    const isValid = computed(() => isURL(url.value))
    const isProtocol = (url: string) => {
      try {
        const urlObj = new URL(url)
        return !!urlObj.protocol
      } catch {
        return false
      }
    }

    return {
      url,
      isValid,
      shortenUrl,
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
}

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

.text-input {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--dark-blue);
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

.highlight {
  color: var(--blue);
}

.credentials {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
