window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;


    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                // Only add Arrow press to the array the first time
                if((    e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight')
                        && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
            });
            // On key up of Arrow press, remove, or splice, an element from array
            window.addEventListener('keyup', e => {
                if(     e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.spriteRow = 1;
            this.spriteCol = 0;
            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;

            this.speed = 0;
            this.vy = 0;
            this.gravity = 1;
        }
        draw(context) {
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
            context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, enemies) {
            // Collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width /2) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height /2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width/2 + this.width/2) {
                    gameOver = true;
                }
            }); 


            // Sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.spriteCol >= this.maxFrame) this.spriteCol = 0;
                else this.spriteCol++;
                this.frameTimer = 0;    
            } else {
                this.frameTimer += deltaTime;
            }

            // Controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 32;    
            } else {
                this.speed = 0;
            }
            // Horizontal Movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            // Vertical Movement
            this.y += this.vy;
            if (!this.onGround()) {
                this.vy += this.gravity;
                this.maxFrame = 5;
                this.spriteCol = 1;
            } else {
                this.vy = 0;
                this.maxFrame = 8;
                this.spriteRow = 0;
            }
            if(this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
            else if (this.y < 0) this.y = 0;
 
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }

    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 10;    
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }

    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.spriteRow = 0;
            this.spriteCol = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 8;   
            this.markerForDeletion = false;       
  
        }
        draw(context){
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
            context.drawImage(this.image, this.spriteCol * this.width, this.spriteRow * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
            if(this.frameTimer > this.frameInterval) {
                if(this.spriteCol >= this.maxFrame) this.spriteCol = 0;
                else this.spriteCol++;
                this.frameTimer = 0;    
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) {
                this.markerForDeletion  = true;
                score++;
            }
        }
    }

    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markerForDeletion);
    }

    function displayStatusText(context){
        context.font = '40px Helvetica';

        context.fillStyle = 'black';
        context.fillText('Score: ' + score, 20, 50);
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 22, 50);
        if (gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'Black';
            context.fillText('GAME OVER, Try Again', canvas.width/2, 200);
            context.fillStyle = 'White';
            context.fillText('GAME OVER, Try Again', canvas.width/2 + 2, 202);
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timestamp){
        // timestamp provided by requestAnimationFrame
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if(!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

});