class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.tailLength = 0;
        this.tail = [];
    }
    
    update(){
        for(var i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i + 1];
        }
        
        if (this.tailLength > 0){
            this.tail[this.tailLength - 1] = createVector(this.x, this.y);
        }
        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;
        //this.pos.add(this.vel);
        
    }
    
    death() {
        for(var i = 0; i < this.tail.length; i++){
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1){
                gameOver = true;
            }
        }
    }
    
    render() {
        push()
        fill(255);
        //stroke(0);
        noStroke();
        //console.log("printing");
        for(var i = 0; i < this.tailLength; i++){
            rect(this.tail[i].x, this.tail[i].y, snakeSize, snakeSize);
        }
        fill(255,0,0,100);
        rect(this.x, this.y, snakeSize, snakeSize);
        pop();
    }
    
    eat(food) {
        var foodActualX = food.x + border;
        var foodActualY = food.y + border;
        var d = dist(this.x, this.y, foodActualX, foodActualY);
        if(d < 1){
            this.tailLength++;
            //score++;
            return true;
        } else {
            return false;
        }
    }
    checkBorder() {
        if(this.x < border || 
           this.x >= width - border ||
           this.y < border ||
           this.y >= height - border){
            gameOver = true;
            this.xSpeed = 0;
            this.ySpeed = 0;
        }
    }
}