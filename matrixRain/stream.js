class Stream {
    constructor(){
        this.symbols = [];
        this.totalSymbols = round(random(5,35));
        this.size;
        this.x = random(width);
        //this.y = random(height);
        this.y = random(-1000,0);
        if(random(1) < 0.2){
            this.size = round(random(15,25));
            this.totalSymbols = round(random(5, 15));
        } else {
            this.size = round(random(7,15));
            this.totalSymbols = round(random(15,35));
        }
    }
    
    generateSymbols() {
        var opacity =  255;
        var first = (round(random(0,4)) > 1);
        
        for(var i = 0; i < this.totalSymbols; i++){
            var symbol = new Symbol(
                            this.x,
                            this.y,
                            this.size,
                            first,
                            opacity);
        
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255/this.totalSymbols)/fadeInterval;
            this.y -= this.size;
            first = false;
        }
    }
    
    outofBounds(){
        if(this.symbols[this.totalSymbols - 1].pos.y > height){
            return true;
        } else{
            return false;
        }
    }
    render(){
        for(var i = 0; i < this.totalSymbols; i++){
            var symbol = this.symbols[i];
            if(symbol.first){
                fill(200,255,200, symbol.opacity);
                //fill(255,255,255, symbol.opacity);
            } else {
                fill(0, 255, 70, symbol.opacity);
            }
            
            textSize(symbol.size);
            text(symbol.value, symbol.pos.x, symbol.pos.y);
            symbol.update();
            symbol.setToRandomSymbol();
        }
    }
}