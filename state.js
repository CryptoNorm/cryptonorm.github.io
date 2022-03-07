export const states = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    ROLLING: 3,
    ZAPPING: 4,
    FALLING: 5,
    RUNNING_LEFT: 6,
    DED: 7,
    AIRHOPPING: 8,
}

class State {
    constructor(state) {
        this.state = state;       
    }
}

////////////////////////////////////////////////////////
// STANDING STATE ///////////////////////////////////////
////////////////////////////////////////////////////////
export class Standing extends State {
    constructor(player){
        super('STANDING');
        this.player = player;
    }
    enter(){
        this.player.vx = 0;
        this.player.spriteCol = 0;
        this.player.spriteRow = 0;
        this.player.maxFrame = 5;
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS right') > -1){
            this.player.vx = this.player.speed;
            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS left') > -1){
            this.player.setState(states.RUNNING_LEFT); // running
        } else if (input.keys.indexOf('PRESS up') > -1){
            if (this.player.onGround()){
                this.player.setState(states.JUMPING); // jumping
            }
        } else if (input.keys.indexOf('PRESS down') > -1){
            this.player.setState(states.ROLLING); // rolling
        } else if (input.keys.indexOf('PRESS attack') > -1){
            this.player.setState(states.ZAPPING); // zapping
        }
        
    }
}

////////////////////////////////////////////////////////
// RUNNING STATE ///////////////////////////////////////
////////////////////////////////////////////////////////

export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.spriteCol = 0;
        this.player.spriteRow = 1;
        this.player.maxFrame = 7;
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS up') > -1){
            this.player.setState(states.AIRHOPPING);
        } else if (input.keys.indexOf('RELEASE right') > -1){
            if (this.player.vx > 0 && this.player.onGround()){
                this.player.setState(states.STANDING); // standing
            }
        } else if (input.keys.indexOf('PRESS left') > -1){
            this.player.setState(states.RUNNING_LEFT); // running
        } else if (input.keys.indexOf('RELEASE left') > -1){
            if (this.player.vx < 0 && this.player.onGround()){
                this.player.setState(states.STANDING); // standing
            }
        } else if (input.keys.indexOf('PRESS up') > -1){
            if (this.player.onGround()){
                this.player.setState(states.JUMPING); // jumping
            }
        } else if (input.keys.indexOf('PRESS down') > -1){
            this.player.setState(states.ROLLING); // rolling
        } else if (input.keys.indexOf('PRESS attack') > -1){
            this.player.setState(states.ZAPPING); // zapping
        }
    }
}

export class RunningLeft extends State {
    constructor(player){
        super('RUNNING_LEFT');
        this.player = player;
    }
    enter(){
        this.player.spriteCol = 0;
        this.player.spriteRow = 6;
        this.player.maxFrame = 7;
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS left') > -1){
            this.player.vx = -this.player.speed;
            this.player.setState(states.RUNNING_LEFT); // running
        } else if (input.keys.indexOf('PRESS right') > -1){
            this.player.setState(states.RUNNING);
        } else if (input.keys.indexOf('RELEASE right') > -1){
            if (this.player.vx > 0 && this.player.onGround()){
                this.player.setState(states.STANDING); // standing
            }
        } else if (input.keys.indexOf('RELEASE left') > -1){
            if (this.player.vx < 0 && this.player.onGround()){
                this.player.setState(states.STANDING); // standing
            }
        } else if (input.keys.indexOf('PRESS up') > -1){
            if (this.player.onGround()){
                this.player.setState(states.JUMPING); // jumping
            }
        } else if (input.keys.indexOf('PRESS down') > -1){
            this.player.setState(states.ROLLING); // rolling
        } else if (input.keys.indexOf('PRESS attack') > -1){
            this.player.setState(states.ZAPPING); // zapping
        }
    }
}

////////////////////////////////////////////////////////
// JUMPING STATE ///////////////////////////////////////
////////////////////////////////////////////////////////

export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        this.player.vy = -25;
        this.player.y -= 1;
        this.player.spriteCol = 0;
        this.player.spriteRow = 2;
        this.player.maxFrame = 0;
        this.handleJumpEvent();
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS right') > -1){
            this.player.vx = this.player.speed;
