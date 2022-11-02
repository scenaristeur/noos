<template>
  <div class="home">
<TableSelector />
<MainContent />
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    'MainContent': () => import('@/views/MainContent'),
    'TableSelector': () => import('@/views/TableSelector')
  },
}
</script>
