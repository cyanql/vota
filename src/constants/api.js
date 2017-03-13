import serialize from 'src/utils/serialize'

const HOST = 'https://api.opendota.com'
const BASE = '/api'

const API_BASE = API_BASE + BASE

const API = {
	HOST,
	BASE,
	matches: `${API_BASE}/matches/{match_id}`,
	players: {
		_: `${API_BASE}/players/{account_id}`,
		wl: `${API_BASE}/players/{account_id}/wl`,
		matches: `${API_BASE}/players/{account_id}/matches`,
		heroes: `${API_BASE}/players/{account_id}/heroes`,
		peers: `${API_BASE}/players/{account_id}/peers`,
		pros: `${API_BASE}/players/{account_id}/pros`,
		records: `${API_BASE}/players/{account_id}/records`,
		counts: `${API_BASE}/players/{account_id}/counts`,
		wardmap: `${API_BASE}/players/{account_id}/wardmap`,
		wordcloud: `${API_BASE}/players/{account_id}/wordcloud`,
		ratings: `${API_BASE}/players/{account_id}/ratings`,
		rankings: `${API_BASE}/players/{account_id}/rankings`,
		refresh: `${API_BASE}/players/{account_id}/refresh`,
	},
	proPlayers: `${API_BASE}/proPlayers`,
	proMatches: `${API_BASE}/proMatches`,
	publicMatches: `${API_BASE}/publicMatches`,
	heroStats: `${API_BASE}/heroStats`,
	explorer: `${API_BASE}/explorer`,
	metadata: `${API_BASE}/metadata`,
	distributions: `${API_BASE}/distributions`,
	search: `${API_BASE}/search`,
	rankings: `${API_BASE}/rankings`,
	benchmarks: `${API_BASE}/benchmarks`,
	status: `${API_BASE}/status`,
	health: `${API_BASE}/health`,
	request: {
		job: `${API_BASE}/request/{jobId}`,
		match: `${API_BASE}/request/{match_id}`
	},
	heroes: `${API_BASE}/heroes`,
	leagues: `${API_BASE}/leagues`,
	teams: `${API_BASE}/teams`,
	replays: `${API_BASE}/replays`,
	request(url, { param, query }) {
		url = param ? url.replace(/{[\w_]+}/, param) : url
		url = query ? url + '?' + serialize(query) : url
		return fetch(url)
	}
}



export default API
