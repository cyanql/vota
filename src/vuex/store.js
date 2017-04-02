import * as types from './types'

const initialState = {
	status: {
        fullscreen: screen.width === window.innerWidth && screen.height === window.innerHeight,
		dev: process.env.NODE_ENV === 'development',
		auth: false,
		username: '',
		history: {
            user: null,
			users: []
		}
	},
	users:  [],
	matches: [],
	match: []
}

const statusMutations = {
	[types.AUTH] (state) {
		state.status.auth = true
	},
	[types.LOAD_LOCALSTORAGE] (state, history) {
		state.status.history = Object.assign({}, history)
	},
	[types.CHANGE_USER_NAME] (state, username) {
		state.status.username = username
	},
    [types.SELECT_USER] (state, user) {
        state.status.history.user = user
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
    [types.GET_OFFSET_MATCHES_FETCH_SUCCESS] (state, matches) {
        state.matches = state.matches.concat(matches)
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
