import Vue from 'vue'
import VueRouter from 'vue-router'
import Userinfo from './pages/userinfo'
import Home from './pages/home'
import Match from './pages/match'
import Summary from './pages/match/summary'
import Detail from './pages/match/detail'
import Log from './pages/match/log'

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
		name: 'summary',
		path: 'summary',
		component: Summary
	}, {
		name: 'detail',
		path: 'detail',
		component: Detail
	}, {
		name: 'log',
		path: 'log',
		component: Log
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
