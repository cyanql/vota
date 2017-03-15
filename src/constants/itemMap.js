import ITEMS from './items'

const ITEM_MAP = {}

Object.keys(ITEMS).forEach(key => {
	const item = ITEMS[key]
	item.name = key
	ITEM_MAP[item.id] = item
})

export default ITEM_MAP
