<template>
  <!-- <select
  v-model="table" :options="options">


</select> -->
<div>

  <select class="form-control" v-model="table" @change="changeTable">
    <!-- <option>Choose Table</option> -->
    <option v-for="option in options" :key="option.id" v-bind:value="option.id" >{{ option.name }}</option>
  </select> or   <input v-model="tableUrl" placeholder="Table url" /> <button @click="changeTableUrl" >Load</button>
</div>


</template>

<script>
export default {
  name: 'TableSelector',
  data(){
    return{
      table: null,
      tableUrl: null,
      options: [
        { id: null, name: 'Select a table to start ! ' },
        { id: 'book', name: 'Book' },
        { id: 'accueil', name: 'Accueil' },
        { id: 'table1', name: 'Table 1' },
        { id: 'table2', name: 'Table 2' },
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
    },
    changeTableUrl(){
      console.log(this.tableUrl)
    }
  },
  watch:{
    table(){
      //  this.$store.commit('setTable', this.table)
      const event = new CustomEvent('tableChanged', { detail: this.table });
      window.dispatchEvent(event);
    }
  }
}
</script>

<style>

</style>
