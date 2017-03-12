function DateLib(date = new Date(), format = '-') {
	if (typeof format != 'string') throw new Error('format should be an string, you can through like '-'')

	switch (typeof date) {
		case 'object':
			this.year = (date.getFullYear()).toString()
			this.month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString()
			this.day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString()
			this.format = format
			break
		case 'string':
			let year = date.match(/^\d{2,4}(?=[-/\\])/),
				month = date.match(/\d+(?=[-/\\]\d+$)/),
				day = date.match(/\d+$/)
			if (date.length > 10 || date.length < 8 || !year || !month || !day) {
				throw new Error('String does not conform to the specification, you can through a new string like "yyyy-mm-dd"')
			}
			this.year = year.toString()
			this.month = (parseInt(month) < 10 ? '0' + parseInt(month) : month).toString()
			this.day = (parseInt(day) < 10 ? '0' + parseInt(day) : day).toString()
			this.format = format
			break
		default:
			throw new Error('date should be an object || string, you can through a new Date() || "yyy-mm-dd"')
	}
}

DateLib.prototype = {
	getYear() {
		return this.year
	},
	getMonth() {
		return this.month
	},
	getDay() {
		return this.day
	},
	toString() {
		return this.valueOf()
	},
	valueOf() {
		return [this.year, this.month, this.day].join(this.format)
	}
}

DateLib.getDistanceNow = (date) => {
	if (!(date instanceof Date))
		throw new Error('the first param should be a Date Object')

	const now = new Date()

	const distTime = now - date

	const distSeconds = distTime / 1000
	if (distSeconds < 60)
		return `${parseInt(distSeconds)}秒前`

	const distMinutes = distSeconds / 60
	if (distMinutes < 60)
		return `${parseInt(distMinutes)}分钟前`

	const distHours = distMinutes / 60
	if (distHours < 24)
		return `${parseInt(distHours)}小时前`

	const distDay = distHours / 24
	if (distDay < 31)
		return `${parseInt(distDay)}天前`

	return date.toJSON().substr(0, 10)
}

module.exports = DateLib
