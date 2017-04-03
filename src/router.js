import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './page/user'
import Home from './page/home'
import Match from './page/match'
import OtherUser from './page/other-user'
import Summary from './page/match/summary'
import Detail from './page/match/detail'
import Log from './page/match/log'

process.env.NODE_ENV !== 'production' && Vue.use(VueRouter)

const routes = [{
	name: 'home',
	path: '/home',
	component: Home
}, {
	name: 'user',
	path: '/user',
	component: User
}, {
    name: 'other-user',
    path: '/other-user',
    component: OtherUser
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
