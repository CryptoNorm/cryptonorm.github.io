export const enemies = {
    SHIP: 0,
    SPIDER: 1,
    GRUNT: 2,
    BRUTE: 3,
}

 class Enemy {
    constructor(enemy){
        this.enemy = enemy;    
    }
}

export class Ship extends Enemy {
    constructor(gameWidth, gameHeight){
        super('SHIP');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImages');
        this.x = this.gameWidth;
        this.y = (this.gameHeight) - Math.floor(Math.random() * (500 + 1) + 400);
        this.swoop = false;
        this.width = 219;
        this.height = 148;
        this.spriteRow = 3;
        this.spriteCol = 0;
        this.maxFrame = 1;
        this.fps = 20;
        this.frameTimer = 0;
        this.cycles = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 4;   
        this.markerForDeletion = false;
        this.ded = false; 
    }

    draw(context){
        /*
        context.linewidth = 5;
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width/2 - 20, this.y + this.height/2 + 10, this.width/3, 0, Math.PI * 2);
        context.stroke();
        */
       console.log(this.y);
        context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime, score) {

        this.cycles ++;
        if(this.frameTimer > this.frameInterval) {
            if(this.spriteCol >= this.maxFrame) this.spriteCol = 0;
            else this.spriteCol++;
            this.frameTimer = 0;    
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.cycles%100 == 0) this.swoop ? this.swoop = false : this.swoop = true;
        
        this.swoop ? this.y += Math.floor(Math.random() * 6) + 1 : this.y -= Math.floor(Math.random() * 3) + 1;

        this.x -= this.speed;
        if ((this.x < 0 ) || (this.ded)){
            console.log("ded?" + this.ded);
            console.log("x:" + this.x);
            this.markerForDeletion  = true;
            score++;
        }
    }
}

export class Spider extends Enemy {
    constructor(gameWidth, gameHeight){
        super('SPIDER');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImages');
        this.x = this.gameWidth;
        this.y = this.gameHeight -170;
        this.swoop = false;
        this.width = 176;
        this.height = 150;
        this.spriteRow = 0;
        this.spriteCol = 0;
        this.maxFrame = 17;
        this.fps = 20;
        this.frameTimer = 0;
        this.cycles = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 6;   
        this.markerForDeletion = false;
        this.ded = false; 
    }

    draw(context){
        /*
        context.linewidth = 5;
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width/2 - 20, this.y + this.height/2 + 10, this.width/3, 0, Math.PI * 2);
        context.stroke();
        */
        context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime, score) {

        this.cycles ++;
        if(this.frameTimer > this.frameInterval) {
            if(this.spriteCol >= this.maxFrame) this.spriteCol = 0;
            else this.spriteCol++;
            this.frameTimer = 0;    
        } else {
            this.frameTimer += deltaTime;
        }

        this.x -= this.speed;
        if ((this.x < 0 - this.width) || (this.ded)){
            console.log("poke");
            this.markerForDeletion  = true;
            score++;
        }
    }
}

export class Grunt extends Enemy {
    constructor(gameWidth, gameHeight){
        super('GRUNT');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImages');
        this.x = this.gameWidth;
        this.y = this.gameHeight -150;
        this.swoop = false;
        this.width = 154;
        this.height = 120;
        this.spriteRow = 2;
        this.spriteCol = 0;
        this.maxFrame = 17;
        this.fps = 20;
        this.frameTimer = 0;
        this.cycles = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 4;   
        this.markerForDeletion = false;
        this.ded = false; 
    }

    draw(context){
        /*
        context.linewidth = 5;
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(this.x + this.width/2 - 20, this.y + this.height/2 + 10, this.width/3, 0, Math.PI * 2);
        context.stroke();
        */
        context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime, score) {

        this.cycles ++;
        if(this.frameTimer > this.frameInterval) {
            if(this.spriteCol >= this.maxFrame) this.spriteCol = 0;
            else this.spriteCol++;
            this.frameTimer = 0;    
        } else {
            this.frameTimer += deltaTime;
        }

        this.x -= this.speed;
        if ((this.x < 0 - this.width) || (this.ded)){
            console.log("poke");
            this.markerForDeletion  = true;
            score++;
        }
    }
}
