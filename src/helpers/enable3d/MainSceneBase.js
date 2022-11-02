// let debug = false
// let statistiques = true


import {  Scene3D,/* THREE, */ /*ExtendedObject3D,*//*  ExtendedMesh,*//* CatmullRomCurve3*/   } from 'enable3d'
  // import Stats from 'three/examples/jsm/libs/stats.module'
  // import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
  // import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
  // import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
  //
  // // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  //
  //
  // // import { TableSelector } from './components/tableSelector.ts'
  // import { Walls } from './components/walls.ts'
  // import { Launcher } from './components/launcher.ts'
  // import { Obstacles } from './components/obstacles.ts'
  // import { Tubes } from './components/tubes.ts'
  // import { Panels } from './components/panels.ts'
  // import { Colors } from './components/colors.ts'
  // import { Play } from './components/play.ts'
  // import { Ball } from './components/ball.ts'
  //
  // // import * as Tone from 'tone'
  //
  //
  // const stats = Stats()
  // let play = new Play()
  // let ready = false
  // let base_url = process.env.BASE_URL
  // const rotationSpeed= .2
  // const loader = new STLLoader()
  //
  // let text = 'three.js',
  // font = undefined,
  // fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
  // fontWeight = 'bold'; // normal bold
  // let group, textMesh1, textMesh2, textGeo, materials;
  // group = new THREE.Group();
  // group.position.y = -2;
  // group.position.z = -10;

  // let audios = {}
  // const loader2 = new GLTFLoader();

  //create a synth and connect it to the main output (your speakers)
  // const synth = new Tone.Synth().toDestination();


  export class MainScene extends Scene3D {
    constructor() {
      super('MainScene')
      let scene = this
      window.addEventListener('tableChanged', async function (e) {
        scene.tablename = e.detail

        scene.restart({ level: scene.currentLevel + 1, tablename : e.detail })

      }, false);
    }

    async init(data= {level:0, tablename: 'flipball'}) {

      console.log('init',data)
      const { level, tablename } = data
      this.currentLevel = level
      this.tablename = tablename
      console.log(`Playing level ${this.currentLevel}`)
    }

    async preload() {
      console.log('preload', this.tablename)
      // await this.load.preload('grass', '/assets/img/grass.jpg')
      // await this.load.preload('robot', '/assets/glb/robot.glb')
      this.config = await import('@/tables/'+this.tablename+'/config.json');
      // for (let i = 0; i < 500; i++){
      //   let name = 28811+i
      //   console.log(name)
      //   let audio = new Audio('./ambiant_buttons/'+name+'.wav');
      //   // audios.push(audio)
      //   audios[i] = audio
      //
      // }
      // console.log("audios",audios)
      //  console.log("audio", audio)
      // loadParts(this, flipper_parts)
      // this.create()
      console.log(this, this.config)
      alert (this.config.type)
    }

    async create() {

      console.log('create')
      const { orbitControls } = await this.warpSpeed()

      this.deconstructor.add(() => orbitControls?.dispose())


    }




  }
