import * as types from './types'
import { clone } from 'src/util'

const initialState = {
	users: process.env.NODE_ENV === 'development' ? require('src/../.data/players.json') : [],
	matches: process.env.NODE_ENV === 'development' ? require('src/../.data/matches.json') : [],
	match: process.env.NODE_ENV === 'development' ? require('src/../.data/match.detail.json') : []
}

const userMutations = {
}

const matchMutations = {
}

export default {
	state: initialState,
	mutations: {
		...userMutations,
		...matchMutations
	}
}
