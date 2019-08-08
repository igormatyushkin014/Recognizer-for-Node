const uuidv4 = require("uuid/v4");

export class IdProvider {

	private lastValue: number = 0;

	constructor() {
	}

	private getNextValue(): number {
		return this.lastValue + 1;
	}

	public getNextId(): string {
		let nextValue = this.getNextValue();
		this.lastValue = nextValue;
		let uuid = uuidv4();
		return `${nextValue}-${uuid}`;
	}
}
