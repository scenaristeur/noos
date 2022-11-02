import { /*Project,*/ Scene3D,/* PhysicsLoader,*/ ExtendedObject3D/*, THREE*/ } from 'enable3d'

export class MainScene extends Scene3D {
       constructor() {
         // define the key and if you want it to be an WebXR scene or not
         super({ key: 'MainScene', enableXR: false })
       }

       async init(data) {
         const { level } = data
         this.currentLevel = level
         console.log(`Playing level ${this.currentLevel}`)
       }

       async create() {
         // we do not need a ground in this scene
         const { orbitControls } = await this.warpSpeed('-ground')

         // dispose the orbitControls on reload
         this.deconstructor.add(() => orbitControls?.dispose())

         // set a per scene physics
         this.physics.setGravity(0, -9.81, 0)

         // add grass
         const grass = await this.load.texture('grass')
         grass.wrapS = grass.wrapT = 1000 // RepeatWrapping
         grass.offset.set(0, 0)
         grass.repeat.set(2, 2)
         this.physics.add.ground({ width: 20, height: 20, y: 0 }, { phong: { map: grass } })

         // add robot
         const gltf = await this.load.gltf('robot')
         const robot = new ExtendedObject3D()
         robot.name = 'robot'
         robot.add(gltf.scene.children[0])
         robot.traverse(child => {
           if (child.isMesh) child.castShadow = child.receiveShadow = true
         })
         robot.position.set(0, 5, 0)
         robot.scale.set(0.5, 0.5, 0.5)
         this.add.existing(robot)
         this.physics.add.existing(robot, { shape: 'box', offset: { y: -0.5 } })

         window.addEventListener('tableChanged', async function (e) {
           console.log("start", e)
           this.start('MainScene', { level: 1 })

         })

         // load the next level after 3 seconds
         setTimeout(() => {
           this.restart({ level: this.currentLevel + 1 })
           console.log("restart")
         }, 3000)
       }
     }
