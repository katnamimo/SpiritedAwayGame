class Endscene extends Phaser.Scene {
    constructor() {
      super('scene2');
    }
  
    create() {
    this.bgMusic.stop();
      const titleText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        'The End',
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
        'Replay',
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
        'Replay',
        {
          fontSize: '24px',
          fill: '#000'
        }
      );
      playButtonLabel.setOrigin(0.5);

      // Button events
      playButton.on('pointerup', () => {
        this.scene.start('Menu');
      });
  
    }
  }
  
