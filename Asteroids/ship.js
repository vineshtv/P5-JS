class Ship {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector(0,0);
        this.size = 20;
        this.heading = 0;
        this.rotation = 0;
        this.isThrusting = false;
        this.resistance = 0.99;
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
        force.mult(0.15);
        this.vel.add(force);
    }
    
    thrusting(b) {
        this.isThrusting = b;
    }
    
    render() {
        this.checkEdges();
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI/2);
        stroke(255);
        noFill();
        triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
        if (this.isThrusting){
            fill(255,0,0, 150);
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