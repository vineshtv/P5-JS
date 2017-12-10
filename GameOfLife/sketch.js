let cells = [];
var rows, cols;
var cellSize = 10;
var started = false;
var rand = false;

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
    rows = floor(width/cellSize);
    cols = floor(height/cellSize);
    
    for(var j = 0; j <  rows; j++){
        for(var i = 0; i < cols; i++){
            cells.push(new Cell(i, j));
        }
    }
}

function resetGol(){
    started = false;
    rand = false;
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
            console.log(clickedX, clickedY);
            var ind = getIndex(clickedX, clickedY);
            if(ind != -1){
                cells[ind].click();
            }
        }
    }
}