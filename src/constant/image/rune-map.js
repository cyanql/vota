import NAME_MAP from './rune'

const ID_MAP = {}

const RUNE_HOST = 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/'

Object.keys(NAME_MAP).forEach(key => {
    const rune = NAME_MAP[key]
    rune.name = key
    rune.img = RUNE_HOST + rune.img
    ID_MAP[rune.id] = rune
})

export {
    ID_MAP,
    NAME_MAP
}
