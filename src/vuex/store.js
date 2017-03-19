import * as types from './types'

const initialState = {
	status: {
		username: '',
		history: {
			users: []
		}
	},
	users:  [],
	matches: [],
	match: []
}

const statusMutations = {
	[types.LOAD_LOCALSTORAGE] (state, history) {
		state.status.history.users = history.users
	},
	[types.CHANGE_USER_NAME] (state, username) {
		state.status.username = username
	}
}

const userMutations = {
	[types.GET_USERS_FETCH_SUCCESS] (state, users) {
		state.users = users
	},
}

const matchMutations = {
	[types.GET_MATCHES_FETCH_SUCCESS] (state, matches) {
		state.matches = matches
	},
	[types.GET_MATCH_FETCH_SUCCESS] (state, match) {
		state.match = match
	}
}

export default {
	state: initialState,
	mutations: {
		...statusMutations,
		...userMutations,
		...matchMutations
	}
}
