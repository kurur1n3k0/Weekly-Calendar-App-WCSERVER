<template>
  <div id="calendar-week" class="container">
    <div class="columns is-mobile calendar-columns">
      <CalendarDay 
        v-for="day in sharedState.data" 
        :key="day.id" 
        :day="day" 
      />
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CalendarDay from './CalendarDay.vue';

export default {
  name: 'CalendarWeek',
  components: {
    CalendarDay
  },
  data() {
    return {
      sharedState: store.state
    };
  }
};
</script>

<style scoped>
#calendar-week {
  margin-bottom: 40px;
}
.calendar-columns {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}
</style>