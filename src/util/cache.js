export default {
	get(key) {
		const val = localStorage.getItem(key)
		return val ? JSON.parse(val) : null
	},
	set(key, val) {
		localStorage.setItem(key, JSON.stringify(val))
		return this
	},
	remove(key) {
		localStorage.removeItem(key)
	},
	update(key, callback) {
		this.set(key, callback(this.get(key)))
		return this
	}
}
