<template>
  <!-- <div class="bottom-view"> -->
  <!-- <div>

{{sel}}<hr><hr><hr><hr><hr><hr><hr><hr><hr><hr> -->
    <CurvedBottomNavigation :options="options" v-model="selected"
    ref="nav"
    foreground-color='#42A5F5'
    badge-color='#FBC02D'
    background-color='#8FF0A4'
    icon-color='#0000008A'
    />
  <!-- </div> -->
</template>




<script>

import { CurvedBottomNavigation } from "bottom-navigation-vue";
// https://vue-bottom-navigation.herokuapp.com/v2/guide/curved

export default {
  name: 'BottomView',
  props:['sel'],
  // components: {
  //   'CurvedBottomNavigation': () => import('bottom-navigation-vue'),
  //
  // },
  components: {
    CurvedBottomNavigation,
    // 'CalendarView': () => import('@/views/CalendarView'),
    //   'MenuView': () => import('@/views/MenuView'),
  },
  data: () => ({
    selected: 1,

    options: [
      {
        id: 1,
        icon: "fas fa-home",
        title: "Home",

        // path: { name: "home" },
      },
      { id: 2, icon: "fas fa-pen", title: "Editor",
      // path: { name: "editor", query: { bookmark: "important" } },
    },
    {
      id: 3, icon: "fas fa-calendar-days", title: "Calendar",
      // path: { name: "home", query: { d: Date.now() } },
      // path: { name: "editor", query: { bookmark: "important" } },
    },
    {
      id: 4,
      icon: "fas fa-plus",
      title: "Setting",
      childs: [{ id: 401, icon: "fas fa-ticket-alt", title: "Tickets" }],
    },
    { id: 5, icon: "fas fa-bell", title: "Notification", badge: 15,
    childs: [{ id: 501, icon: "fas fa-gifts", title: "Gifts", badge: 7 }],
  },
],
}),
watch:{
  sel(){
    this.selected = 1
    console.log(this.selected)
  },
  selected(id){
    console.log(this.$refs.nav, id)
    if (id== 3){
      this.$modal.show('my-first-modal');

    }
  }
},



}
</script>

<style lang="css" scoped>
.bottom-view {

}
</style>
