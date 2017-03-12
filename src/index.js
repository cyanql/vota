import 'isomorphic-fetch'
import './reset.scss'
import Vue from 'vue'
import App from './app'

new Vue({
	el: '#app',
	render: (h) => h(App)
})
