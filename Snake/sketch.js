var border = 20;
var snakeSize = 10;
var scl = 10;
var snake;
var gameOver = false;
var food;
var rows;
var cols;
var score = 0;
var fruitPresent = false;
var fruit;
var fruitAge;

function setup() {
	createCanvas(500 + 2 * border, 500 + 2* border);
    snake = new Snake(width/2, height/2);
    frameRate(15);
    cols = floor((width - 2*border)/scl);
    rows = floor((width - 2*border)/scl);
    
    generateFood();
    //snakeSize = 
}

function generateFood(){
    //console.log(rows, cols);
    food = createVector(floor(random(rows)), floor(random(cols)));
    //food = createVector(49, 49);
    food.mult(scl);
}

function generateFruit(){
    //console.log(rows, cols);
    fruit = createVector(floor(random(rows)), floor(random(cols)));
    //food = createVector(49, 49);
    fruit.mult(scl);
    fruitAge = millis();
    fruitPresent = true;
}

function printScore(){
    push();
    fill(255);
    //drawingContext.font = 'normal 15px courier';
    drawingContext.font = 'normal 13px verdana';
    noStroke();
    text(score, width/2, height - 6);
    pop();
}

function draw() {
    background(51);
    if(gameOver){
        push();
        fill(255);
        textSize(50);
        textAlign(CENTER,CENTER);
        text("GAME OVER", width/2, height/2);
        
        //textSize(20);
        //push();
        drawingContext.font = 'normal 10px courier';
        noStroke();
        text("Press SPACE to restart", width/2, height - 30);
        pop();
    }
    
    printScore();
    if(!fruitPresent){
        if(random(1) < 0.01){
            generateFruit();
        }
    } else{
        var now = millis();
        if(now - fruitAge > 4000){
            fruitPresent = false;
        }
    }
    
    stroke(255);
    noFill();
    rect(border, border, width - 2 * border, height - 2 * border);
    if(snake.eat(food)){
        score++;
        generateFood();
    }
    
    if(fruitPresent){
        if(snake.eat(fruit)){
            score += 5;
            fruitPresent = false;
        }
    }
    
    if(!gameOver){
        snake.update();
        snake.death();
        snake.checkBorder();
    }
    snake.render();
    
    push();
    translate(border, border);
    fill(0, 255, 70);
    noStroke();
    rect(food.x, food.y, scl, scl);
    if(fruitPresent){
        fill(255,255,0);
        rect(fruit.x, fruit.y, scl,scl);
    }
    pop();
    
}

function keyPressed() {
    if(!gameOver){
        if(keyCode == UP_ARROW){
            snake.xSpeed = 0;
            snake.ySpeed = -1;
        } else if (keyCode == DOWN_ARROW) {
            snake.xSpeed = 0;
            snake.ySpeed = 1;
        } else if (keyCode == RIGHT_ARROW) {
            snake.xSpeed = 1;
            snake.ySpeed = 0;
        } else if (keyCode == LEFT_ARROW) {
            snake.xSpeed = -1;
            snake.ySpeed = 0;
        }
    }
    else {
        if(key == ' '){
            gameOver = false;
            score = 0;
            generateFood();
            snake = new Snake(width/2, height/2);
        }
    }
}