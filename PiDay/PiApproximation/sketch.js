let r = 300;
let pi = 0;
let totalPoints = 0;
let pointsInsideCircle = 0;
let actualPi = Math.PI;
let bestPi = Infinity;
let bestDiff = Infinity;

function setup() {
	createCanvas(2 * r, 2 * r);
    background(51);
    stroke(255);
    noFill();
    //ellipse(width/2, height/2, 2*r);
    console.log(actualPi);
    createP("Best Pi Approximation = " + bestPi);
}

function calculatePi(){
    // PI/4 = pointsInsideCircle/totalPoints
    // ==> PI = (pointsInsideCircle/points.length) * 4
    
    pi = (pointsInsideCircle / totalPoints) * 4;
    let diff = (Math.abs(actualPi - pi));
    if (diff < bestDiff){
        bestDiff = diff;
        bestPi = pi;
        console.log("diff = ", bestDiff);
        removeElements();
        createP("Best Pi Approximation = " + bestPi);
        //console.log(bestPi);
    }
}


function draw() {
    for(let i = 0; i < 10000; i++){
        let x = random(width);
        let y = random(height);
        totalPoints++;
        stroke(255,0,0,100);
        if((dist(width/2, height/2, x, y)) <= r){
            pointsInsideCircle++;
            stroke(0,255,0,100);
        }
        point(x,y);
    }
    calculatePi();
}