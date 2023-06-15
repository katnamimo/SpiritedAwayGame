class Overworld extends Phaser.Scene {
    constructor() {
      super({ key: 'overworldScene' });
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
      this.load.spritesheet('food', 'food.png', {
        frameWidth: 16,
        frameHeight: 16,
      });
      this.load.spritesheet('stinkspirit', 'stinkspirit.png', {
        frameWidth: 46,
        frameHeight: 33,
      });
      this.load.image('tilesetImage', 'tileset.png');
      this.load.tilemapTiledJSON('tilemapJSON', 'area01.json');
      this.load.audio('collectSound', 'collectSound.mp3');
      this.load.audio('bgMusic', 'background.mp3');
    }
  
    create() {
      const map = this.add.tilemap('tilemapJSON');
      const tileset = map.addTilesetImage('tileset', 'tilesetImage');
  
      // Add background and layers
      const bgLayer = map.createLayer('Background', tileset, 0, 0);
      const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);
      const treeLayer = map.createLayer('Trees', tileset, 0, 0).setDepth(10);
  
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
  
      // Food group
      this.foodGroup = this.physics.add.group();
  
      // Spawn food items
      for (let i = 0; i < 10; i++) {
        const foodItem = this.foodGroup.create(
          Phaser.Math.Between(50, 750),
          Phaser.Math.Between(50, 550),
          'food',
          Phaser.Math.Between(0, 3) // Random frame index from 0 to 3
        );
        foodItem.setCollideWorldBounds(true);
      }
      // Collisions between slime and food items
      this.physics.add.overlap(
        this.slime,
        this.foodGroup,
        this.collectFood,
        null,
        this
      );
  
      // Score text
      this.scoreText = this.add.text(680, 10, 'Score: 0', {
        fontFamily: 'Arial',
        fontSize: '24px',
        fill: '#ffffff',
      });
  
      // Sounds
      this.collectSound = this.sound.add('collectSound');
      this.music = this.sound.add('bgMusic');
      this.music.play();
  
      // Cameras
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
      this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
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
      this.slime.setVelocity(
        this.VEL * this.direction.x,
        this.VEL * this.direction.y
      );
    }
  
    collectFood(player, food) {
      food.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      this.collectSound.play();
      this.foodCollected++;
  
      if (this.foodCollected === 10) {
        this.scene.start('overworld2'); // Transition to Overworld2 scene
      }
    }
  }
  