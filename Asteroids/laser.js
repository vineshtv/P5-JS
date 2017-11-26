class Laser {
    constructor(sPos, angle) {
        this.pos = createVector(sPos.x ,sPos.y);
        this.vel = p5.Vector.fromAngle(angle);
        this.vel.mult(10);
    }
    
    render() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }
    
    edgeOfSpace() {
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
            return true;
        } else{
            return false;
        }
    }
    
    hits(asteroid){
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return(d < asteroid.size);
    }
    
    update() {
        //this.vel.mult(2);
        this.pos.add(this.vel);
    }
}
