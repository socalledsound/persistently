const NUM_ACROSS = 10;
const NUM_DOWN = 10;
const GRID_WIDTH = 800;
const GRID_HEIGHT = 800;
const CIRCLE_WIDTH = GRID_WIDTH/NUM_ACROSS;
const CIRCLE_HEIGHT = GRID_HEIGHT/NUM_DOWN;

let images = [];
let imageCircles = [];


function preload(){

}



function setup(){

    createCanvas(GRIDWIDTH, GRIDHEIGHT, WEBGL);
    noStroke();
}

function draw(){

    if(imageCircles.length > 0){
        imageCircles.forEach(imageCircle => {
            imageCircle.update();
            imageCircle.display();
        })
    }
}


function initCircles(imgArray){
    let counter = 0;
    let rowCounter = 0;
    imgArray.forEach((img,i) => {   
        const x = (i % NUM_ACROSS) * CIRCLE_WIDTH;
        const y = rowCounter * CIRCLE_HEIGHT;
        
        imageCircles.push(new ImageCircle(img, x, y, CIRCLE_WIDTH, CIRCLE_HEIGHT))

        if(counter > NUM_ACROSS){
            counter = 0;
            rowCounter ++
        } else {
            counter++
        }
    })
}


//take image paths from firestore and load them into buffers
function loadImages(){

    //load images here; do I need to do this without p5?

    initCircles(images)
}