
// import {  Scene3D,/* THREE, */ /*ExtendedObject3D,*//*  ExtendedMesh,*//* CatmullRomCurve3*/   }
import {
  // Project,
  // PhysicsLoader,
  Scene3D,
  ExtendedObject3D,
  THREE,
  JoyStick,
  // ThirdPersonControls,
  // PointerLock,
  // PointerDrag,
  ExtendedMesh,
  FLAT
} from 'enable3d'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const loader = new STLLoader()
// let ready = false


import { Walls } from './components/walls.ts'
import { Launcher } from './components/launcher.ts'
import { Obstacles } from './components/obstacles.ts'
import { Tubes } from './components/tubes.ts'
// import { Panels } from './components/panels.ts'
import { Colors } from './components/colors.ts'
// import { Play } from './components/play.ts'
import { Ball } from './components/ball.ts'
import { Day } from './components/day.ts'
import { Man } from './components/man.ts'
/**
* Is touch device?
*/
const isTouchDevice = 'ontouchstart' in window

export class MainScene extends Scene3D {
  constructor() {
    super('MainScene')
    let scene = this
    this.base_url = process.env.BASE_URL
    // window.addEventListener('tableChanged', async function (e) {
    //   scene.tablename = e.detail
    //   scene.restart({ level: scene.currentLevel + 1, tablename : e.detail })
    // }, false);

    window.addEventListener('coreEvent', async function (e) {
      let event = e.detail
      console.log("coreEvent", event)
      switch (event.name) {
        case 'tableChanged':
        scene.tablename = event.tablename
        scene.detail = event
        scene.restart({ level: scene.currentLevel + 1, tablename : event.tablename })
        break;
        case 'exportThree':
        scene.exportThree(scene.scene)
        break;
        case 'importThree':
        scene.importThree()
        break;
        case 'exportDave':
        scene.exportDave()
        break;
        case 'importDave':
        scene.importDave()
        break;
        default:

      }
      // scene.exportSceneToJSON(scene.scene)
    }, false);


    this.details = {}
    this.details.type = "calendar"
    let date = new Date()
    this.details.date = date
    // let before = new Date();
    // let after = new Date()
    // before.setDate(date.getDate() - 1);
    // after.setDate(date.getDate() + 1);
    // this.details.before = before
    // this.details.after = after
    this.tablename = date.toJSON().slice(0,10).replace(/-/g,'-');


  }

  async init(data= {level:0/*, tablename: 'book'*/}) {
    console.log('init',data)
    const { level, tablename } = data
    this.currentLevel = level
    tablename != undefined ? this.tablename = tablename : ""

    this.renderer.setPixelRatio(Math.max(1, window.devicePixelRatio / 2))

    this.canJump = true
    this.move = false

    this.moveTop = 0
    this.moveRight = 0


    console.log(`Playing level ${this.currentLevel}`)
    this.colors = new Colors(this)

  }

  async preload() {
    console.log('preload', this.tablename)
    // await this.load.preload('grass', '/assets/img/grass.jpg')
    // await this.load.preload('robot', '/assets/glb/robot.glb')
    /**
    * Medieval Fantasy Book by Pixel (https://sketchfab.com/stefan.lengyel1)
    * https://sketchfab.com/3d-models/medieval-fantasy-book-06d5a80a04fc4c5ab552759e9a97d91a
    * Attribution 4.0 International (CC BY 4.0)
    */
    if(this.tablename == 'book') {
      // const book =
      // let path = base_url+"stl/"+p.file+'.stl'
      await this.load.preload('book', this.base_url+'assets/glb/book.glb')
    }else if(this.details.type == 'calendar'){
      console.log("Mode calendar", this.details)
      await this.loadDayView(this)
    }else {

      this.config = await import('@/tables/'+this.tablename+'/config.json');
      console.log(this, this.config)
      alert (this.config.type)
      await this.loadCustomConfig(this)
    }

    /**
    * box_man.glb by Jan Bl??ha
    * https://github.com/swift502/Sketchbook
    * CC-0 license 2018
    */
    // const man =
    //  await this.load.preload('man', base_url+'assets/glb/box_man.glb')
    // await Promise.all([book, man])

    //  console.log("man",man, isTouchDevice)

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

  }

