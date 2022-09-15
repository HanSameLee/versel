import {createRouter, createWebHistory} from 'vue-router'
// import Home from './Home'


// 라우터 불러온뒤 아래 호출하여 사용
export default createRouter({
    history:createWebHistory(),
    scrollBehavior:() => ({ top:0 }),
    routes:[
        {
            path: '/',
            component: () => import('./Home.vue')
            // return promise (비동기로 동작)
            // 비동기로 동작하는 애들을 쓸 때 () => 함수로 만들어서 동적으로 사용
            // import Home from './Home'를 간단하게 위와 같이 사용할 수 있음
        }
    ]
})
