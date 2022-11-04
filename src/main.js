import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import Calendar from 'v-calendar/lib/components/calendar.umd'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.config.productionTip = false

// Register components in your 'main.js'
// Vue.component('calendar-full', Calendar)
// Vue.component('date-picker', DatePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
