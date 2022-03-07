export default class Background {
  constructor(image, speedModifer, gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image =image;
    //this.image = document.getElementById("backgroundImage1");
    //this.image = document.getElementById("backgroundImage2");
    //this.image = document.getElementById("backgroundImage3");
    //this.image = document.getElementById("backgroundImage4");
    //this.image = document.getElementById("backgroundImage5");
    this.x = 0;
    this.y = 0;
    this.width = 1761;
    this.height = 720;
    this.gameSpeed = 5;
    this.speed = this.gameSpeed + speedModifer;
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
