<template>
  <div id="app" class="calendar-wrapper">
    <header class="calendar-header has-text-centered">
      <h1 class="title is-3">Vue Weekly Calendar</h1>
      <p class="subtitle is-6 has-text-grey">Click on a day column to select it, then add or edit tasks below.</p>
    </header>
    
    <!-- 7-Day Calendar Grid -->
    <CalendarWeek />

    <!-- Event Submission Form Card -->
    <CalendarEntry />
  </div>
</template>

<script>
import CalendarWeek from './app/components/CalendarWeek.vue';
import CalendarEntry from './app/components/CalendarEntry.vue';

export default {
  name: 'App',
  components: {
    CalendarWeek,
    CalendarEntry
  }
};
</script>

<style>
html, body {
  background: #f8fafc;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.calendar-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 16px;
}

.calendar-header {
  margin-bottom: 30px;
}
</style>