export default function parsePos(obj) {
    const result = []
	// Math.pow(0.5, 0.5)
	const proportion = 0.5 ** 0.5

    Object.keys(obj).forEach((x) => {
        Object.keys(obj[x]).forEach((y) => {
            result.push({
                x: (x - 64) * proportion,
                y: (128 - (y - 64)) * proportion,
                value: obj[x][y]
            })
        })
    })

    return result
}
