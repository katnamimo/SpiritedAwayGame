class Menu extends Phaser.Scene {
    constructor() {
      super('Menu');
    }
  
    preload() {
      this.load.path = './assets/';
      this.load.image('background', 'background.jpg');
    }
  
    create() {
      const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0);
      backgroundImage.setScale(0.5); 
      const titleText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        'Spirited Away',
        {
          fontSize: '20px',
          fill: '#fff'
        }
      );
      titleText.setOrigin(0.5);
  
      // Create the Play button
      const playButton = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 50,
        'Play',
        {
          fontSize: '24px',
          fill: '#000'
        }
      );
      playButton.setOrigin(0.5);
      playButton.setInteractive();
  
      // Create the Play button background
      const playButtonBackground = this.add.rectangle(
        playButton.x,
        playButton.y,
        playButton.width + 20,
        playButton.height + 10,
        0xffffff
      );
      playButtonBackground.setOrigin(0.5);
  
      // Create the Play button label
      const playButtonLabel = this.add.text(
        playButton.x,
        playButton.y,
        'Play',
        {
          fontSize: '24px',
          fill: '#000'
        }
      );
      playButtonLabel.setOrigin(0.5);
  
      // Create the Credits button
      const creditsButton = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 100,
        'Credits',
        {
          fontSize: '24px',
          fill: '#000'
        }
      );
      creditsButton.setOrigin(0.5);
      creditsButton.setInteractive();
  
      // Create the Credits button background
      const creditsButtonBackground = this.add.rectangle(
        creditsButton.x,
        creditsButton.y,
        creditsButton.width + 20,
        creditsButton.height + 10,
        0xffffff
      );
      creditsButtonBackground.setOrigin(0.5);
  
      // Create the Credits button label
      const creditsButtonLabel = this.add.text(
        creditsButton.x,
        creditsButton.y,
        'Credits',
        {
          fontSize: '24px',
          fill: '#000'
        }
      );
      creditsButtonLabel.setOrigin(0.5);
  
      // Button events
      playButton.on('pointerup', () => {
        this.scene.start('scene1');
      });
  
      creditsButton.on('pointerup', () => {
        this.scene.start('creditsScene');
      });
    }
  }
