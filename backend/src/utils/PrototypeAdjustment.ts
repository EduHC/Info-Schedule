export function fixProto(target: Error, prototype: {}) {
	const setPrototypeOf: Function = (Object as any).setPrototypeOf

	setPrototypeOf
		? setPrototypeOf(target, prototype)
		: ((target as any).__proto__ = prototype)
}