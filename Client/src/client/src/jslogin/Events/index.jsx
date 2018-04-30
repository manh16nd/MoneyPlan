import EventEmitter from './EventEmitter.jsx';
import EVENTS from './ComponentEvents.jsx';

// wrap event emitter to make events emit asynchronously
const events = new EventEmitter();

export default events;

export {
	EVENTS
};
