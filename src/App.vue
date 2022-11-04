<template>
  <div id="app">

    <router-view/>
    <BottomView :sel="sel" />
    <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/editor">Editor</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <modal name="my-first-modal" draggable=".window-header" height="auto">
     <div class="window-header">DRAG ME HERE</div>
    <CalendarView @clicked="hide"/>
    <MenuView />
    <TableSelector />
  </modal>

</div>
</template>





<script>
export default {
  name: 'App',
  components: {

    'CalendarView': () => import('@/views/CalendarView'),
    'MenuView': () => import('@/views/MenuView'),
    'TableSelector': () => import('@/views/TableSelector'),
    // 'CalendarView': () => import('@/views/CalendarView'),
    'BottomView': () => import('@/views/BottomView')
    // 'TableSelector': () => import('@/views/TableSelector')
  },
  data(){
    return{
      sel: null,
    }
  },
  methods: {
    // show () {
    //   this.$modal.show('my-first-modal');
    // },
    hide () {
      this.$modal.hide('my-first-modal');
      this.sel = Date.now()
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
modal{
  padding: 10px;
  margin: 10px;
}
</style>
