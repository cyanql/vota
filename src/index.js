import 'isomorphic-fetch'
import './reset.scss'
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './vuex'

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
