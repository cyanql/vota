import Vue from 'vue'
import VueRouter from 'vue-router'
import Userinfo from './pages/userinfo'
import Home from './pages/home'
import Match from './pages/match'
import Log from './pages/match/log'
import Summary from './pages/match/summary'

process.env.NODE_ENV !== 'production' && Vue.use(VueRouter)

const routes = [{
	name: 'home',
	path: '/home',
	component: Home
}, {
	name: 'userinfo',
	path: '/Userinfo',
	component: Userinfo
}, {
	path: '/match',
	component: Match,
	children: [{
		name: 'log',
		path: 'log',
		component: Log
	}, {
		name: 'summary',
		path: 'summary',
		component: Summary
	}]
}]

routes.unshift({
	path: '',
	redirect: '/home'
})

// routes.push({
//	 path: '*',
//	 redirect: '/'
// })

export default new VueRouter({
	routes
})
