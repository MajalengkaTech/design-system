import { init } from '@majalengka/js'

// Polyfill <dialog commandfor> untuk browser lama, plus tabs/tooltip/toast
export default defineNuxtPlugin(() => {
  init()
})
