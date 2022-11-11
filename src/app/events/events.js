class Events {
  constructor() {
    this._events = {};
    this._listeners = [];
  }

  register(event, fnc) {
    if (!(event in this._events)) {
      this._events[event] = [];
    }
    this._events[event].push(fnc);
    const callback_id = this._events[event].length - 1;
    return () => {
      this._events[event][callback_id] = null;
    };
  }

  register_all(fnc) {
    this._listeners.push(fnc);
    const callback_id = this._listeners.length - 1;
    return () => {
      this._listeners[callback_id] = null;
    };
  }

  unregister_all() {
    this._events = {};
    this._listeners = [];
  }

  dispatch(event, payload) {
    if (event in this._events) {
      const fncs = this._events[event];
      for (let i = 0; i < fncs.length; i++) {
        const fnc = fncs[i];
        if (fnc) {
          fnc(payload, event);
        }
      }
    }

    for (let i = 0; i < this._listeners.length; i++) {
      const listen_fnc = this._listeners[i];
      if (listen_fnc) {
        listen_fnc(payload, event);
      }
    }
  }
}

export default Events;