  async create() {

    console.log('create')


    let warp


    if(this.tablename == 'book') {
      warp = await this.warpSpeed('-ground'/*, '-orbitControls'*/)
      const { hemisphereLight, ambientLight, directionalLight } = warp.lights

      const intensity = 0.65
      hemisphereLight.intensity = intensity
      ambientLight.intensity = intensity
      directionalLight.intensity = intensity


      const addBook = async () => {
        const object = await this.load.gltf('book')
        const scene = object.scenes[0]

        const book = new ExtendedObject3D()
        book.name = 'scene'
        book.add(scene)
        this.add.existing(book)

        // add animations
        // sadly only the flags animations works
        object.animations.forEach((anim, i) => {
          book.mixer = this.animationMixers.create(book)
          // overwrite the action to be an array of actions
          book.action = []
          book.action[i] = book.mixer.clipAction(anim)
          book.action[i].play()
        })

        book.traverse(child => {
          if (child.isMesh) {
            child.castShadow = child.receiveShadow = false
            child.material.metalness = 0
            child.material.roughness = 1

            if (/mesh/i.test(child.name)) {
              this.physics.add.existing(child, {
                shape: 'concave',
                mass: 0,
                collisionFlags: 1,
                autoCenter: false
              })
              child.body.setAngularFactor(0, 0, 0)
              child.body.setLinearFactor(0, 0, 0)
            }
          }
        })
      }
      addBook()
    }else{
      warp = await this.warpSpeed(/*'-orbitControls'*/)
      console.log(warp.ground)
      warp.ground.material.color.g = 255
    }


    // Initialize the flat elements
    this.ui = FLAT.init(this.renderer)
    const orbitControls = warp.orbitControls
    // Use this if you need events on the 2D elements.
    // If you are using orbitControls, pass it to initEvents().
    // This makes sure orbitControls is not messing with the mouse move.
    FLAT.initEvents({ canvas: this.renderer.domElement, orbitControls })

    // Call Flat.destroy() on scene restart or stop
    // or simply add FLAT to the deconstructor
    this.deconstructor.add(FLAT /* same effect as FLAT.destroy */, orbitControls)

    // this.physics.debug.enable()


    let man = new Man(this)
    man.add()





    /**
    * Add Keys
    */
    this.keys = {
      w: { isDown: false },
      a: { isDown: false },
      s: { isDown: false },
      d: { isDown: false },
      n: { isDown: false }, // goToNow()
      space: { isDown: false }
    }

    const press = (e, isDown) => {
      e.preventDefault()
      const { keyCode } = e
      switch (keyCode) {
        case 87: // w
        this.keys.w.isDown = isDown
        break
        case 38: // arrow up
        this.keys.w.isDown = isDown
        break
        case 32: // space
        this.keys.space.isDown = isDown
        break
        case 78: // n to see now pointer
        this.keys.n.isDown = isDown
        break
        // default:
        // console.log('keyCode', keyCode)
      }
    }

    document.addEventListener('keydown', e => press(e, true))
    document.addEventListener('keyup', e => press(e, false))

    /**
    * Add joystick
    */
    if (isTouchDevice) {
      const joystick = new JoyStick()
      const axis = joystick.add.axis({
        styles: { left: 35, bottom: 35, size: 100 }
      })
      axis.onMove(event => {
        /**
        * Update Camera
        */
        const { top, right } = event
        this.moveTop = top * 3
        this.moveRight = right * 3
      })
      const buttonA = joystick.add.button({
        letter: 'A',
        styles: { right: 35, bottom: 110, size: 80 }
      })
      buttonA.onClick(() => this.jump())
      const buttonB = joystick.add.button({
        letter: 'B',
        styles: { right: 110, bottom: 35, size: 80 }
      })
      buttonB.onClick(() => (this.move = true))
      buttonB.onRelease(() => (this.move = false))
    }

    setTimeout(() => {
      const placeholder = document.getElementById('welcome-game-placeholder')
      if (placeholder) placeholder.remove()
    }, 500)
  }

  jump() {
    if (!this.man || !this.canJump) return
    this.canJump = false
    this.man.animation.play('jump_running', 500, false)
    setTimeout(() => {
      this.canJump = true
      this.man.animation.play('idle')
    }, 650)
    this.man.body.applyForceY(6)
  }

  goToNow(){
    var now_line = this.scene.getObjectByName( "now_line" )
    console.log("now_line", now_line, now_line.parent.position)
    this.camera.lookAt(now_line.parent.position)
  }



  update(/*time, delta*/) {
    // console.log(time,delta)
    if (this.man && this.man.body) {
      /**
      * Update Controls
      */

      // chute
      // console.log(this.man.body.position.y)
      if (this.man.body.position.y < -20){
        console.log('chute')
        this.man.position.set (0, 1, 0)
      }

      this.controls.update(this.moveRight * 2, -this.moveTop * 2)
      /**
      * Player Turn
      */
      const speed = 4
      const v3 = new THREE.Vector3()

      const rotation = this.camera.getWorldDirection(v3)
      const theta = Math.atan2(rotation.x, rotation.z)
      const rotationMan = this.man.getWorldDirection(v3)
      const thetaMan = Math.atan2(rotationMan.x, rotationMan.z)
      this.man.body.setAngularVelocityY(0)

      const l = Math.abs(theta - thetaMan)
      let rotationSpeed = isTouchDevice ? 2 : 4
      let d = Math.PI / 24

      if (l > d) {
        if (l > Math.PI - d) rotationSpeed *= -1
        if (theta < thetaMan) rotationSpeed *= -1
        this.man.body.setAngularVelocityY(rotationSpeed)
      }

      /**
      * Player Move
      */

      if(this.keys.n.isDown){
        this.goToNow()
      }

      if (this.keys.w.isDown || this.move) {
        if (this.man.animation.current === 'idle' && this.canJump) this.man.animation.play('run')

        const x = Math.sin(theta) * speed,
        y = this.man.body.velocity.y,
        z = Math.cos(theta) * speed

        this.man.body.setVelocity(x, y, z)
      } else {
        if (this.man.animation.current === 'run' && this.canJump) this.man.animation.play('idle')
      }

      /**
      * Player Jump
      */
      if (this.keys.space.isDown && this.canJump) {
        this.jump()
      }



    }
  }

