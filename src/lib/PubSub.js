export default class PubSub {
	constructor() {
		this.events = {};
	}

	subscribe(event, callback) {
		console.log(`The event being subscribed to: "${event}".`);
		console.log(`The callback being subscribed to: "${callback}".`);
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