import { reactive } from 'vue';
import { seedData } from './seed.js';

export const store = {
  state: {
    data: reactive(seedData)
  },
  getActiveDay() {
    return this.state.data.find(day => day.active);
  },
  setActiveDay(dayId) {
    this.state.data.forEach(day => {
      day.active = day.id === dayId;
    });
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    if (activeDay) {
      activeDay.events.push({ details: eventDetails, edit: false });
    }
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEventObj(dayId, eventDetails);
    if (eventObj) eventObj.edit = true;
  },
  resetEditOfAllEvents() {
    this.state.data.forEach(day => {
      day.events.forEach(event => {
        event.edit = false;
      });
    });
  },
  updateEvent(dayId, originalDetails, newDetails) {
    const eventObj = this.getEventObj(dayId, originalDetails);
    if (eventObj) {
      eventObj.details = newDetails || originalDetails;
      eventObj.edit = false;
    }
  },
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.data.find(day => day.id === dayId);
    return dayObj ? dayObj.events.find(e => e.details === eventDetails) : null;
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.data.find(day => day.id === dayId);
    if (!dayObj) return;
    const index = dayObj.events.findIndex(e => e.details === eventDetails);
    if (index !== -1) {
      dayObj.events.splice(index, 1);
    }
  }
};