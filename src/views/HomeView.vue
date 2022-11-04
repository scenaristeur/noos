<template>
  <div class="home">
    
    <MainContent />

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    'MainContent': () => import('@/views/MainContent'),


  },
}
</script>
