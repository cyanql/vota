import * as types from './types'

const initialState = {
	status: {
        states: [],
        fullscreen: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches || document.webkitIsFullScreen,
		dev: process.env.NODE_ENV === 'development',
		auth: false,
		username: '',
		history: {
            user: null, // currentUser, contain props win & lose
			users: []
		}
	},
    userProfiles: [],
	matches: [],
	match: []
}

const statusMutations = {
    [types.BACKUP] (state) {
        // shallow copy, because only change the first level now
        state.status.states.push(Object.assign({}, state))
    },
    [types.RESTORE] (state) {
       Object.assign(state, state.status.states.pop())
    },
	[types.AUTH] (state) {
		state.status.auth = true
	},
	[types.LOAD_LOCALSTORAGE] (state, history) {
		state.status.history = Object.assign({}, history)
	},
	[types.CHANGE_USER_NAME] (state, username) {
		state.status.username = username
	},
    [types.SET_CURRENT_USER] (state, user) {
        state.status.history.user = user
    }
}

const userMutations = {
	[types.SEARCH_USERS_FETCH_SUCCESS] (state, userProfiles) {
		state.userProfiles = userProfiles
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
