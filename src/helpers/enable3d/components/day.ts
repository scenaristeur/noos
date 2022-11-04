import { FLAT } from 'enable3d'

export class Day  {
  // table
  // walls
  constructor( scene ) {
    //this.buildTable(scene,config)
    this.buildDay(scene)
  }

  // buildTable(ctx, config){
  //   let t = config.table
  //   this.table = ctx.add.plane(
  //     {
  //       width: t.width,
  //       height: t.height,
  //       mass: t.mass,
  //       collisionFlags: t.collisionFlags
  //     }
  //     , { lambert: { color: t.color, transparent: true, opacity: 0.5 } }
  //   )
  //   this.table.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z)
  // }

  buildDay(ctx){
    console.log("ctx",ctx)
    const height = window.innerHeight
    let color = '#fcff96'
    // let offset = {x: 2, y:0, z:2}
    let step = {x:2, y:.5, z:2}
    let pos  = {x: -step.x*2, y: .2, z: -step.z*2}
    for (let h = 0; h < 24; h++){
      console.log(h)

      let box = {
        name: h,

        width: 1,//w.width,
        depth: 1,//w.depth,
        height:1,// w.height,

      }

      if (ctx.detail.grimp == true){
        box.x= -h//0//h//w.position.x,
        box.y= (h+1)*step.y//,//w.position.y,
        box.z= 0//,//w.position.z,
        box.collisionFlags= 1//w.collisionFlags
        box.depth=5

        //grimpette
      }else{
        //plane
        color = '#96fcff'
        box.x= pos.x //offset.x+h*step.x
        box.y= pos.y //offset.y+h*step.y
        box.z= pos.z //offset.z+h*step.z
        box.collisionFlags= 6//w.collisionFlags
        box.height= 0.2

        if(pos.x >= step.x*2){
          pos.x = -step.x*2
          pos.z = pos.z+step.z
        }else{
          pos.x+=step.x
        }
        if (pos.x == 0 && pos.z == 0){
          pos.x +=step.x
        }

      }



      const texture = new FLAT.TextTexture('h '+h)

      let heure = ctx.physics.add.box(
        box
        , { lambert: { color: color/*w.color*/, transparent: true, opacity: 0.8/*, metalness: 1 , material: texture.materials*/  }}
      )

      heure.body.on.collision((otherObject, event) => {
        if (event == 'start' || event =='end'){
          console.log(otherObject.name, event, h)
        }
        // if (otherObject.name !== 'ground') {
        //   // console.log('blueBox collided with another object than the ground')
        //   // console.log(otherObject, event)
        //   if (event == "start"){
        //     console.log("collision", otherObject.uuid)
        //
        //     ctx.score += o.onCollision.score
        //     console.log(ctx.score)
        //
        //     // score+=1
        //     // loadText("Score : "+score)
        //     // audio.play();
        //   }
        // }
      })


      // texture in 2d space
      // const texture = new FLAT.TextTexture('h '+h)
      // const sprite2d = new FLAT.TextSprite(texture)
      // ctx.ui.scene.add(sprite2d)
      // // sprite2d.setPosition(sprite2d.width / 2 + 40, height - sprite2d.height / 2 - 40)
      // sprite2d.setPosition(box.x, box.y+2, box.z)
      // console.log( 'TODO : why displaying text does not work, see https://github.com/enable3d/enable3d-website/blob/master/src/examples/flat/text-sprite.html')


      //wall.rotation.set(w.rotation.x, w.rotation.y, w.rotation.z)
      heure.body.needUpdate = true
      if(ctx.debug) console.log(h,heure)
    }
    // ctx.config.walls.forEach(w => {
    //
    // let wall = ctx.physics.add.box(
    //   {
    //     name: w.name,
    //     x: w.position.x,
    //     y: w.position.y,
    //     z: w.position.z,
    //     width: w.width,
    //     depth: w.depth,
    //     height: w.height,
    //     collisionFlags: w.collisionFlags
    //   }
    //   , { lambert: { color: w.color, transparent: true, opacity: 0.9 } }
    // )
    // wall.rotation.set(w.rotation.x, w.rotation.y, w.rotation.z)
    // wall.body.needUpdate = true
    // if(ctx.debug) console.log(w,wall)
    //
    // });

  }



}
