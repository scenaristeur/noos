<template>
  <div class="menu-view">
    <button @click="fork">Fork</button>
    <button @click="dispatchCoreEvent('exportThree')">Export Threejs Scene</button>
    <button @click="dispatchCoreEvent('importThree')">Import ThreeJs Scene</button>
    <button @click="dispatchCoreEvent('exportDave')">Export Dave</button>
    <button @click="dispatchCoreEvent('importDave')">Import Dave</button>
  </div>
</template>

<script>
export default {
  name: 'MenuView',
  methods:{
    fork(){
      console.log("fork")
    },
    dispatchCoreEvent(eventName){
      let detail = {name: eventName}
      const event = new CustomEvent('coreEvent', {detail: detail });
      window.dispatchEvent(event);
    },
    // exportThreeJson(){
    //   const event = new CustomEvent('exportThree', { date: Date.now() });
    //   window.dispatchEvent(event);
    // },
    // importThreeJson(){
    //   const event = new CustomEvent('importThree', { date: Date.now() });
    //   window.dispatchEvent(event);
    // },
    // exportDave(){
    //   const event = new CustomEvent('exportDave', { date: Date.now() });
    //   window.dispatchEvent(event);
    // },
    // importDave(){
    //   const event = new CustomEvent('importDave', { date: Date.now() });
    //   window.dispatchEvent(event);
    // },
  }


}
</script>

<style lang="css" scoped>
.menu-view {

}
</style>
