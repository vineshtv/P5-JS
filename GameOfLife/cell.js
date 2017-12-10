class Cell {
    constructor(i, j, alive=false){
        this.i = i;
        this.j = j;
        
        
        this.alive = alive;
        
        this.neighborIndices = [this.index(i - 1, j - 1),
                                this.index(i, j -1),
                                this.index(i + 1, j -1),
                                this.index(i + 1, j),
                                this.index(i + 1, j + 1),
                                this.index(i, j + 1),
                                this.index(i - 1, j + 1),
                                this.index(i - 1, j)
                               ]
    }
    
    show(){
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        
        stroke(0);
        if(this.alive){
            fill(0);
        } else{
            fill(255);
        }
        
        rect(x, y , cellSize, cellSize);
    }
    
    click(){
        this.alive = true;
    }
    
    index(x, y){
        if(x < 0 || x > cols - 1 || y < 0 || y > rows - 1){
            return -1;
        } else{
            return(x + y * cols);
        }
    }
    
    stayingAlive(){
        var count = 0;
        for(var i = 0; i < this.neighborIndices.length; i++){
            if(this.neighborIndices[i] != -1 && cells[this.neighborIndices[i]].alive){
                count++;
            }
        }
        
        if(count < 2 || count > 3){
            return false;
        }
        
        if(count == 3){
            return true;
        }
        
        return this.alive;
    }
}