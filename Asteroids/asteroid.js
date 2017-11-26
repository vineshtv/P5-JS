class Asteroid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D(); 
        this.size = random(15, 50);
        this.totalVertices = floor(random(5, 15));
        this.offset = [];
        for(var i = 0; i < this.totalVertices; i++){
            this.offset[i] = random(-15, 15);
        }
        
    }
    
    render() {
        this.checkEdges();
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        //console.log("rendering");
        beginShape();
        for(var i = 0; i < this.totalVertices; i++){
            var angle = map(i, 0, this.totalVertices, 0, TWO_PI);
            var r = this.size + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x,y);
        }
        endShape(CLOSE);
        //ellipse(0, 0, this.size);
        pop();
    }
    
    checkEdges() {
        if (this.pos.x > width + this.size) {this.pos.x = -this.size}
        else if (this.pos.x < 0 - this.size) {this.pos.x = width + this.size}
        
        if (this.pos.y > height + this.size) {this.pos.y = -this.size}
        else if (this.pos.y < 0 - this.size) {this.pos.y = height + this.size}
    }
    
    update() {
        this.pos.add(this.vel);
    }
}