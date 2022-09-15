import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '~/routes'
//index.js는 기본이라 제일 먼저 찾음
import App from './App.vue'

createApp(App)
    // 크리에이트 피니아는 함수라 꼭 호출! 해줄것 ()
    .use(createPinia())
    .use(router)
    .mount('#app')


