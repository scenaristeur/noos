<template>
  <div class="calendar-view">

    <!-- <CalendarFull /> -->
    <DatePicker :attributes="attributes" @dayclick="onDayClick" :value="value" style="float:left" />

    <div style="float:left">
      <button @click="reset">Reset</button>
      <input type="checkbox" id="grimp" v-model="grimp">
      <label for="grimp">{{ grimp }} mount / plane</label>

      values : {{ value }} <br>
      dates : {{dates}}
    </div>
  </div>
</template>

<script>

// import Calendar from 'v-calendar/lib/components/calendar.umd'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'


export default {
  name: 'CalendarView',
  components: {
    // 'CalendarFull': () => import('v-calendar/lib/components/calendar.umd'),
    'DatePicker': () => import('v-calendar/lib/components/date-picker.umd'),
    // 'TableSelector': () => import('@/views/TableSelector')
  },
  data() {
    return {
      days: [],
      value: Date.now(),
      grimp: false
    };
  },
  computed: {
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  methods: {
    reset(){
      this.days = []
    },
    onDayClick(day) {
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });

        let detail = {name : 'tableChanged', tablename: day.id, type: 'calendar', date: day.date, grimp: this.grimp}
        // const event = new CustomEvent('tableChanged', { detail: this.table });
        const event = new CustomEvent('coreEvent', {detail: detail });
        window.dispatchEvent(event);

         this.$emit('clicked')


      }
    },
  },

}
</script>

<style lang="css" scoped>
.calendar-view {

}
</style>
