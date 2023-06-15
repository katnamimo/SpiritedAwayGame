class Overworld3 extends Phaser.Scene {
  constructor() {
    super({ key: 'overworld3' });
    this.VEL = 100;
    this.score = 0;
    this.scoreText;
    this.collectSound;
    this.music;
    this.foodCollected = 0; // Track the number of food items collected
  }

  preload() {
    this.load.path = './assets/';
    this.load.spritesheet('slime', 'slime.png', {
      frameWidth: 30,
      frameHeight: 45,
    });
    this.load.image('tilesetImage', 'tileset.png');
    this.load.tilemapTiledJSON('tilemapJSON3', 'area03.json');
    this.load.audio('bgMusic', 'background.mp3');
    this.load.image('hakuchihiro', 'hakuchihiro.png');
  }

  create() {
    const map3 = this.add.tilemap('tilemapJSON3');
    const tileset = map3.addTilesetImage('tileset', 'tilesetImage');

    // Add background and layers
    const bgLayer = map3.createLayer('Background', tileset, 0, 0);
    const terrainLayer = map3.createLayer('Terrain', tileset, 0, 0);
    const treeLayer = map3.createLayer('Trees', tileset, 0, 0).setDepth(10);

    // Add sprite
    this.slime = this.physics.add.sprite(32, 32, 'slime', 0);
    this.anims.create({
      key: 'jiggle',
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('slime', {
        start: 0,
        end: 1,
      }),
    });
    this.slime.play('jiggle');
    this.slime.body.setCollideWorldBounds(true);
    terrainLayer.setCollisionByProperty({ collides: true });
    treeLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.slime, terrainLayer);
    this.physics.add.collider(this.slime, treeLayer);

    // Add hakuchihiro sprite and text
    this.hakuchihiro = this.add.sprite(400, 300, 'hakuchihiro').setDepth(1);
    this.physics.add.existing(this.hakuchihiro); // Enable physics for hakuchihiro
    this.hakuchihiro.body.setCollideWorldBounds(true);

    this.hakuchihiroText = this.add.text(
      this.hakuchihiro.x - 120,
      this.hakuchihiro.y - 20,
      '',
      {
        fontFamily: 'Arial',
        fontSize: '10px',
        fill: '#ffffff',
      }
    );

    // Collisions between slime and hakuchihiro
    this.physics.add.collider(this.slime, this.hakuchihiro, this.approachHakuchihiro, null, this);

    // Cameras
    this.cameras.main.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);
    this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
    this.physics.world.bounds.setTo(0, 0, map3.widthInPixels, map3.heightInPixels);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.direction = new Phaser.Math.Vector2(0);

    if (this.cursors.left.isDown) {
      this.direction.x = -1;
      this.slime.setFlipX(false);
    } else if (this.cursors.right.isDown) {
      this.direction.x = 1;
      this.slime.setFlipX(true);
    }

    if (this.cursors.up.isDown) {
      this.direction.y = -1;
    } else if (this.cursors.down.isDown) {
      this.direction.y = 1;
    }

    this.direction.normalize();
    this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
  }

  approachHakuchihiro(slime, hakuchihiro) {
    // Display message
    this.hakuchihiroText.setText('Goodbye No Face, it was fun being with you');

    // Transition to endScene after a delay
    setTimeout(() => {
      this.scene.start('scene2');
    }, 4000); 
  }
}
