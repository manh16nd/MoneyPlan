import ee from 'event-emitter';

let ee_ = Symbol();

class EventEmitter {
	constructor() {
		this[ee_] = ee({});
	}

	trigger() {
		this[ee_].emit.apply(this, arguments);
	}

	emit() {
		this[ee_].emit.apply(this, arguments);
	}

	on() {
		this[ee_].on.apply(this, arguments);
	}

	once() {
		this[ee_].once.apply(this, arguments);
	}

	off() {
		this[ee_].off.apply(this, arguments);
	}
}

export default EventEmitter;