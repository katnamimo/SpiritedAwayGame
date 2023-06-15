class Overworld2 extends Phaser.Scene {
    constructor() {
      super({ key: 'overworld2' });
      this.VEL = 100;
      this.score = 0;
      this.scoreText;
      this.collectSound;
      this.music;
      this.foodCollected = 0; // Track the number of food items collected
      this.stinkSpiritHealth = 10; // Stink Spirit health
      this.healthBar;
      this.healthBarWidth = 100;
      this.healthBarHeight = 10;
      this.healthBarColor = 0x00ff00; // Green color
    }
  
    preload() {
      this.load.path = './assets/';
      this.load.spritesheet('slime', 'slime.png', {
        frameWidth: 30,
        frameHeight: 45,
      });
      this.load.image('tilesetImage', 'tileset.png');
      this.load.tilemapTiledJSON('tilemapJSON2', 'area02.json');
      this.load.audio('bgMusic', 'background.mp3');
      this.load.image('soap', 'soap.png'); // Load soap sprite
    }
  
    create() {
      const map2 = this.add.tilemap('tilemapJSON2');
      const tileset = map2.addTilesetImage('tileset', 'tilesetImage');
  
      // Add background and layers
      const bgLayer = map2.createLayer('Background', tileset, 0, 0);
      const terrainLayer = map2.createLayer('Terrain', tileset, 0, 0);
      const treeLayer = map2.createLayer('Trees', tileset, 0, 0).setDepth(10);
  
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
  
      // Add stink spirit
      this.stinkSpirit = this.physics.add.sprite(400, 300, 'stinkspirit', 0);
      this.anims.create({
        key: 'idle',
        frameRate: 6,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('stinkspirit', {
          start: 0,
          end: 3,
        }),
      });
      this.stinkSpirit.play('idle');
      this.stinkSpirit.body.setCollideWorldBounds(true);
      terrainLayer.setCollisionByProperty({ collides: true });
      treeLayer.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.stinkSpirit, terrainLayer);
      this.physics.add.collider(this.stinkSpirit, treeLayer);
  
      // Health bar for stink spirit
      this.healthBar = this.add.graphics();
      this.updateHealthBar();
  
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
  
      // Input
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
      // Cameras
      this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
      this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
      this.physics.world.bounds.setTo(0, 0, map2.widthInPixels, map2.heightInPixels);
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
  
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        // Shoot soap
        const soap = this.physics.add.sprite(this.slime.x, this.slime.y, 'soap');
        this.physics.add.collider(soap, this.stinkSpirit, this.shootSoap, null, this);
        soap.setVelocity(this.direction.x * 300, this.direction.y * 300);
      }
    }
  
    shootSoap(soap, stinkSpirit) {
      soap.disableBody(true, true);
      this.stinkSpiritHealth--; // Reduce stink spirit health
      this.updateHealthBar();
      
      if (this.stinkSpiritHealth <= 0) {
        stinkSpirit.disableBody(true, true);
        this.scene.start('overworld3'); // Transition to Overworld3 scene
      }
    }
  
    updateHealthBar() {
      this.healthBar.clear();
      const healthBarX = this.stinkSpirit.x - this.healthBarWidth / 2;
      const healthBarY = this.stinkSpirit.y - 30;
      const remainingHealthWidth = (this.stinkSpiritHealth / 10) * this.healthBarWidth;
      
      // Draw health bar background
      this.healthBar.fillStyle(0x000000);
      this.healthBar.fillRect(healthBarX, healthBarY, this.healthBarWidth, this.healthBarHeight);
      
      // Draw remaining health
      this.healthBar.fillStyle(this.healthBarColor);
      this.healthBar.fillRect(healthBarX, healthBarY, remainingHealthWidth, this.healthBarHeight);
    }
  }
  