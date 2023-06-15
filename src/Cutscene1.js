class CutScene1 extends Phaser.Scene {
    constructor() {
      super('scene1');
      this.texts = [
        'No Face is lavished with food and gifts.',
        'He must consume all!!',
        'In order to get the attention of Sen.',
        'Collect as much food as possible!',
        'Move with arrow keys!',
        'Then, shoot away the Stink Spirit with space!',
        'And finally, find Chihiro to say goodbye.',
      ];
      this.currentIndex = 0;
    }
  
    create() {
      this.cameras.main.setBackgroundColor('#000000');
  
      // Create text object
      this.textObject = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        '',
        {
          fontFamily: 'Arial',
          fontSize: '10px',
          fill: '#ffffff',
          wordWrap: {
            width: 500,
            useAdvancedWrap: true
          }
        }
      );
      this.textObject.setOrigin(0.5);
  
      // Display initial text
      this.updateText();
  
      // Register click event
      this.input.on('pointerup', () => {
        if (this.currentIndex < this.texts.length - 1) {
          this.currentIndex++;
          this.updateText();
        } else {
          this.scene.start('overworldScene');
        }
      });
    }
  
    updateText() {
      this.textObject.setText(this.texts[this.currentIndex]);
    }
  }