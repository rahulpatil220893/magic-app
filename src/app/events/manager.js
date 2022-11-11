let events = []

const EventManager = {
  events: [],
  init: (name, callback) => {
    if (events[name] == undefined) {
      events[name] = [];
    }
    events[name].push(callback);
  },
  broadcast: (name, data) => {
    if (events[name] != undefined) {
      events[name].map((callback) => {
        callback(data);
      })
    }
  }
}

export default EventManager;
