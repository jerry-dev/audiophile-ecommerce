export default class PubSub {
	constructor() {
		this.events = {};
	}

	subscribe(event, callback) {
		if (!Array.isArray( this.events[event] )) {
			this.events[event] = [];
		}

		return this.events[event].push(callback);
	}

	publish(event, data = {}) {
		console.log(`Publishing the ${event} event`);
		if (!this.events[event]) {
			return [];
		}
		
		return this.events[event].map((callback) => callback(data));
	}
}