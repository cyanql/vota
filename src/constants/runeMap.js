import RUNES from './runes'

const RUNE_MAP = {}

Object.keys(RUNES).forEach(key => {
	const item = RUNES[key]
	item.name = key
	RUNE_MAP[item.id] = item
})

export default RUNE_MAP
