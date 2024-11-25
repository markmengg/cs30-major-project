// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//img
let bg_house;
let bg_road;
let bg_topFence;
let bg_bottomTile;
let lawn;
let lawnend;







//(9*5 gird)
let grid = [];
const COLS = 9;
const ROWS = 5;
let gameState = "beginning";


let grid_default;
let sunGif;


function preload(){
  // Background Images
  bg_bottomTile = loadImage("bgImages/day/bottomtile.png");
  bg_house = loadImage("bgImages/day/house.png");
  bg_topFence = loadImage("bgImages/day/topFence.png");
  bg_road= loadImage("bgImages/day/road.png");
  lawn = loadImage("bgImages/day/lawn.png");
  lawnend = loadImage("bgImages/day/lawnroadinbetween.png")
  


  sunGif = loadImage("GIFs/sun.gif");


}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayBackground();
}


function displayBackground(){
  image(bg_house, 0, 0);
  image(bg_topFence,bg_house.width,0)
  image(bg_bottomTile,bg_house.width,bg_topFence.height+lawn.height)
  image(lawnend,bg_house.width+lawn.width,0)
  // image(bg_road,bg_house.width+bg_topFence.width+lawnend.width, 0)
  image(lawn, bg_house.width, bg_topFence.height)


  
}