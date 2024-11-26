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
let sm_adventure_hovered;

let sm_minigame;
let sm_minigame_hovered;

let sm_puzzle;
let sm_puzzle_hovered;

let sm_survival;   
let sm_survival_hovered;

let sm_options;
let sm_options_hovered;

let sm_help;
let sm_help_hovered;

let sm_quit;
let sm_quit_hovered;







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

  // Start Menu Buttons Hovered
  sm_adventure_hovered = loadImage("menus/startmenu/buttons/hovered/adventure.png");
  sm_minigame_hovered = loadImage("menus/startmenu/buttons/hovered/minig.png");
  sm_puzzle_hovered = loadImage("menus/startmenu/buttons/hovered/puzzle.png");
  sm_survival_hovered = loadImage("menus/startmenu/buttons/hovered/survival.png");
  
  sm_options_hovered = loadImage("menus/startmenu/buttons/hovered/options.png");
  sm_help_hovered =loadImage("menus/startmenu/buttons/hovered/help.png");
  sm_quit_hovered =loadImage("menus/startmenu/buttons/hovered/quit.png");
  


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
  displayMouseXY();//delete last
  
}

function displayBackground(){
  // image(bg_house, 0, 0); for the start of pan
  image(bg_topFence,bg_house.width,0);
  image(bg_bottomTile,bg_house.width,bg_topFence.height+lawn.height);
  image(lawnend,bg_house.width+lawn.width,0);
  image(lawn, bg_house.width, bg_topFence.height);

  // Only for camera pan
  // image(bg_road,bg_house.width+bg_topFence.width+lawnend.width, 0);


  
}


function displayMouseXY(){
  textSize(24);
  fill("yellow");
  text("X: " + mouseX + "  Y: " + mouseY, 10, 20);
}

function startMenu() {
  image(sm_background, 0, 0);
  image(sm_adventure, 391, 64); 
  image(sm_minigame,397,160);//(13,18)
  image(sm_puzzle,410,259);
  image(sm_survival,417,326);
  // image(sm_help);
  startMenuHovered();
  
}


function startMenuHovered() {
  // Adventure
  if (mouseX >= 413 && mouseX <= 731 && mouseY > 94 && mouseY < 197) {
    image(sm_adventure_hovered, 405, 64);
  }
  // Mini Game
  if (mouseX >= 407 && mouseX <= 711 && mouseY > 178 && mouseY < 263) {
    image(sm_minigame_hovered, 405, 171);
  } 
  // Puzzle
  if (mouseX >= 413 && mouseX <= 687 && mouseY > 278 && mouseY < 346) {
    image(sm_puzzle_hovered, 410, 257);
  }
  // Survival
  if (mouseX >= 420 && mouseX <= 675 && mouseY > 351 && mouseY < 409) {
    image(sm_survival_hovered, 416, 325);
  }
  // Options
  if (mouseX >= 565 && mouseX <= 640 && mouseY > 473 && mouseY < 528) {
    image(sm_options_hovered, 405, 64);
  }
  // Help
  // Quit

}


function mousePressed(){
  
}
//function startAdventure(); {game = S}