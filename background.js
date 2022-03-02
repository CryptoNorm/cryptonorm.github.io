export default class Background {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("backgroundImage");
    this.x = 0;
    this.y = 0;
    this.width = 1761;
    this.height = 720;
    this.speed = 10;
    this.distance = 1;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width - this.speed,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.distance += 1;
    this.x -= this.speed;
    if (this.x < 0 - this.width) this.x = 0;
  }
  restart() {
    this.x = 0;
  }
}
