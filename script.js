import Player from './player.js';
import Background from './background.js';
import {Owl, Dingo} from './enemy.js';
import Laser from './laser.js';
import {Kangaroo, Clouds} from './shadow.js';
import InputHandler from './input.js';
import {displayStatusText} from './utils.js';
import {displayMessageText} from './utils.js';

window.addEventListener('load', function(){
    const loading = document.getElementById('loading');
    loading.style.display = 'none';



    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720;
    let enemies = [];
    let shadows = [];
    let lasers = [];
    let score = 0;
    let dice = 0;
    const fullscreenButton = document.getElementById('fullscreenButton');

    const enemyTypes = [
        new Owl(canvas.width, canvas.height),
        new Dingo(canvas.width, canvas.height),
      ];

    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval) {

            dice = Math.floor(Math.random() * 3);
            if ((dice == 0) || (dice == 1)) enemies.push(new Owl(canvas.width, canvas.height));
            if ((dice == 2) || (dice == 3)) enemies.push(new Dingo(canvas.width, canvas.height));

            console.log("enemies: " + enemies.length);
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime, score);
        });
        enemies = enemies.filter(enemy => !enemy.markerForDeletion);
    }

    function handleShadows(deltaTime){
        if (shadowTimer > shadowInterval + randomShadowInterval) {

            dice = Math.floor(Math.random() * 3);
            if ((dice == 0) || (dice == 1)) shadows.push(new Kangaroo(canvas.width, canvas.height));
            if ((dice == 2) || (dice == 3)) {
                    shadows.push(new Clouds(canvas.width, canvas.height));
            }

            shadowTimer = 0;
        } else {
            shadowTimer += deltaTime;
        }
        shadows.forEach(shadow => {
            shadow.draw(ctx);
            shadow.update(deltaTime);
        });
        shadows = shadows.filter(shadow => !shadow.markerForDeletion);
    }    

    function handleLasers(playerX, playerY, enemies, score){
        
        lasers.push(new Laser(canvas.width, canvas.height, playerX, playerY));
        
        lasers.forEach(laser => {
            laser.draw(ctx);
            laser.update(enemies, score);
        });
        enemies = enemies.filter(enemy => !enemy.markerForDeletion);
    }


    function toggleFullScreen(){
        if(!document.fullscreenElement){
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    fullscreenButton.addEventListener('click', toggleFullScreen);

    const player = new Player(canvas.width, canvas.height);
    const laser = new Laser(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const input = new InputHandler(player, background, enemies, score);
    
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 2000;
    let randomEnemyInterval = Math.floor(Math.random() * 2000);
    let shadowTimer = 0;
    let shadowInterval = 4000;
    let randomShadowInterval = Math.floor(Math.random() * 2000);

    function animate(timestamp){
        // timestamp provided by requestAnimationFrame
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        background.draw(ctx);
        
        //if((player.currentState.state == 'RUNNING') || (player.currentState.state == 'ROLLING')) {
            background.update(input.input);
        //}

        if((player.currentState.state == 'ZAPPING')) {
            handleLasers(player.x, player.y, enemies);
        }

        handleShadows(deltaTime);
        //displayStatusText(ctx, input.input + ' ' + player.currentState.state + ' Distance:' + background.distance);
        displayStatusText(ctx, 'Score: ' + score);

        player.draw(ctx, deltaTime);
        player.update(input.input, canvas, enemies);
        
        //handleEnemies(deltaTime);

        
        if(!player.ded)requestAnimationFrame(animate);
        else displayMessageText(ctx, canvas, 'You Ded. Any key or Swipe Down to restart.');
    }
    animate(0);

});