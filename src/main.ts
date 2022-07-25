import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
// import './style.css'
import 'uno.css'
import '@unocss/reset/eric-meyer.css'
import App from './App.vue'
import messages from './locales'

const i18n = createI18n({
  legacy: false,
  locale: 'zh_cn',
  fallbackLocale: 'zh_cn',
  messages,
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
