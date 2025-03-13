var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

var box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = { 
    x: Math.floor(Math.random() * (canvas.width / box)) * box, 
    y: Math.floor(Math.random() * (canvas.height / box)) * box 
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "#f5f5dc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lightgreen";
        ctx.fillRect(part.x, part.y, box, box);
    });

    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || 
        snake.some(part => part.x === head.x && part.y === head.y)) {
        alert("game over!");
        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT";
    }

    snake.unshift(head);
}

setInterval(draw, 100);