//            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS left') > -1){
            this.player.vx = -this.player.speed;
            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS attack') > -1){
            this.player.setState(states.ZAPPING); // zapping
        } else if (input.keys.indexOf('RELEASE attack') > -1){
            this.player.setState(states.FALLING);
        } else if (input.keys.indexOf('RELEASE right') > -1){
            this.player.vx = this.player.speed;
            this.player.setState(states.STANDING); // running
        } 
    }
    handleJumpEvent(){  
        if (this.player.vy < this.player.gravity) {
            requestAnimationFrame(this.handleJumpEvent.bind(this));
        } else {
            this.player.setState(states.FALLING); // Falling
        }
    }
}

export class AirHopping extends State {
    constructor(player){
        super('AIRHOPPING');
        this.player = player;
    }
    enter(){
        this.player.vy = -25;
        this.player.y -= 1;
        this.player.spriteCol = 0;
        this.player.spriteRow = 2;
        this.player.maxFrame = 0;
        this.handleJumpEvent();
    };
    handleInput(input){        
        if (input.keys.indexOf('PRESS right') > -1){
            this.player.vx = this.player.speed;
            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS left') > -1){
            this.player.vx = -this.player.speed;
            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS attack') > -1){
            this.player.setState(states.ZAPPING); // zapping
        } else if (input.keys.indexOf('RELEASE attack') > -1){
            this.player.setState(states.FALLING);
        } else if (input.keys.indexOf('RELEASE right') > -1){
            this.player.vx = this.player.speed;
            this.player.setState(states.STANDING); // running
        } 
    }
    handleJumpEvent(){  
        if (this.player.vy < this.player.gravity) {
            requestAnimationFrame(this.handleJumpEvent.bind(this));
        } else {
            this.player.setState(states.FALLING); // Falling
        }
    }
}

////////////////////////////////////////////////////////
// ROLLING STATE ///////////////////////////////////////
////////////////////////////////////////////////////////

export class Rolling extends State {
    constructor(player){
        super('ROLLING');
        this.player = player;
    }
    enter(){
        this.player.vx = this.player.speed * 5;
        this.player.spriteCol = 0;
        this.player.spriteRow = 3;
        this.player.maxFrame = 4;
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS up') > -1){
            this.player.setState(states.JUMPING); // jumping
        } else if (input.keys.indexOf('RELEASE down') > -1){
            this.player.setState(states.STANDING); // standing
        }
    }
}

////////////////////////////////////////////////////////
// FALLING STATE ///////////////////////////////////////
////////////////////////////////////////////////////////

export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.spriteCol = 0;
        this.player.spriteRow = 3;
        this.player.maxFrame = 2;
        this.handleFalling();
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS right') > -1){
            this.player.vx = this.player.speed;
        } else if (input.keys.indexOf('PRESS down') > -1){
           console.log('trying to dive');
        } else if (input.keys.indexOf('PRESS attack') > -1){
            this.player.setState(states.ZAPPING); // zapping
        }
    }
    handleFalling(){
        if (!this.player.onGround()){
            requestAnimationFrame(this.handleFalling.bind(this));
        } else {
            this.player.setState(states.STANDING); // standing
        }
    }
}

////////////////////////////////////////////////////////
// ZAPPING STATE ///////////////////////////////////////
////////////////////////////////////////////////////////
export class Zapping extends State {
    constructor(player){
        super('ZAPPING');
        this.player = player;
    }
    enter(){
        this.player.vx = 0;
        this.player.spriteCol = 0;
        this.player.spriteRow = 4;
        this.player.maxFrame = 0;
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS right') > -1){
            this.player.vx = this.player.speed;
            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS left') > -1){
            this.player.vx = -this.player.speed;
            this.player.setState(states.RUNNING); // running
        } else if (input.keys.indexOf('PRESS up') > -1){
            if (this.player.onGround()){
                this.player.setState(states.JUMPING); // jumping
            }
        } else if (input.keys.indexOf('PRESS down') > -1){
            this.player.setState(states.ROLLING); // rolling
        } else if (input.keys.indexOf('RELEASE attack') > -1){
            this.player.setState(states.STANDING); // zapping
        }
        
    }
}

export class Ded extends State {
    constructor(player){
        super('DED');
        this.player = player;
    }
    enter(){
        this.player.spriteCol = 0;
        this.player.spriteRow = 7;
        this.player.maxFrame = 5;
        this.handleFalling();
    };
    handleInput(input){
        if (input.keys.indexOf('PRESS attack') > -1){
           console.log('Start Over');
        }
    }
    handleFalling(){
        if (!this.player.onGround()){
            requestAnimationFrame(this.handleFalling.bind(this));
        } else {
            this.player.setState(states.DED); // standing
        }
    }
}
