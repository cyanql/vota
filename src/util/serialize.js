export default function serialize(json) {
	var key, value, result = []
	for (key of Object.keys(json)) {
		value = json[key]
		result.push([key, value].join('='))
	}
	return result.join('&')
}
