import { /*Project,*/ Scene3D/*, PhysicsLoader, ExtendedObject3D, THREE*/ } from 'enable3d'


export class MenuScene extends Scene3D {
  async preload() {
    await this.load.preload('grass', '/assets/img/grass.jpg')
    await this.load.preload('robot', '/assets/glb/robot.glb')
  }

  async create() {
    // create a nice menu and then start level 1
    console.log("start menu")

    window.addEventListener('tableChanged', async function (e) {
      console.log("start", e)
      this.start('MainScene', { level: 1 })

    })
  }
}
