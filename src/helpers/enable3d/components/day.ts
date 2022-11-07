import { FLAT, THREE } from 'enable3d'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
let font = undefined,
fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
fontWeight = 'bold'; // normal bold


export class Day  {
  // table
  // walls
  constructor( scene ) {
    //this.buildTable(scene,config)
    let mod = this
    const loader = new FontLoader();
    loader.load( 'fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {
      // loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( response ) {
      font = response;
      console.log('font', font)
      mod.buildDay(scene)
      //ms.refreshText();
    } );

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
    let step = {x:4, y:.5, z:4}
    let pos  = {x: -step.x*2, y: .2, z: -step.z*2}



    let doorBeforeShape = {
      name: 'doorBefore',
      details: {type:'door'},
      width: 2,//w.width,
      depth: .2,//w.depth,
      height:4,// w.height,
      x: -9.5,
      y: 1,
      z:-10.5,
      collisionFlags: 6
    }
    let doorAfterShape = {
      name: 'doorBefore',
      details: {type:'door'},
      width: 2,//w.width,
      depth: .2,//w.depth,
      height:4,// w.height,
      x: 9.5,
      y: 1,
      z:10.5,
      collisionFlags: 6
    }

    let doorBefore = ctx.physics.add.box(doorBeforeShape, { lambert: { color: '#00ff00'/*w.color*/, transparent: true, opacity: 0.5/*, metalness: 1 , material: texture.materials*/  }} )
    let doorAfter = ctx.physics.add.box(doorAfterShape, { lambert: { color: '#ffff00'/*w.color*/, transparent: true, opacity: 0.5/*, metalness: 1 , material: texture.materials*/  }} )

    for (let h = 0; h < 24; h++){
      // console.log(h)

      let box = {
        name: h,
        details: {type:'hour'},

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
        box.width = 3
        box.depth = 3

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



      // const texture = new FLAT.TextTexture('h '+h)

      let heure = ctx.physics.add.box(box, { lambert: { color: color/*w.color*/, transparent: true, opacity: 0.8/*, metalness: 1 , material: texture.materials*/  }} )

      const texture = new FLAT.TextTexture(h+':00 - '+h+':59')

      // texture in 2d space
      const sprite2d = new FLAT.TextSprite(texture)
      sprite2d.setScale(0.003)
      sprite2d.position.y = .3
      heure.add(sprite2d)






      // pointeur now
      var date = new Date();
      // var minute = date.getMinutes();
      var hour = date.getHours();
      // var day = date.getDate();
      // var month = date.getMonth();
      // var year = date.getFullYear();
      if (hour == h){

        const material = new THREE.LineBasicMaterial({
          color: 0x0000ff
        });

        const points = [];
        points.push( new THREE.Vector3( 0, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 2, 0 ) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        line.name = "now_line"
        // line.collisionFlags= 1
        heure.add( line );

      }





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
