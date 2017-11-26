var ship;
var asteroids = [];
var numAsteroids = 5;
var lasers = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for(var i = 0; i < numAsteroids; i++){
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);
    
    for(var i = 0; i < asteroids.length; i++){
        if(!ship.isHit){
            if(ship.hits(asteroids[i])){
                console.log("oops");
                ship.hit(true);
                //ship.hit = true;
                //ship.hitTime = millis();
            }
        }else{
            var now = millis();
            if(now - ship.hitTime > 2000){
                console.log("resetting hit")
                ship.hit(false);//ship.hit = false;
            }
        }
        asteroids[i].render();
        asteroids[i].update();
    }
    
    for(var i = lasers.length - 1; i >=0 ; i--){
        lasers[i].render();
        lasers[i].update();
        
        if(lasers[i].edgeOfSpace()){
            lasers.splice(i,1);
            break;
        }
        
        for(var j = asteroids.length - 1; j >= 0; j--){
            if(lasers[i].hits(asteroids[j])){
                console.log("hit");
                if(asteroids[j].size > 10){
                    var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                }
                asteroids.splice(j,1);
                lasers.splice(i, 1);
                break;
            }
        }
        
    }
    
    ship.render();
    ship.turn();
    ship.update();
}

function keyPressed() {
    if(key == " "){
        lasers.push(new Laser(ship.pos, ship.heading));
        //console.log(lasers.length);
    }else if(keyCode == RIGHT_ARROW){
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