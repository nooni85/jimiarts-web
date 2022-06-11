declare module 'jimiarts' {
	export namespace Type {
		type Config = [{
			database?: {
				username?: string,
				password?: string
			}
		}];
	}
}
