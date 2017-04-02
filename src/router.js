import Vue from 'vue'
import VueRouter from 'vue-router'
import Userinfo from './page/userinfo'
import Home from './page/home/index'
import Match from './page/match'
import Summary from './page/match/summary'
import Detail from './page/match/detail'
import Log from './page/match/log'

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
