var ship;
var asteroids = [];
var numAsteroids = 5;
function setup() {
	createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for(var i = 0; i < numAsteroids; i++){
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);
    ship.render();
    ship.turn();
    ship.update();
    
    for(var i = 0; i < numAsteroids; i++){
        asteroids[i].render();
        asteroids[i].update();
    }
}

function keyPressed() {
    if(keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        ship.thrusting(true);
    } else if (keyCode == DOWN_ARROW) {
        ship.Applybreak(true);
    }
}

function keyReleased(){
    ship.setRotation(0);
    if(keyIsDown(LEFT_ARROW)){
        ship.setRotation(-0.1);
    }else if (keyIsDown(RIGHT_ARROW)){
        ship.setRotation(0.1);
    }
    if(!keyIsDown(UP_ARROW)){
        ship.thrusting(false);
    }
    
    if(!keyIsDown(DOWN_ARROW)){
        ship.Applybreak(false);
    }
}