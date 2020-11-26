class ImageCircle{
    constructor(img, x, y, size){
        this.img = img;
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotateSpeed = random(0.001, 0.1);
        this.theta = 0;
    }

    display(){
        push();
        rotateY(this.theta);
        rotateZ(this.theta/2);
        texture(this.img);
        ellipse(this.x, this.y, this.size);
        pop();
    }

    update(){
        this.theta += this.rotateSpeed;
    }
}