import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import 'uno.css'
import '@unocss/reset/eric-meyer.css'
import App from './App.vue'
import messages from './locales'

const localeKeyList = ['en', 'zh', 'ja', 'de']
const currentLocale = localeKeyList.find(key => navigator.language.startsWith(key)) || 'en'

const i18n = createI18n({
  legacy: false,
  locale: currentLocale,
  fallbackLocale: 'zh',
  messages,
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
