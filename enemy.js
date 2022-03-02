export const enemies = {
    OWL: 0,
    DINGO: 1,
}

 class Enemy {
    constructor(enemy){
        this.enemy = enemy;    
    }
}

export class Owl extends Enemy {
    constructor(gameWidth, gameHeight){
        super('OWL');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImages');
        this.x = this.gameWidth;
        this.y = (this.gameHeight) - Math.floor(Math.random() * (700 - 400 + 1) + 400);
        this.swoop = false;
        this.width = 200;
        this.height = 200;
        this.spriteRow = 0;
        this.spriteCol = 0;
        this.maxFrame = 4;
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

        if (this.cycles%100 == 0) this.swoop ? this.swoop = false : this.swoop = true;
        
        this.swoop ? this.y += Math.floor(Math.random() * 6) + 1 : this.y -= Math.floor(Math.random() * 3) + 1;

        console.log("prex:" + this.x + " - " + this.speed);
        this.x -= this.speed;
        console.log("post:" + this.x);
        if ((this.x < 0 ) || (this.ded)){
            console.log("ded?" + this.ded);
            console.log("x:" + this.x);
            this.markerForDeletion  = true;
            score++;
        }
    }
}

export class Dingo extends Enemy {
    constructor(gameWidth, gameHeight){
        super('DINGO');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImages');
        this.x = this.gameWidth;
        this.y = this.gameHeight -200;
        this.swoop = false;
        this.width = 250;
        this.height = 250;
        this.spriteRow = 1;
        this.spriteCol = 0;
        this.maxFrame = 2;
        this.fps = 20;
        this.frameTimer = 0;
        this.cycles = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 8;   
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
