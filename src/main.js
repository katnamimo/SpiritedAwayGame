// phaser's major comps
// - animation manager
// - tilemap
// - camera
// - physics
// - text objects


let config={
    type: Phaser.CANVAS,
    render:{
        pixelArt:true
    },
    width:320,
    height:240,
    physics:{
        default:'arcade',
        arcade:{
        //    debug: true
        }
    },
    zoom: 2,
    scene: [Menu, Credits, CutScene1, Overworld, Overworld2, Overworld3, Endscene]
}
const game=new Phaser.Game(config)