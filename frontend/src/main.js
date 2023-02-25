import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import '../types/bignumber'
import '../types/string'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
