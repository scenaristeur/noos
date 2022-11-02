<template>
  <!-- <select
  v-model="table" :options="options">


</select> -->


<select class="form-control" v-model="table" @change="changeTable">
  <!-- <option>Choose Table</option> -->
  <option v-for="option in options" :key="option.id" v-bind:value="option.id" >{{ option.name }}</option>
</select>



</template>

<script>
export default {
  name: 'TableSelector',
  data(){
    return{
      table: null,
      options: [
        { id: null, name: 'Select a table to start ! ' },
        { id: 'flipball', name: 'Flipball' },
        // { id: 'marble', name: 'Marble' },
        // { id: 'modele', name: 'Modele' },
        // { id: 'd', name: 'Create your own', disabled: true }
      ]
    }
  },
  methods:{
    changeTable(){
      console.log(this.table)
    }
  },
  watch:{
    table(){
      this.$store.commit('setTable', this.table)
      const event = new CustomEvent('tableChanged', { detail: this.table });
      window.dispatchEvent(event);
    }
  }
}
</script>

<style>

</style>
