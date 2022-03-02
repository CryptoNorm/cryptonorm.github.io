export const shadows = {
    KANGAROO: 0,
    CLOUD: 1,

}

 class Shadow {
    constructor(shadow){
        this.shadow = shadow;    
    }
}

export class Kangaroo extends Shadow {
    constructor(gameWidth, gameHeight){
        super('KANGAROO');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('shadows');
        this.width = 180;
        this.height = 114;
        this.x = 0;
        this.y = this.gameHeight-(this.height*1.5);
        this.spriteRow = 0;
        this.spriteCol = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 10;   
        this.markerForDeletion = false;
    }

    draw(context){
        context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {

        if(this.frameTimer > this.frameInterval) {
            if(this.spriteCol >= this.maxFrame) this.spriteCol = 0;
            else this.spriteCol++;
            this.frameTimer = 0;    
        } else {
            this.frameTimer += deltaTime;
        }
        this.x += this.speed;
        if (this.x > this.gameWidth){
            this.markerForDeletion  = true;
        }
    }
}

export class Clouds extends Shadow {
    constructor(gameWidth, gameHeight){
        super('CLOUDS');
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('shadows');
        this.width = 350;
        this.height = 130;
        this.x = gameWidth;
        this.y = 0 + 100;
        this.spriteRow = 1;
        this.spriteCol = 0;
        this.maxFrame = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 5;   
        this.markerForDeletion = false;
    }

    draw(context){
        context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        console.log("dfsdf");
        if(this.frameTimer > this.frameInterval) {
            if(this.spriteCol >= this.maxFrame) this.spriteCol = 0;
            else this.spriteCol++;
            this.frameTimer = 0;    
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        if (this.x < 0- this.width){
            this.markerForDeletion  = true;
        }
    }
}
