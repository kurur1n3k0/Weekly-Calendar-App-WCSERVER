<template>
  <div 
    class="day column" 
    :class="{ 'is-active-day': day.active }" 
    @click="setActiveDay(day.id)"
  >
    <div class="day-banner">
      <span class="day-abbr">{{ day.abbvTitle }}</span>
    </div>
    <div class="day-body">
      <div class="day-number-circle" :class="{ 'has-events': day.events.length > 0 }">
        {{ day.id }}
      </div>
      <div class="events-list">
        <CalendarEvent 
          v-for="event in day.events" 
          :key="event.details" 
          :event="event" 
          :day="day" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CalendarEvent from './CalendarEvent.vue';

export default {
  name: 'CalendarDay',
  props: ['day'],
  components: {
    CalendarEvent
  },
  methods: {
    setActiveDay(dayId) {
      store.setActiveDay(dayId);
    }
  }
};
</script>

<style scoped>
.day {
  background-color: #ffffff;
  color: #334155;
  border-right: 1px solid #e2e8f0;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 280px;
}

.day:last-child {
  border-right: none;
}

.day:hover {
  background: #f8fafc;
}

.day.is-active-day {
  background: #eff6ff;
  border-top: 3px solid #3b82f6;
}

.day-banner {
  background-color: #334155;
  color: #ffffff;
  padding: 8px;
  text-align: center;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.day.is-active-day .day-banner {
  background-color: #2563eb;
}

.day-body {
  padding: 12px 8px;
}

.day-number-circle {
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #475569;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0 auto 10px;
}

.day-number-circle.has-events {
  background: #3b82f6;
  color: #ffffff;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>