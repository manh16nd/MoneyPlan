let logging_ = true;

class Log {
	constructor(enforcer) {
		let self = this;
	}

	logging() {
		logging_ = !logging_;
	}

	log() {
		_logType(null, arguments);
	}

	warn() {
		_logType('warn', arguments);
	}

	error() {
		_logType('error', arguments);
	}

	info() {
		_logType('info', arguments);
	}
}

const log = function(){
  _logType(null, arguments);
};

/**
 * Keep a history of log messages
 * @type {Array}
 */
log.history = [];

function _logType(type, args){
  // convert args to an array to get array functions
  let argsArray = Array.prototype.slice.call(args);
  // if there's no console then don't try to output messages
  // they will still be stored in log.history
  // Was setting these once outside of this function, but containing them
  // in the function makes it easier to test cases where console doesn't exist
  let noop = function(){};

  let console = window['console'] || {
    'info': noop,
    'log': noop,
    'warn': noop,
    'error': noop
  };

  if (type) {
    // add the type to the front of the message
    argsArray.unshift(type.toUpperCase()+':');
  } else {
    // default to log with no prefix
    type = 'log';
  }

  // add to history
  log.history.push(argsArray);

  // add console prefix after adding to history
  argsArray.unshift('CORE-GATEWAY:');

  // call appropriate log function
  if (console[type].apply) {
    console[type].apply(console, argsArray);
  } else {
    // ie8 doesn't allow error.apply, but it will just join() the array anyway
    console[type](argsArray.join(' '));
  }
}

export default new Log();