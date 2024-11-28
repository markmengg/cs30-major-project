// Plants vs. Zombies
// Mark Meng and Michael Zhu
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
  else if (gameState === "adventureStart") {
    displayBackground();
  }
  //displayBackground();
  displayMouseXY();//delete last
  
}

function displayBackground() {
  
  image(bg_house, 0, 0); // Start of pan
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
  imageResize()
  image(sm_background, (width-sm_background.width)/2, 0);
  startMenuHovered();
  
}

function imageResize(){
  sm_background.resize(height/3*4,height);
}




function startMenuHovered() {
  // Adventure Button
  if (mouseX >= 413 && mouseX <= 731 && mouseY > 94 && mouseY < 176) {
    image(sm_adventure_hovered, 405, 64);
  }
  // Mini Game Button
  if (mouseX >= 407 && mouseX <= 711 && mouseY > 178 && mouseY < 263) {
    image(sm_minigame_hovered, 405, 171);
  } 
  // Puzzle Button
  if (mouseX >= 413 && mouseX <= 687 && mouseY > 278 && mouseY < 346) {
    image(sm_puzzle_hovered, 410, 257);
  }
  // Survival Button
  if (mouseX >= 420 && mouseX <= 675 && mouseY > 351 && mouseY < 409) {
    image(sm_survival_hovered, 416, 325);
  }
  // Options Button
  if (mouseX >= 565 && mouseX <= 640 && mouseY > 473 && mouseY < 528) {
    image(sm_options_hovered, 551, 427);
  }
  // Help Button
  if (mouseX >= 650 && mouseX <= 698 && mouseY > 492 && mouseY < 550) {
    image(sm_help_hovered, 637, 412);
  }
  // Quit Button
  if (mouseX >= 705 && mouseX <= 770 && mouseY > 470 && mouseY < 550) {
    image(sm_quit_hovered, 702, 441);
  }
}


function mouseReleased(){
  if (gameState === "start"){
    if (mouseX >= 413 && mouseX <= 731 && mouseY > 94 && mouseY < 176) {
      gameState = "adventureStart";
    }
    // Game modes part of needs to have
    // if (mouseX >= 407 && mouseX <= 711 && mouseY > 178 && mouseY < 263){
    //   gameState = "minigameStart";
    if (mouseX >= 705 && mouseX <= 770 && mouseY > 470 && mouseY < 550) {
      window.close();
    }
  }
}


