var symbols = [];
var highSpeed = 0;
var fadeInterval = 1.6;
var numStreams = 150;
var streams = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
    for(var i = 0; i < numStreams; i++){
        var stream = new Stream();
        stream.generateSymbols();
        streams.push(stream);
    }
    smooth();
    /*
    for(var i = 0; i < 50; i++){
        var size;
        if(random(1) < 0.25){
            size = round(random(25,35));
        } else {
            size = round(random(10,25));
        }
        var newSym = new Symbol(random(width), random(height), size);
        newSym.setToRandomSymbol();
        symbols.push(newSym);
    }
    */
}

function draw() {
    background(0,150);
    for(var i = streams.length - 1; i >= 0; i--){
        streams[i].render();
        if(streams[i].outofBounds()){
            streams.splice(i,1);
            var stream = new Stream();
            stream.generateSymbols();
            streams.push(stream);
        }
    }
    //background(0);
    /*
    for(var i = 0; i < symbols.length; i++){
        symbols[i].update();
        symbols[i].render();
        symbols[i].setToRandomSymbol();
    }
    */
}