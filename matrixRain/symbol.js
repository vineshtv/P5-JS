class Symbol {
    constructor(x, y, size, first, opacity) {
        this.pos = createVector(x, y);
        this.value;
        this.size = size; //ranges from 10 to 35
        //Speed is a function of size bigger==>faster
        this.speed = map(this.size, 10, 35, 5, 22);
        this.switchInterval = round(random(5, 25));
        if (this.speed > highSpeed) {
            highSpeed == this.speed;
            //console.log(highSpeed);
            //console.log(this.speed);
        }
        this.first = first;
        this.opacity = opacity;
        this.newX = 0;
    }
    
    setToRandomSymbol(){
        var charType = round(random(0,5));
        
        if((!this.value) || (frameCount % this.switchInterval == 0)){
            if(charType > 1){
                //set it to katakana
                this.value = String.fromCharCode(0x30A0 + round(random(0,96)));
            } else {
                this.value = round(random(0,9));            
            }
        }
    }
    
    update() {
        //this.pos.y = (this.pos.y >= height) ? 0 : this.pos.y += this.speed;
        if(this.pos.y >= height){
            //this.pos.y = 0;
            //if(this.leader)
            //this.pos.x = random(width);
            this.pos.y += this.speed;
        } else {
            this.pos.y += this.speed;
        }
    }
    
    render(){
        fill(0,255,70);
        textSize(this.size);
        text(this.value, this.pos.x, this.pos.y);
    }
}