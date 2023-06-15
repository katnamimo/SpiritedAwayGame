class Credits extends Phaser.Scene {
    constructor() {
      super({ key: 'creditsScene' });
    }
  
    create() {
      // Set the background color to black
      this.cameras.main.setBackgroundColor('#000000');
  
      // Add your credits text here
      const creditsText = [
        'Game Credits',
        'Music: Spirited Away Piano OST',
        'Art: Me, Kenney Tiles, Henry Software',
        'Sound: Pixabay'
      ];
  
      const startY = this.cameras.main.height / 2 - (creditsText.length * 20) / 2; // Adjusted the starting Y position
  
      for (let i = 0; i < creditsText.length; i++) {
        this.add.text(
          this.cameras.main.width / 2,
          startY + i * 20, // Adjusted the Y position based on index
          creditsText[i],
          {
            fontFamily: 'Arial',
            fontSize: '16px', // Adjusted the font size to make it smaller
            fill: '#ffffff'
          }
        ).setOrigin(0.5);
      }
  
      // Handle a click event to return to the menu
      this.input.on('pointerdown', () => {
        this.scene.start('Menu');
      });
    }
  }
  