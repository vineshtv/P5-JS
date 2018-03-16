let option = 1;
let prevOption = 0;
let area = 0;
let equation = '';
function setup() {
	createCanvas(400, 400);
}

function drawCircle(){
    stroke(255, 230, 100);
    fill(255, 230, 100);
    if (option == 1){
        let d = width; 
        ellipse(d/2, d/2, d, d);
        area = 3.14 * (d/2) * (d/2);
        equation = '1 * PI * r * r = PI * r * r';
    }
    if (option == 2){
        let d = width/2;
        ellipse(d/2    , d/2    , d, d);
        ellipse(d/2 + d, d/2    , d, d);
        ellipse(d/2    , d/2 + d, d, d);
        ellipse(d/2 + d, d/2 + d, d, d);
        area = 4 * 3.14 * (d/2) * (d/2);
        equation = '4 * PI * (r/2) * (r/2) = PI * r * r';
    }
    if(option == 3){
        let d = width/4;
        ellipse(d/2          , d/2          , d, d);
        ellipse(d/2 + d      , d/2          , d, d);
        ellipse(d/2 + (2 * d), d/2          , d, d);
        ellipse(d/2 + (3 * d), d/2          , d, d);
        
        ellipse(d/2          , d/2 + d      , d, d);
        ellipse(d/2 + d      , d/2 + d      , d, d);
        ellipse(d/2 + (2 * d), d/2 + d      , d, d);
        ellipse(d/2 + (3 * d), d/2 + d      , d, d);
        
        ellipse(d/2          , d/2 + (2 * d), d, d);
        ellipse(d/2 + d      , d/2 + (2 * d), d, d);
        ellipse(d/2 + (2 * d), d/2 + (2 * d), d, d);
        ellipse(d/2 + (3 * d), d/2 + (2 * d), d, d);
        
        ellipse(d/2          , d/2 + (3 * d), d, d);
        ellipse(d/2 + d      , d/2 + (3 * d), d, d);
        ellipse(d/2 + (2 * d), d/2 + (3 * d), d, d);
        ellipse(d/2 + (3 * d), d/2 + (3 * d), d, d);
        
        area = 16 * 3.14 * (d/2) * (d/2);
        equation = '16 * PI * (r/4) * (r/4) = PI * r * r'
    }
}

function draw() {
    background(255);
    //stroke(0);
    //noFill();
    //rect(0, 0, width - 1, height - 1);
    drawCircle();
    if(prevOption != option){
        prevOption = option;
        createP('Total pie area = ' + area);
        createP('' + equation);
        createP('Press SPACE to toggle');
    } 
}

function keyPressed(){
    if(key == ' '){
        removeElements();
        if(option == 3){
            option = 1;
        } else{
            option++;
        }
    }
}