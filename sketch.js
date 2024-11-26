// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Images

// Background Images
let bg_house;
let bg_road;
let bg_topFence;
let bg_bottomTile;

let lawn;
let lawnend;

// Start Menu Images
let sm_background;

let sm_adventure;
let sm_minigame;
let sm_puzzle;
let sm_survival;   

let sm_options;
let sm_help;
let sm_quit;







//(9*5 gird)
let grid = [];
const COLS = 9;
const ROWS = 5;
let gameState = "start";


let grid_default;
let sunGif;

// Start Screen Buttons
let adventureButton;
let minigButton;
let puzzleButton;
let survivalButton;
let optionsButton;
let helpButton;
let quitButton;

function preload(){
  // Background Images
  bg_bottomTile = loadImage("bgImages/day/bottomtile.png");
  bg_house = loadImage("bgImages/day/house.png");
  bg_topFence = loadImage("bgImages/day/topFence.png");
  bg_road= loadImage("bgImages/day/road.png");
  lawn = loadImage("bgImages/day/lawn.png");
  lawnend = loadImage("bgImages/day/lawnroadinbetween.png");
  
  // Start Menu
  sm_background = loadImage("menus/startmenu/bg.png");

  sm_adventure = loadImage("menus/startmenu/buttons/adventure.png");
  sm_minigame = loadImage("menus/startmenu/buttons/minig.png");
  sm_puzzle = loadImage("menus/startmenu/buttons/puzzle.png");
  sm_survival = loadImage("menus/startmenu/buttons/survival.png");
  
  sm_options = loadImage("menus/startmenu/buttons/options.png");
  sm_help =loadImage("menus/startmenu/buttons/help.png");
  sm_quit =loadImage("menus/startmenu/buttons/quit.png");



  sunGif = loadImage("GIFs/sun.gif");


}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (gameState === "start") {
    startMenu();
  }
  else if (gameState === "game") {
    displayBackground();
  }
  //displayBackground();
  mousexy();//delete last
}

function displayBackground(){
  image(bg_house, 0, 0);
  image(bg_topFence,bg_house.width,0);
  image(bg_bottomTile,bg_house.width,bg_topFence.height+lawn.height);
  image(lawnend,bg_house.width+lawn.width,0);
  image(lawn, bg_house.width, bg_topFence.height);

  // Only for camera pan
  // image(bg_road,bg_house.width+bg_topFence.width+lawnend.width, 0);


  
}


function mousexy(){
  textSize(24);
  fill("yellow");
  text("X: " + mouseX + "  Y: " + mouseY, 10, 20);
}

function startMenu() {
  
  image(sm_background, 0, 0);

  image(sm_adventure, 391, 64); 

}