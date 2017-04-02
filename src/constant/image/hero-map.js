import API from 'src/constant/api'
import NAME_MAP from './hero'

const ID_MAP = {}

const HERO_PATH = API.IMG_HOST + '/apps/dota2/images/heroes/'

Object.keys(NAME_MAP).forEach(key => {
    const hero = NAME_MAP[key]
    hero.name = key
    hero.img = HERO_PATH + hero.img
    hero.icon = HERO_PATH + hero.icon
    ID_MAP[hero.id] = hero
})

export {
    ID_MAP,
    NAME_MAP
}
