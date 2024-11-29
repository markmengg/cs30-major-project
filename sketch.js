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
let lawnmower

// Start Menu Images
let sm_background;
let sm_adventure_hovered;
let sm_minigame_hovered;
let sm_puzzle_hovered;
let sm_survival_hovered;
let sm_options_hovered;
let sm_help_hovered;
let sm_quit_hovered;

// Grid (9x5)
let grid = [];
const COLS = 9;
const ROWS = 5;
let gameState = "start";




function preload() {
  // Load images
  bg_house = loadImage("bgImages/day/house.png");
  bg_topFence = loadImage("bgImages/day/topFence.png");
  bg_bottomTile = loadImage("bgImages/day/bottomtile.png");
  lawn = loadImage("bgImages/day/lawn.png");
  lawnend = loadImage("bgImages/day/lawnroadinbetween.png");
  lawnmower = loadImage("bgImages/day/lawnmower.png")

  sm_background = loadImage("menus/startmenu/bg.png");
  sm_adventure_hovered = loadImage("menus/startmenu/buttons/hovered/adventure.png");
  sm_minigame_hovered = loadImage("menus/startmenu/buttons/hovered/minig.png");
  sm_puzzle_hovered = loadImage("menus/startmenu/buttons/hovered/puzzle.png");
  sm_survival_hovered = loadImage("menus/startmenu/buttons/hovered/survival.png");
  sm_options_hovered = loadImage("menus/startmenu/buttons/hovered/options.png");
  sm_help_hovered = loadImage("menus/startmenu/buttons/hovered/help.png");
  sm_quit_hovered = loadImage("menus/startmenu/buttons/hovered/quit.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  imageResize(); // Resize all images once during setup
}

function draw() {
  background(220);
  if (gameState === "start") {
    startMenu();
  } else if (gameState === "adventureStart") {
    displayBackground();
  }
  displayMouseXY(); // For debugging
}

function imageResize() {
  // Resize the background 
  let scalexHome = height/3*4 / sm_background.width;
  let scaleyHome = height / sm_background.height;
  sm_background.resize((height / 3) * 4, height);

  sm_adventure_hovered.resize(sm_adventure_hovered.width * scalexHome, sm_adventure_hovered.height * scaleyHome);
  sm_minigame_hovered.resize(sm_minigame_hovered.width * scalexHome, sm_minigame_hovered.height * scaleyHome);
  sm_puzzle_hovered.resize(sm_puzzle_hovered.width * scalexHome, sm_puzzle_hovered.height * scaleyHome);
  sm_survival_hovered.resize(sm_survival_hovered.width * scalexHome, sm_survival_hovered.height * scaleyHome);
  sm_options_hovered.resize(sm_options_hovered.width * scalexHome, sm_options_hovered.height * scaleyHome);
  sm_help_hovered.resize(sm_help_hovered.width * scalexHome, sm_help_hovered.height * scaleyHome);
  sm_quit_hovered.resize(sm_quit_hovered.width * scalexHome, sm_quit_hovered.height * scaleyHome);
}

function startMenu() {
  image(sm_background, (width - sm_background.width) / 2, 0); // Center the background
  startMenuHovered(); // Check if mouse is hovering over buttons
}

function displayBackground() {
  image(bg_house, 0, 0);
  image(bg_topFence, bg_house.width, 0);
  image(bg_bottomTile, bg_house.width, bg_topFence.height + lawn.height);
  image(lawnend, bg_house.width + lawn.width+lawnmower.width, bg_topFence.height);
  image(lawn, bg_house.width+lawnmower.width, bg_topFence.height);
  image(lawnmower,bg_house.width ,bg_topFence.height)

}

function startMenuHovered() {
  // Adventure Button
  if (mouseX >= 946 && mouseX <= 1451 && mouseY > 98 && mouseY < 260) {
    image(sm_adventure_hovered, 946,98);
  }
  // Mini Game Button
  if (mouseX >= 945 && mouseX <= 1428 && mouseY > 275 && mouseY < 383) {
    image(sm_minigame_hovered, 945, 267);
  }
  // Puzzle Button
  if (mouseX >= 959 && mouseX <= 1387 && mouseY > 400 && mouseY < 489) {
    image(sm_puzzle_hovered, 953, 397);
  }
  // Survival Button
  if (mouseX >= 967 && mouseX <= 1365 && mouseY > 511 && mouseY < 594) {
    image(sm_survival_hovered, 960, 505);
  }
  // Options Button
  if (mouseX >= 1182 && mouseX <= 1307 && mouseY > 695 && mouseY < 821) {
    image(sm_options_hovered, 1171, 661);
  }
  // Help Button
  if (mouseX >= 1328 && mouseX <= 1385 && mouseY > 724 && mouseY < 854) {
    image(sm_help_hovered, 1305, 638);
  }
  // Quit Button
  if (mouseX >= 1430 && mouseX <= 1517 && mouseY > 699 && mouseY < 841) {
    image(sm_quit_hovered, 1405,684);
  }
}

function displayMouseXY() {
  textSize(24);
  fill("black");
  text("X: " + mouseX + "  Y: " + mouseY, 10, 20);
}

function mouseReleased() {
  if (gameState === "start") {
    if (mouseX >= 946 && mouseX <= 1451 && mouseY > 98 && mouseY < 260) {
      gameState = "adventureStart";
    } else if (mouseX >= 1430 && mouseX <= 1517 && mouseY > 699 && mouseY < 841) {
      window.close();
    }
  }
}
