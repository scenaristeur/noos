<template>
  <div class="main-content">

    <div class="home" id="myScene">

      <!-- <div id="myCustomDiv"></div> -->
    </div>
  </div>
</template>

<script>
import { Project,  PhysicsLoader, /*THREE*//*  ExtendedObject3D, ExtendedMesh, CatmullRomCurve3*/ } from 'enable3d'
  import { MainScene } from '@/helpers/enable3d/MainScene.js'
  // import { MenuScene } from '@/helpers/enable3d/MenuScene.js'

  export default {
    name: 'MainContent',
    created(){
      console.log(process.env.BASE_URL)
      // let app = this
      this.load()

      // window.addEventListener('tableChanged', async function (e) {
      //   try{
      //     let config = await import('@/tables/'+e.detail+'/config.json');
      //     console.log(config)
      //     //app.load()
      //   }catch(e){
      //     console.log(e)
      //   }
      //
      // })
    },
    methods:{
  
      load(){

        // PhysicsLoader(
        //   // '/lib/ammo/kripken',
        //   'lib/ammo',
        //   () =>
        //   new Project({
        //     anisotropy: 1, // https://threejs.org/docs/#api/en/textures/Texture.anisotropy
        //     antialias: false, // false by default
        //     fixedTimeStep: 1 / 60,
        //     gravity: { x: 0, y: -9.81, z: 0 }, // the default gravity for all scenes
        //     maxSubSteps: 1,
        //   //  parent: 'myCustomDiv',
        //     renderer: new THREE.WebGLRenderer({ antialias: false }), // add a custom renderer if you want
        //     scenes: [MenuScene, MainScene]
        //   })
        // )

        PhysicsLoader('lib/ammo', () => new Project(
          {
            // scenes: [MainScene],
            // gravity: { x: 0, y: -9.81, z: 5}, //4
            // antialias: true,
            // maxSubSteps: 10, //20, //10
            // fixedTimeStep: 1/240//400, //1 / 360, // 1/240
            parent: 'myScene',
            antialias: false,
            maxSubSteps: 10,
            fixedTimeStep: 1 / 120,
            scenes: [MainScene]
          }
        ))
      }
    }

  }
  </script>

  <style lang="css" scoped>
  .main-content {

  }
  </style>
