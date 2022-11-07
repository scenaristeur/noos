import {
  // Project,
  // PhysicsLoader,
  THREE,
  ExtendedObject3D,
  ThirdPersonControls,
  PointerLock,
  PointerDrag,
  FLAT
} from 'enable3d'

const isTouchDevice = 'ontouchstart' in window

export class Man  {
  constructor( ctx ) {
    console.log("man", ctx)
    this.ctx = ctx
    this.preload(ctx)


  }

  async preload(ctx){
    await ctx.load.preload('man', ctx.base_url+'assets/glb/box_man.glb')
  }


  async add(){
    const object = await this.ctx.load.gltf('man')
    const man = object.scene.children[0]

    this.ctx.man = new ExtendedObject3D()
    this.ctx.man.name = 'man'
    this.ctx.man.rotateY(Math.PI + 0.1) // a hack
    this.ctx.man.add(man)
    this.ctx.man.rotation.set(0, Math.PI * 1.5, 0)


    if(this.ctx.tablename == 'book') {
      this.ctx.man.position.set(35, 0, 0)
    }else{
      this.ctx.man.position.set(0, 1, 0)
    }

    // add shadow
    this.ctx.man.traverse(child => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = false
        // https://discourse.threejs.org/t/cant-export-material-from-blender-gltf/12258
        child.material.roughness = 1
        child.material.metalness = 0
      }
    })

    /**
    * Animations
    */
    this.ctx.animationMixers.add(this.ctx.man.animation.mixer)
    object.animations.forEach(animation => {
      if (animation.name) {
        this.ctx.man.animation.add(animation.name, animation)
      }
    })
    this.ctx.man.animation.play('idle')

    /**
    * Add the player to the scene with a body
    */
    this.ctx.add.existing(this.ctx.man)
    this.ctx.physics.add.existing(this.ctx.man, {
      shape: 'sphere',
      radius: 0.25,
      width: 0.5,
      offset: { y: -0.25 }
    })
    this.ctx.man.body.setFriction(0.8)
    this.ctx.man.body.setAngularFactor(0, 0, 0)

    // https://docs.panda3d.org/1.10/python/programming/physics/bullet/ccd
    this.ctx.man.body.setCcdMotionThreshold(1e-7)
    this.ctx.man.body.setCcdSweptSphereRadius(0.25)
    // man.children[0].material.color.b = 200
    // console.log('man man', man)





    this.ctx.man.body.on.collision((otherObject, event) => {
      if (otherObject.name != 'ground'  && otherObject.name != 'Mesh_1' && (event == 'start' || event =='end')){
        console.log(otherObject.userData.type,otherObject.name, event, otherObject)


        // tablename = d.toJSON().slice(0,10).replace(/-/g,'-');

         let detail = {name : 'tableChanged', type: 'calendar'/*, date: day.date*/}
         let date = this.ctx.details.date
         let after = new Date();
         let before = new Date();
         before.setDate(date.getDate() - 1);
         after.setDate(date.getDate() + 1);

        switch (otherObject.name) {
          case "doorBefore":
          console.log(otherObject.userData, this.ctx.details)

          detail.tablename = before.toJSON().slice(0,10).replace(/-/g,'-');

          //  detail.tablename =this.detail.dateBefore.toJSON().slice(0,10).replace(/-/g,'-')
          // let detail = {name : 'tableChanged', tablename: this.table}
          // const event = new CustomEvent('tableChanged', { detail: this.table });
          // const event = new CustomEvent('coreEvent', {detail: detail });
          // window.dispatchEvent(event);
          break;
          case "doorAfter":
          console.log(otherObject.userData, this.ctx.details)

          detail.tablename = after.toJSON().slice(0,10).replace(/-/g,'-');
          //  detail.tablename = this.detail.dateAfter.toJSON().slice(0,10).replace(/-/g,'-')
          // scene3D.restart({ level: scene3D.currentLevel + 1, tablename : this.detail.dateAfter })
          // const event = new CustomEvent('tableChanged', { detail: this.table });
          break;
          default:
        }
        if (detail.tablename != undefined){
          // const event = new CustomEvent('coreEvent', {detail: detail });
          // window.dispatchEvent(event);
          this.ctx.restart({ level: this.ctx.currentLevel + 1, tablename : detail.tablename })

        }
      }
    })





    /**
    * Add 3rd Person Controls
    */
    this.ctx.controls = new ThirdPersonControls(this.ctx.camera, this.ctx.man, {
      offset: new THREE.Vector3(0, 1, 0),
      targetRadius: 3
    })
    // set initial view to 90 deg theta
    // this.ctx.controls.theta = 90

    /**
    * Add Pointer Lock and Pointer Drag
    */
    if (!isTouchDevice) {
      let pl = new PointerLock(this.ctx.canvas)
      let pd = new PointerDrag(this.ctx.canvas)
      pd.onMove(delta => {
        if (pl.isLocked()) {
          this.ctx.controls.update(delta.x * 2, delta.y * 2)
        }
      })
    }
  }


}
