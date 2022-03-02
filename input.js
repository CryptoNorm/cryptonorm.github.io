import { restartGame } from "./utils.js";

export default class InputHandler {
    constructor(player, background, enemies, score){
        this.input = '';
        this.touchY = '';
        this.touchThreshold = 30;
        this.player = player;
        this.background = background;
        this.score = score;
        this.enemies = enemies;

        window.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'ArrowLeft':
                    this.input = 'PRESS left';
                    break;
                case 'ArrowRight':
                    this.input = 'PRESS right';
                    break;
                case 'ArrowUp':
                    this.input = 'PRESS up';
                    break;
                case 'ArrowDown':
                    this.input = 'PRESS down';
                    break;
                case 'Control':
                    this.input = 'PRESS attack';
                    break;
                case 'a':
                    this.input = 'PRESS left';
                    break;
                case 'd':
                    this.input = 'PRESS right';
                    break;
                case 'w':
                    this.input = 'PRESS up';
                    break;
                case 's':
                    this.input = 'PRESS down';
                    break;
                case ' ':
                    this.input = 'PRESS attack';
                    break;
            }
            if(this.player.ded) {
                restartGame(this.player, background, enemies, score);
            }
            console.log(this.input);
        });
        window.addEventListener('keyup', (e) => {
            switch(e.key){
                case 'ArrowLeft':
                    this.input = 'RELEASE left';
                    break;
                case 'ArrowRight':
                    this.input = 'RELEASE right';
                    break;
                case 'ArrowUp':
                    this.input = 'RELEASE up';
                    break;
                case 'ArrowDown':
                    this.input = 'RELEASE down';
                    break;
                case 'Control':
                    this.input = 'RELEASE attack';
                    break;
                case 'a':
                    this.input = 'RELEASE left';
                    break;
                case 'd':
                    this.input = 'RELEASE right';
                    break;
                case 'w':
                    this.input = 'RELEASE up';
                    break;
                case 's':
                    this.input = 'RELEASE down';
                    break;
                case ' ':
                    this.input = 'RELEASE attack';
                    break;
            }
        });
        
        
        /*
        // Mobile support
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY
        });
        window.addEventListener('touchmove', e=> {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            if(swipeDistanceY < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.input = 'PRESS down';
            else if (swipeDistanceY > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                this.input = 'PRESS down';
                
            }
        });
        window.addEventListener('touchend', e => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
        });
        */
        
    }
}
