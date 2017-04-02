import 'isomorphic-fetch'
import './style/reset.scss'
import './style/mixin.scss'
import Vue from 'vue'
import * as Components from 'src/component'
import App from './app'
import router from './router'
import store from './vuex'
import 'add-to-homescreen/dist/style/addtohomescreen.css'
import addToHomeScreen from 'src/lib/addToHomeScreen'

Object.values(Components).forEach(Component => {
    Component && Component.name && Vue.component(Component.name, Component)
})

addToHomeScreen({
    displayPace: 0
})

// 配合app的touchmove.stop 禁止全局下拉同时允许内部滑动
document.body.addEventListener('touchmove', e => e.preventDefault(), false)
require('fastclick').attach(document.body)

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
