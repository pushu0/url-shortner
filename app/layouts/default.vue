<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
:root {
  --blue: rgb(50, 132, 255);
  --dark-blue: rgb(71, 44, 145);
  --light-gray: #eaeaea;
  --charcoal: rgb(92, 92, 92);
}

html {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h2 {
  color: var(--charcoal);
  font-weight: 500;
  padding-bottom: 1em;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--main {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--dark-blue);
  color: white;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
  text-transform: uppercase;
  font-size: 12px;
  background-color: var(--blue);
  transition: all 0.3s ease-in-out;
}

.button--main:hover {
  color: #fff;
  background-color: var(--dark-blue);
}

.button--main:disabled,
.button--main[disabled] {
  background-color: var(--light-gray);
  border-color: var(--light-gray);
  color: gray;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-60px);
  margin-bottom: 10px;
  opacity: 0;
}

.highlight {
  color: var(--blue);
}

</style>
