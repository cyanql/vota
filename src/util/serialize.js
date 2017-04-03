export default function serialize(json) {
	var key, value, subValue, result = []
	for (key of Object.keys(json)) {
		value = json[key]
        if (Array.isArray(value)) {
            for (subValue of value) {
                result.push([key, subValue].join('='))
            }
        } else {
            result.push([key, value].join('='))
        }
	}
	return result.join('&')
}
