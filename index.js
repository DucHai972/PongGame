const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const reset = document.querySelector("#res");
const play = document.querySelector("#play");
var audio = new Audio('backGroundSong.mp3');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const paddleColor = "white";
const ballColor = "white";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth/2;
let ballY = gameHeight/2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 10,
    y: 10
};

let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25 - 10,
    y: gameHeight - 100 - 10
};

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

loadgame();

function loadgame(){
    play.addEventListener("click", () =>  {
        audio.play();
        play.style.visibility = "hidden";
        gameStart();
    });
}

function gameStart(){
    clearBoard();
    drawPaddles();
    createBall();
    nextTick();
};

function nextTick(){
    intervalID = setTimeout(() =>  {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        updateScore();
        nextTick();
    }, 10);
};
function clearBoard(){
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, gameWidth, gameHeight);
    ctx.lineWidth = 1;
};
function drawPaddles(){
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

function createBall(){
    ballSpeed = 1;
    let rand = Math.floor(Math.random()*4) + 1;
    if(rand%2 == 0)
        ballXDirection = 1;
    else ballXDirection = -1;

    let rand2 = Math.floor(Math.random()*2) + 1;
    if(rand2 == 1)
        ballYDirection = 1;
    else ballYDirection = -1;

    ballX = gameWidth/2;
    ballY = gameHeight/2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    ctx.fillStyle = "white";
    ctx.fillStroke = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(ballY <= 0 + ballRadius + 10)  {
        ballYDirection *= -1;
        return;
    }
    if(ballY >= gameHeight - ballRadius - 10)  {
        ballYDirection *= -1;
        return;
    }
    if(ballX <= 0 + ballRadius + 10)  {
        ballXDirection *= -1;
        player2Score += 1;
        ballSpeed = 1;
        return;
    }
    if(ballX >= gameWidth - ballRadius - 10)  {
        ballXDirection *= -1;
        player1Score += 1;
        ballSpeed = 1;
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + ballRadius))  {
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height)  {
            ballX = paddle1.x + ballRadius + paddle1.width;
            ballXDirection *= -1;
            ballSpeed += 0.5;
        }
    }

    if(ballX >= (paddle2.x - ballRadius))  {
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height)  {
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed += 0.5;
        }
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed)  {
        case(paddle1Up):
            if(paddle1.y - paddleSpeed < 0)
                break;
            paddle1.y -= paddleSpeed;
            break;
        case(paddle1Down):
            if(paddle1.y >= gameWidth - 10 - paddle1.height)
                break;
            paddle1.y += paddleSpeed;
            break;
        case(paddle2Up):
            if(paddle2.y - paddleSpeed < 0)
                break;
            paddle2.y -= paddleSpeed;
            break;
        case(paddle2Down):
            if(paddle2.y >= gameWidth - 10 - paddle2.height)
                break;
            paddle2.y += paddleSpeed;
            break;
    }
};
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 10,
        y: 10
    };
    
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25 - 10,
        y: gameHeight - 100 - 10
    };
};
