export default function polling(async, timeout) {
	let timer
	function done() {
		clearTimeout(timer)
	}
	function loop() {
		async(done)
		timer = setTimeout(loop, timeout)
	}
	loop()
}
