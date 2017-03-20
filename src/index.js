import 'isomorphic-fetch'
import './reset.scss'
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './vuex'

require('fastclick').attach(document.body)

new Vue({
	el: '#app',
	store,
	router,
	render: (h) => h(App)
})
