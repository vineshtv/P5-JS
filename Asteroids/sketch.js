var ship;
function setup() {
	createCanvas(windowWidth, windowHeight);
    ship = new Ship(); 
}

function draw() {
    background(0);
    ship.render();
    ship.turn();
    ship.update();
}

function keyPressed() {
    if(keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        ship.thrusting(true);
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
    
}