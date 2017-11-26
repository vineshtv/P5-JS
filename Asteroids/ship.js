class Ship {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector(0,0);
        this.size = 20;
        this.heading = 0;
        this.rotation = 0;
        this.isThrusting = false;
        this.resistance = 0.99;
        this.health = 1;
        this.isHit = false;
    }
    
    update() {
        if(this.isThrusting){
            this.thrust();
        }
        this.pos.add(this.vel);
        this.vel.mult(this.resistance);
    }
    
    Applybreak(b) {
        if(b){
            this.resistance = 0.95;
        }else {
            this.resistance = 0.99;
        }
    }
    
    thrust() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.10);
        this.vel.add(force);
    }
    
    thrusting(b) {
        this.isThrusting = b;
    }
    
    hits(asteroid){
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return(d < this.size + asteroid.size);
    }
    
    hit(b){
        if(b){
            this.isHit = true;
            this.health -= 0.2;
            this.hitTime = millis();
        }else{
            this.isHit = false;
        }
    }
    
    render() {
        this.checkEdges();
        push();
        var red = color(255,0,0);
        var green = color(0,255,0);
        var col = lerpColor(red, green, this.health);
        var strokeCol = 255;
        if(this.isHit){
            strokeCol = red;
        }
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI/2);
        stroke(strokeCol);
        fill(col);
        triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
        if (this.isThrusting){
            fill(255,0,0, 150);
        }else{
            fill(0);
        }
        rect(-this.size/2 , this.size, this.size, this.size/4);
        pop();
    }
    
    setRotation(angle) {
        this.rotation = angle;
    }
    
    checkEdges() {
        if (this.pos.x > width + this.size) {this.pos.x = -this.size}
        else if (this.pos.x < 0 - this.size) {this.pos.x = width + this.size}
        
        if (this.pos.y > height + this.size) {this.pos.y = -this.size}
        else if (this.pos.y < 0 - this.size) {this.pos.y = height + this.size}
    }
    
    turn() {
        this.heading += this.rotation;
    }
}