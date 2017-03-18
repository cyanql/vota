import Vue  from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import storeConf from './store'

Vue.use(Vuex)

storeConf.actions = actions

const store = new Vuex.Store(storeConf)

if (module.hot) {
	module.hot.accept(['./actions', './store', './types'], () => {
		const newActions = require('./actions').default
		const newMutations = require('./store').default
		store.hotUpdate({
			actions: newActions,
			mutations: newMutations
		})
	})
}

export default store
