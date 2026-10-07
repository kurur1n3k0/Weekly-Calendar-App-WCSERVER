<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <!-- View Mode -->
    <div v-if="!event.edit" class="event-view">
      <span class="event-details">{{ event.details }}</span>
      <div class="event-actions">
        <i class="fa fa-pencil edit-icon" title="Edit" @click.stop="editEvent(day.id, event.details)"></i>
        <i class="fa fa-trash-o delete-icon" title="Delete" @click.stop="deleteEvent(day.id, event.details)"></i>
      </div>
    </div>
    <!-- Inline Edit Mode -->
    <div v-if="event.edit" class="event-edit">
      <input 
        type="text" 
        class="input is-small" 
        :placeholder="event.details" 
        v-model="newEventDetails" 
        @keyup.enter="updateEvent(day.id, event.details, newEventDetails)" 
        ref="editInput"
      />
      <div class="event-actions mt-1 has-text-right">
        <i class="fa fa-check confirm-icon" title="Save" @click.stop="updateEvent(day.id, event.details, newEventDetails)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CalendarEvent',
  props: ['event', 'day'],
  data() {
    return {
      newEventDetails: ''
    };
  },
  computed: {
    getEventBackgroundColor() {
      // Deterministic color generation based on string character codes
      const colors = ['#fecdd3', '#bae6fd', '#bbf7d0', '#fed7aa', '#ddd6fe', '#fef08a'];
      const hash = this.event.details.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const color = colors[hash % colors.length];
      return { backgroundColor: color };
    }
  },
  methods: {
    editEvent(dayId, eventDetails) {
      this.newEventDetails = eventDetails;
      store.editEvent(dayId, eventDetails);
    },
    updateEvent(dayId, originalDetails, updatedDetails) {
      store.updateEvent(dayId, originalDetails, updatedDetails || originalDetails);
      this.newEventDetails = '';
    },
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails);
    }
  }
};
</script>

<style scoped>
.day-event {
  margin: 2px 0;
  padding: 6px 8px;
  border-radius: 6px;
  color: #1e293b;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.event-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.event-details {
  word-break: break-word;
  line-height: 1.3;
}

.event-actions {
  display: flex;
  gap: 6px;
  opacity: 0.7;
}

.event-actions:hover {
  opacity: 1;
}

.event-actions i {
  cursor: pointer;
  transition: transform 0.15s;
}

.event-actions i:hover {
  transform: scale(1.15);
}

.edit-icon { color: #2563eb; }
.delete-icon { color: #dc2626; }
.confirm-icon { color: #16a34a; font-size: 0.9rem; }
</style>