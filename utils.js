export function displayStatusText(context, input){
    context.font = '40px Helvetica';
    context.textAlign = 'left';
    context.fillStyle = 'black';
    context.fillText(input, 20, 50);
    context.fillStyle = 'white';
    context.fillText(input, 22, 50);
}


export function displayMessageText(context, canvas, input){
    context.textAlign = 'center';
    context.fillStyle = 'Black';
    context.fillText(input, canvas.width/2, 200);
    context.fillStyle = 'White';
    context.fillText(input, canvas.width/2 + 2, 202);
}

export function toggleFullScreen(canvas){
    if(!document.fullscreenElement){
        canvas.requestFullscreen().catch(err => {
            alert(`Error, can't enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}


export function restartGame(player, background, enemies, score){
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    animate(0);
}

