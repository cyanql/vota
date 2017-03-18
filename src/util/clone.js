const assign = Object.assign

export default function clone(...args) {
	args.unshift({})
    return JSON.parse(JSON.stringify(assign.apply(Object, args)))
}
