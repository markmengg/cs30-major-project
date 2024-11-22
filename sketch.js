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
  let bottomTileX = bg_house.width;
  let bottomTileY = bg_house.height - bg_bottomTile.height;
  image(bg_bottomTile, bottomTileX, bottomTileY);
  let roadX = bottomTileX + bg_bottomTile.width;
  image(bg_road, roadX, 0);

  image(bg_topFence, bottomTileX, 0);
  let lawnY = bg_topFence.height;
  image(lawn,bottomTileX,lawnY);
  // image()
}