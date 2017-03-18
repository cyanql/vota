import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Components from './pages'

Vue.use(VueRouter)

const routes = Object.keys(Components).map(name => {
	return {
		name,
		path: '/' + name,
		component: Components[name]
	}
})

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
