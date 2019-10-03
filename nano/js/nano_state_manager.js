if (!Object.keys) {
	Object.keys = (function () {
	  'use strict';
	  var hasOwnProperty = Object.prototype.hasOwnProperty,
		  hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
		  dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		  ],
		  dontEnumsLength = dontEnums.length;

	  return function (obj) {
		if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
		  throw new TypeError('Object.keys called on non-object');
		}

		var result = [], prop, i;

		for (prop in obj) {
		  if (hasOwnProperty.call(obj, prop)) {
			result.push(prop);
		  }
		}

		if (hasDontEnumBug) {
		  for (i = 0; i < dontEnumsLength; i++) {
			if (hasOwnProperty.call(obj, dontEnums[i])) {
			  result.push(dontEnums[i]);
			}
		  }
		}
		return result;
	  };
	}());
  }

// NanoStateManager handles data from the server and uses it to render templates
NanoStateManager = function ()
{
	// _isInitialised is set to true when all of this ui's templates have been processed/rendered
	var _isInitialised = false;

	// the data for this ui
	var _data = null;

	// this is an array of callbacks which are called when new data arrives, before it is processed
	var _beforeUpdateCallbacks = {};
	// this is an array of callbacks which are called when new data arrives, before it is processed
	var _afterUpdateCallbacks = {};

	// this is an array of state objects, these can be used to provide custom javascript logic
	var _states = {};

	var _currentState = null;

	// the init function is called when the ui has loaded
	// this function sets up the templates and base functionality
	var init = function ()
	{
		// We store initialData and templateData in the body tag, it's as good a place as any
		_data = $('body').data('initialData');

		if (_data == null || !_data.hasOwnProperty('config') || !_data.hasOwnProperty('data'))
		{
			alert('Error: Initial data did not load correctly.');
		}

		var stateKey = 'default';
		if (_data['config'].hasOwnProperty('stateKey') && _data['config']['stateKey'])
		{
			stateKey = _data['config']['stateKey'].toLowerCase();
		}

		NanoStateManager.setCurrentState(stateKey);

		$(document).on('templatesLoaded', function () {
			doUpdate(_data);

			_isInitialised = true;
		});
	};

	function rustoutf(str)
	{
		str = str.replace(/�/g, "&#x430;")
		str = str.replace(/�/g, "&#x431;")
		str = str.replace(/�/g, "&#x432;")
		str = str.replace(/�/g, "&#x433;")
		str = str.replace(/�/g, "&#x434;")
		str = str.replace(/�/g, "&#x435;")
		str = str.replace(/�/g, "&#x451;")
		str = str.replace(/�/g, "&#x436;")
		str = str.replace(/�/g, "&#x437;")
		str = str.replace(/�/g, "&#x438;")
		str = str.replace(/�/g, "&#x439;")
		str = str.replace(/�/g, "&#x43A;")
		str = str.replace(/�/g, "&#x43B;")
		str = str.replace(/�/g, "&#x43C;")
		str = str.replace(/�/g, "&#x43D;")
		str = str.replace(/�/g, "&#x43E;")
		str = str.replace(/�/g, "&#x43F;")
		str = str.replace(/�/g, "&#x440;")
		str = str.replace(/�/g, "&#x441;")
		str = str.replace(/�/g, "&#x442;")
		str = str.replace(/�/g, "&#x443;")
		str = str.replace(/�/g, "&#x444;")
		str = str.replace(/�/g, "&#x445;")
		str = str.replace(/�/g, "&#x446;")
		str = str.replace(/�/g, "&#x447;")
		str = str.replace(/�/g, "&#x448;")
		str = str.replace(/�/g, "&#x449;")
		str = str.replace(/�/g, "&#x44A;")
		str = str.replace(/�/g, "&#x44B;")
		str = str.replace(/�/g, "&#x44C;")
		str = str.replace(/�/g, "&#x44D;")
		str = str.replace(/�/g, "&#x44E;")
		str = str.replace(/&#255;/g, "&#1103;")
		str = str.replace(/�/g, "&#x410;")
		str = str.replace(/�/g, "&#x411;")
		str = str.replace(/�/g, "&#x412;")
		str = str.replace(/�/g, "&#x413;")
		str = str.replace(/�/g, "&#x414;")
		str = str.replace(/�/g, "&#x415;")
		str = str.replace(/�/g, "&#x401;")
		str = str.replace(/�/g, "&#x416;")
		str = str.replace(/�/g, "&#x417;")
		str = str.replace(/�/g, "&#x418;")
		str = str.replace(/�/g, "&#x419;")
		str = str.replace(/�/g, "&#x41A;")
		str = str.replace(/�/g, "&#x41B;")
		str = str.replace(/�/g, "&#x41C;")
		str = str.replace(/�/g, "&#x41D;")
		str = str.replace(/�/g, "&#x41E;")
		str = str.replace(/�/g, "&#x41F;")
		str = str.replace(/�/g, "&#x420;")
		str = str.replace(/�/g, "&#x421;")
		str = str.replace(/�/g, "&#x422;")
		str = str.replace(/�/g, "&#x423;")
		str = str.replace(/�/g, "&#x424;")
		str = str.replace(/�/g, "&#x425;")
		str = str.replace(/�/g, "&#x426;")
		str = str.replace(/�/g, "&#x427;")
		str = str.replace(/�/g, "&#x428;")
		str = str.replace(/�/g, "&#x429;")
		str = str.replace(/�/g, "&#x42A;")
		str = str.replace(/�/g, "&#x42B;")
		str = str.replace(/�/g, "&#x42C;")
		str = str.replace(/�/g, "&#x42D;")
		str = str.replace(/�/g, "&#x42E;")
		str = str.replace(/�/g, "&#x42F;")

		return str;
	}

	function rustoutf_r(obj) {
		if (obj !== null && typeof obj === "object") {
			var keys = Object.keys(obj);

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];

				if (typeof obj[key] === "string") {
					obj[key] = rustoutf(obj[key]);
				} else if (obj[key] != null && typeof obj[key] === "object") {
					obj[key] = rustoutf_r(obj[key]);
				}
			}
		}

		return obj;
	}

	// Receive update data from the server
	var receiveUpdateData = function (jsonString)
	{
		var updateData;

		//alert("recieveUpdateData called." + "<br>Type: " + typeof jsonString); //debug hook
		try
		{
			// parse the JSON string from the server into a JSON object
			updateData = jQuery.parseJSON(jsonString);
		}
		catch (error)
		{
			alert("recieveUpdateData failed. " + "<br>Error name: " + error.name + "<br>Error Message: " + error.message);
			return;
		}

		//alert("recieveUpdateData passed trycatch block."); //debug hook

		if (!updateData.hasOwnProperty('data'))
		{
			if (_data && _data.hasOwnProperty('data'))
			{
				updateData['data'] = _data['data'];
			}
			else
			{
				updateData['data'] = {};
			}
		}

		if (_isInitialised) // all templates have been registered, so render them
		{
			doUpdate(updateData);
		}
		else
		{
			_data = updateData; // all templates have not been registered. We set _data directly here which will be applied after the template is loaded with the initial data
		}
	};

	// This function does the update by calling the methods on the current state
	var doUpdate = function (data)
	{
        if (_currentState == null)
        {
            return;
        }

		data = _currentState.onBeforeUpdate(data);

		if (data === false)
		{
            alert('data is false, return');
			return; // A beforeUpdateCallback returned a false value, this prevents the render from occuring
		}

		_data = rustoutf_r(data);

        _currentState.onUpdate(_data);

        _currentState.onAfterUpdate(_data);
	};

	// Execute all callbacks in the callbacks array/object provided, updateData is passed to them for processing and potential modification
	var executeCallbacks = function (callbacks, data)
	{
		for (var key in callbacks)
		{
			if (callbacks.hasOwnProperty(key) && jQuery.isFunction(callbacks[key]))
			{
                data = callbacks[key].call(this, data);
			}
		}

		return data;
	};

	return {
        init: function ()
		{
            init();
        },
		receiveUpdateData: function (jsonString)
		{
			receiveUpdateData(jsonString);
        },
		addBeforeUpdateCallback: function (key, callbackFunction)
		{
			_beforeUpdateCallbacks[key] = callbackFunction;
		},
		addBeforeUpdateCallbacks: function (callbacks) {
			for (var callbackKey in callbacks) {
				if (!callbacks.hasOwnProperty(callbackKey))
				{
					continue;
				}
				NanoStateManager.addBeforeUpdateCallback(callbackKey, callbacks[callbackKey]);
			}
		},
		removeBeforeUpdateCallback: function (key)
		{
			if (_beforeUpdateCallbacks.hasOwnProperty(key))
			{
				delete _beforeUpdateCallbacks[key];
			}
		},
        executeBeforeUpdateCallbacks: function (data) {
            return executeCallbacks(_beforeUpdateCallbacks, data);
        },
		addAfterUpdateCallback: function (key, callbackFunction)
		{
			_afterUpdateCallbacks[key] = callbackFunction;
		},
		addAfterUpdateCallbacks: function (callbacks) {
			for (var callbackKey in callbacks) {
				if (!callbacks.hasOwnProperty(callbackKey))
				{
					continue;
				}
				NanoStateManager.addAfterUpdateCallback(callbackKey, callbacks[callbackKey]);
			}
		},
		removeAfterUpdateCallback: function (key)
		{
			if (_afterUpdateCallbacks.hasOwnProperty(key))
			{
				delete _afterUpdateCallbacks[key];
			}
		},
        executeAfterUpdateCallbacks: function (data) {
            return executeCallbacks(_afterUpdateCallbacks, data);
        },
		addState: function (state)
		{
			if (!(state instanceof NanoStateClass))
			{
				alert('ERROR: Attempted to add a state which is not instanceof NanoStateClass');
				return;
			}
			if (!state.key)
			{
				alert('ERROR: Attempted to add a state with an invalid stateKey');
				return;
			}
			_states[state.key] = state;
		},
		setCurrentState: function (stateKey)
		{
			if (typeof stateKey == 'undefined' || !stateKey) {
				alert('ERROR: No state key was passed!');
                return false;
            }
			if (!_states.hasOwnProperty(stateKey))
			{
				alert('ERROR: Attempted to set a current state which does not exist: ' + stateKey);
				return false;
			}

			var previousState = _currentState;

            _currentState = _states[stateKey];

            if (previousState != null) {
                previousState.onRemove(_currentState);
            }

			_currentState.onAdd(previousState);

            return true;
		},
		getCurrentState: function ()
		{
			return _currentState;
		}
	};
} ();
