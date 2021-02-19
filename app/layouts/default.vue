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
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--grey {
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

.button--grey:hover {
  color: #fff;
  background-color: var(--dark-blue);
}

.button--grey:disabled,
.button--grey[disabled] {
  background-color: var(--light-gray);
  border-color: var(--light-gray);
  color: gray;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
