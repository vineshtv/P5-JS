let cells = [];
var rows, cols;
var cellSize = 10;
var started = false;
var rand = false;
var createGosper = false;
var gosperGunEncoding = [301, 302, 361, 362, 311, 371, 431, 252, 193, 194, 492, 553, 554, 375, 256, 317, 378, 437, 496, 377, 321, 261, 201, 202, 262, 322, 143, 383, 85, 145, 385, 445, 215, 216, 276, 275];

function setup() {
    //frameRate(5);
	createCanvas(601, 601);
    
    button = createButton('START');
    button.position(0, height + 30);
    button.mousePressed(startGol);
    
    randomButton = createButton('RANDOM');
    randomButton.position(70, height + 30);
    randomButton.mousePressed(startRandom);
    
    resetButton = createButton('RESET');
    resetButton.position(150, height + 30);
    resetButton.mousePressed(resetGol);
    
    gosperButton = createButton('Gosper Gun');
    gosperButton.position(220, height + 30);
    gosperButton.mousePressed(gosper);
    
    rows = floor(width/cellSize);
    cols = floor(height/cellSize);
    
    for(var j = 0; j <  rows; j++){
        for(var i = 0; i < cols; i++){
            cells.push(new Cell(i, j));
        }
    }
}

function gosper(){
    started = false;
    rand = false;
    resetGol();
    for(var i = 0; i < gosperGunEncoding.length; i++){
        cells[gosperGunEncoding[i]].alive = true;
    }
    started = true;
}

function resetGol(){
    started = false;
    rand = false;
    gosper = false;
    for(var i = 0; i < cells.length; i++){
        cells[i].alive = false;
    }
}

function startGol()
{
    started = true;
    console.log("started");
}

function startRandom()
{
    rand = true;
    console.log("random Start");
}

function draw() {
    background(200);
    for(var i = 0; i < cells.length; i++){
        cells[i].show();
    }
    
    if(rand){
        for(var i = 0; i < cells.length; i++){
            cells[i].alive = (random(1) < 0.5);
        }
        started = true;
        rand = false;
    }
    
    if(started){
        var newCells = [];
        for(var j = 0; j < rows; j++){
            for(var i = 0; i < cols; i++){
                newCells.push(new Cell(i, j, cells[getIndex(i, j)].stayingAlive()));
            }
        }
        
        
        cells = newCells;
    }
}

function getIndex(x, y){
    if(x < 0 || x > cols - 1 || y < 0 || y > rows - 1){
        return -1;
    } else{
        return(x + y * cols);
    }
}

function mousePressed(){
    if(!started){
        if(mouseX < width && mouseY < height){
            var clickedX = floor(mouseX/cellSize);
            var clickedY = floor(mouseY/cellSize);
            //console.log(clickedX, clickedY);
            var ind = getIndex(clickedX, clickedY);
            if(ind != -1){
                console.log(ind);
                cells[ind].click();
            }
        }
    }
}