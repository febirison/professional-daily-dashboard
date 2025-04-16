import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

export class CalendarService {
  getEvents(date) {
    const events = getLocalStorage('events') || {};
    return events[date] || [];
  }

  addEvent(date, event) {
    const events = getLocalStorage('events') || {};
    if (!events[date]) {
      events[date] = [];
    }
    events[date].push(event);
    setLocalStorage('events', events);
  }

  removeEvent(date, index) {
    const events = getLocalStorage('events') || {};
    if (events[date]) {
      events[date].splice(index, 1);
      if (events[date].length === 0) {
        delete events[date];
      }
      setLocalStorage('events', events);
    }
  }
}