export default class Laser {
  constructor(gameWidth, gameHeight, playerX, playerY) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.image = document.getElementById("playerImage");
    this.x = playerX + 100;
    this.y = playerY;
    this.spriteRow = 4;
    this.spriteCol = 1;
    this.maxFrame = 0;
    this.fps = 5;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.speed = 100;
    this.markerForDeletion = false;
  }
  draw(context) {
    /*
        context.linewidth = 5;
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width/2 - 20, this.y + this.height/2 + 10, this.width/3, 0, Math.PI * 2);
        context.stroke();
        */
    context.drawImage(
      this.image,
      this.spriteCol * this.width,
      this.spriteRow * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(enemies) {
    // movement
    this.x += this.speed;

    if (this.x > this.gameWidth) {
      this.markerForDeletion = true;
    }
    // Collision detection
    enemies.forEach((enemy) => {
      const dx =
        enemy.x + enemy.width / 2 - 20 - (this.x + this.width / 2 + 20);
      const dy =
        enemy.y + enemy.height / 2 + 10 - (this.y + this.height / 2 + 25);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.width / 3 + this.width / 5) {
        enemy.ded = true;
      }
    });
  }
}
