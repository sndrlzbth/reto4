//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

// barplayer
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 20;

let player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
}

// ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 2;
let ballVelocityY = 1;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

// Bloques
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 7;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Inicio player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);

    // Añadimos el event listener para el teclado
    document.addEventListener("keydown", movePlayer);

    // Crear bloques
    createblocks();
}

function update() {
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Dibujamos el jugador de nuevo
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Dibujamos la pelota
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if(topCollision(ball, player || bottomCollision(ball, player))){
        ball.velocityY *= -1;
    }else if(leftCollision(ball, player) || rightCollision(ball, player)){
        ball.velocityX *= -1;
    }

    if(ball.y <= 0){
        ball.velocityY *= -1;
    }else if(ball.x <= 0 || (ball.x + ball.width) >= boardWidth){
        ball.velocityX *= -1;
    }else if(ball.y + ball.height >= boardHeight){
        // game over
        context.font = "15px sans-serif";
        context.fillText("Juego Terminado: Presiona la tecla 'Espacio' para reiniciar", 80, 400);
        gameOver = true;
    }

    

    // Dibujamos los bloques
    context.fillStyle = "plum";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                score += 100;
                blockCount -= 1;
            }
            else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1;
                score += 100;
                blockCount -= 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    if (blockCount == 0) {
        score += 100*blockRows*blockColumns;
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createblocks();
    }

    //score
    context.font = "15px sans-serif";
    context.fillText(score, 10, 25);
}

function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space") {
            resetGame();
            console.log("RESET");
        }
        return;
    }
    if(e.code == "ArrowLeft"){
        // Calculamos la nueva posición del jugador a la izquierda
        let nextPlayerX = player.x - player.velocityX;
        if(!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX;
        }
    } else if(e.code == "ArrowRight"){
        // Calculamos la nueva posición del jugador a la derecha
        let nextPlayerX = player.x + player.velocityX;
        if(!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX;
        }
    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function topCollision(ball,block){
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball,block){
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball,block){
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball,block){
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createblocks(){
    blockArray = [];
    for(let i = 0; i < blockColumns; i++){
        for(let j = 0; j < blockRows; j++){
            let block = {
                x : blockY + i*blockWidth + i*10,
                y : blockX + j*blockHeight + j*10,
                width: blockWidth,
                height: blockHeight,
                break: false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY
    }
    blockArray = [];
    blockRows = 3;
    score = 0;
    createblocks();
}