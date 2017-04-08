import 'isomorphic-fetch'
import './style/reset.scss'
import './style/mixin.scss'
import Vue from 'vue'
import * as Components from 'src/component'
import App from './app'
import router from './router'
import store from './vuex'
import { cache } from 'src/util'

Object.values(Components).forEach(Component => {
    Component && Component.name && Vue.component(Component.name, Component)
})

!store.state.status.fullscreen && alert('建议使用Chrome浏览器或Safari浏览器，并添加至主屏从而获得更好的用户体验')

require('fastclick').attach(document.body)

window.onerror = function() {
    alert('VotA - 运行错误，将清除缓存并返回首页')
    cache.clear()
}

router.beforeEach((to, from, next) => {
    if (store.state.status.auth || to.name === 'home' || store.state.status.dev) {
        next()
    } else {
        next('home')
    }
})

new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App)
})
