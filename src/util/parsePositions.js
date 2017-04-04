export default function parsePos(obj) {
    const result = []

    Object.keys(obj).forEach((x) => {
        Object.keys(obj[x]).forEach((y) => {
            result.push({
                x: x - 64,
                y: 128 + 64 - y,
                value: obj[x][y]
            })
        })
    })

    return result
}
