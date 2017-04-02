import API from 'src/constant/api'
import NAME_MAP from './item'

const ID_MAP = {}

const ITEM_PATH = API.IMG_HOST + '/apps/dota2/images/items/'

Object.keys(NAME_MAP).forEach(key => {
    const item = NAME_MAP[key]
    item.name = key
    item.img = ITEM_PATH + item.img
    ID_MAP[item.id] = item
})

export {
    ID_MAP,
    NAME_MAP
}