  async loadDayView(scene){
    console.log(scene)
    let day = new Day(scene)
    console.log(day)
  }
  async loadCustomConfig(scene){
    if (scene.config.walls != undefined){
      let walls = new Walls(scene)
      console.log(walls)
    }
    if (scene.config.launcher != undefined){
      scene.launcher = new Launcher(scene)

    }
    if (scene.config.obstacles != undefined){
      let obstacles = new Obstacles(scene)
      console.log(obstacles)
    }
    if (scene.config.tubes != undefined){
      let tubes = new Tubes(scene)
      console.log(tubes)
    }
    if(scene.config.flipper_parts != undefined){
      scene.loadParts(scene, scene.config.flipper_parts)
    }
  }

  async loadParts(ctx, parts){
    let count = parts.length

    // const helmet = new ExtendedObject3D()
    // const pos = { x: 0, y: 2, z: -5 }
    //
    // loader2.load( './components/gltf/DamagedHelmet.gltf', function ( gltf ) {
    //
    //   // let helmet = ctx.scene.add( gltf.scene );
    //   helmet.add(gltf.scene)
    //
    //   helmet.scale.set(2, 2, 2)
    //   helmet.position.set(pos.x, pos.y, pos.z)
    //
    //   ctx.add.existing(helmet)
    // } );

    for (let p of parts){
      console.log("loading", p.name)
      let path = this.base_url+"stl/"+p.file+'.stl'
      // console.log(path)
      loader.load(
        path,
        function (geometry) {

          const part = new ExtendedMesh(geometry, ctx.colors["mat1"])

          let object = new ExtendedObject3D()
          object.add(part)
          p.scale != undefined ? object.scale.set(p.scale.x, p.scale.y, p.scale.z) : ""
          p.position != undefined ? object.position.set(p.position.x, p.position.y, p.position.z) : ""
          p.rotation != undefined ? object.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z) : ""


          ctx.scene.add(object)
          ctx.physics.add.existing(object, {shape: p.shape})
          object.body.setCollisionFlags(2)
          // object.body.setBounciness(.1)
          object.name = p.name
          object.mass = 2

          // motion clamping https://enable3d.io/docs.html#collisions
          // object.body.setCcdMotionThreshold(ccd_threshold_bat)
          // object.body.setCcdSweptSphereRadius(ccd_radius_bat)
          // object.body.setBounciness(.1)
          // console.log(object)
        },
        (xhr) => {
          let progress = xhr.loaded / xhr.total
          console.log(progress * 100 + '% loaded')
          if(progress == 1){

            if (count == 1){
              console.log("Parts are loaded")
              // ready = true
              new Ball(ctx)
            }else{
              console.log(count+"/"+parts.length)
            }
            count --
          }

        },
        (error) => {
          console.log(error)
          alert ('error loading'+p.name+" : "+error)
        }
      )
    }
  }

  ////////////////
  exportDave(){
    console.log("export dave")
  }
  importDave(){
    console.log("import dave")
  }


  importThree(){
    console.log("load three scene")
    // var loader = new THREE.ObjectLoader();
    // 			loader.setResourcePath( scope.texturePath );
    //
    // 			loader.parse( data, function ( result ) {
    //
    // 				if ( result.isScene ) {
    //
    // 					editor.execute( new SetSceneCommand( editor, result ) );
    //
    // 				} else {
    //
    // 					editor.execute( new AddObjectCommand( editor, result ) );
    //
    // 				}
    //
    // 			} );
  }


  exportThree(scene){

    console.log(scene)
    if (scene.control != undefined){
      scene.control.detach();
      scene.remove(scene.control);
    }

    scene.updateMatrixWorld();
    var result=scene.toJSON();
    var output =JSON.stringify(result);
    // download(output, 'scene.json', 'application/json');
    console.log("export", output)
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
    // var dlAnchorElem = document.getElementById('downloadAnchorElem');
    const dlAnchorElem = document.createElement('a')
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "scene.json");
    document.body.appendChild(dlAnchorElem)
    dlAnchorElem.click();
    document.body.removeChild(dlAnchorElem)


    // const a = document.createElement('a')
    // a.href = url
    // a.download = url.split('/').pop()
    // document.body.appendChild(a)
    // a.click()
    // document.body.removeChild(a)
  }




  ////////////////


}


// this.deconstructor.add(() => orbitControls?.dispose())


// }




// }
