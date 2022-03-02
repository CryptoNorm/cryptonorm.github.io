import { Standing, Running, Jumping, Rolling, Zapping, Falling, RunningLeft, Ded } from "./state.js";

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.states = [
      new Standing(this),
      new Running(this),
      new Jumping(this),
      new Rolling(this),
      new Zapping(this),
      new Falling(this),
      new RunningLeft(this),
      new Ded(this),
    ];
    this.currentState = this.states[0];

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 100;
    this.y = this.gameHeight - this.height;
    this.image = document.getElementById("playerImage");
    this.spriteRow = 0;
    this.spriteCol = 0;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.speed = 5;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 1;
    this.ded = false;
  }
  setState(state) {
    if (this.currentState.state !== this.states[state].state) {
      this.currentState = this.states[state];
      this.currentState.enter();
      console.log(this.states[state].state + " state entered");
    }
  }
  restart() {
    this.x = 100;
    this.y = this.gameHeight - this.height;
    this.maxFrame = 7;
    this.spriteCol = 0;
    this.spriteRow = 0;
    this.ded = false;
  }

  update(input, canvas, enemies) {
    // Current State
    this.currentState.handleInput(input);

    // boundaries
    if (this.x < 0) this.x = 0;
    else if (this.x > canvas.width/1.5 - this.width)
      this.x = canvas.width/1.5 - this.width;
    if (this.y > canvas.height - this.height)
      this.y = canvas.height - this.height;

    // movement
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;

    // gravity
    if (this.y < canvas.height - this.height) {
      this.gravity += 0.05;
    } else {
      this.gravity = 0;
      this.vy = 0;
    }

    
    // Collision detection
    enemies.forEach(enemy => {
        const dx = (enemy.x + enemy.width /2 - 20) - (this.x + this.width/2 + 20);
        const dy = (enemy.y + enemy.height /2 + 10) - (this.y + this.height/2 + 25);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.width/3 + this.width/5) {
            if(this.currentState == "ROLLING") enemy.ded;
            else this.currentState.state = 'DED';
        }
    }); 
         
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
  draw(context, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      // Sprite animation
      if (this.spriteCol < this.maxFrame) this.spriteCol++;
      else {
        this.spriteCol = 0;
        // Continue to animate until last frame
        if(this.currentState.state == 'DED') this.ded = true;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

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
}
