import serialize from 'src/util/serialize'

const IMG_HOST = 'http://cdn.dota2.com'
const HOST = 'https://api.opendota.com'
const BASE = '/api'

const API_BASE = HOST + BASE

const API = {
	HOST,
	BASE,
	IMG_HOST,
	MAP: 'https://www.opendota.com/assets/images/dota2/map/detailed_700.png',
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
	fetch(url, { param, query, method = 'get' }) {
		url = param ? url.replace(/{[\w_]+}/, param) : url
		url = query ? url + '?' + serialize(query) : url
		return fetch(url, {method})
	}
}



export default API
