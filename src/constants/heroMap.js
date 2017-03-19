import HEROS from './heros'

const HERO_MAP = {}

Object.keys(HEROS).forEach(key => {
	const hero = HEROS[key]
	hero.name = key
	HERO_MAP[hero.id] = hero
})

export default HERO_MAP
