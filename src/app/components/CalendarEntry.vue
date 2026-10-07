<template>
  <div id="calendar-entry">
    <div class="calendar-entry-card">
      <h3 class="title is-6 mb-3 has-text-centered">Add Event to Calendar</h3>
      <div class="field">
        <input 
          type="text" 
          class="input"
          :class="{ 'is-danger': error }"
          placeholder="e.g. Design review meeting" 
          v-model="inputEntry" 
          @keyup.enter="submitEvent(inputEntry)"
          required 
        />
      </div>
      <p class="calendar-entry-day mb-3">
        Scheduled for: <strong class="has-text-info">{{ titleOfActiveDay }}</strong>
      </p>
      <button class="button is-primary is-fullwidth" @click="submitEvent(inputEntry)">
        Submit Event
      </button>
      <p v-if="error" class="has-text-danger is-size-7 mt-2 has-text-centered">
        You must type something before submitting!
      </p>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CalendarEntry',
  data() {
    return {
      inputEntry: '',
      error: false
    };
  },
  computed: {
    titleOfActiveDay() {
      const active = store.getActiveDay();
      return active ? active.fullTitle : 'None Selected';
    }
  },
  methods: {
    submitEvent(eventDetails) {
      if (!eventDetails.trim()) {
        this.error = true;
        return;
      }
      store.submitEvent(eventDetails.trim());
      this.inputEntry = '';
      this.error = false;
    }
  }
};
</script>

<style scoped>
#calendar-entry {
  max-width: 360px;
  margin: 0 auto;
}

.calendar-entry-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.calendar-entry-day {
  font-size: 0.85rem;
  color: #64748b;
}
</style>