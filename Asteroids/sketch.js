var ship;
var asteroids = [];
var numAsteroids = 5;
var lasers = [];
var gameOver = false;
var life = 5;
var score = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for(var i = 0; i < numAsteroids; i++){
        asteroids.push(new Asteroid());
    }
}

function drawHealth() {
    push();
    //translate(0, 10);
    for(var i = 0; i < 5; i++){
        translate(10,0);
        stroke(255,0,0);
        if(ship.health >= i + 1){
            fill(255,0,0);
        }else{
            fill(0);
        }
        rect(10,10,10,10);
        translate(10, 0);
    }
    pop();
    
}

function printScore(){
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("SCORE : " + score, 10, height - 20);
}

function draw() {
    background(0);
    
    if(gameOver){
        console.log("GAME OVER");
        fill(255);
        //stroke(255);
        //ellipse(width/2, height/2, 20, 20);
        textSize(100);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width/2, height/2);
    }
    
    drawHealth();
    printScore();
    
    if(random(1) < 0.0009){
        asteroids.push(new Asteroid());
    }
    
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
                score++;
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
    if(!gameOver){
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
}

function keyReleased(){
    if(!gameOver){
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
}