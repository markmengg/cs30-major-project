//
// Extra for Experts:
// lerp, requestanimation
class Camera{
  constructor(startX, endX, duration) {
    this.startX = startX;  // Initial start position of the camera
    this.endX = endX;      // Final position of the camera
    this.duration = duration; // Duration of the camera pan
    this.startTime = null;  // To store the start time of the animation
  }

  pan() {
    if (this.startTime === null) {
      this.startTime = millis(); // Record the start time
    }

    let elapsedTime = millis() - this.startTime;
    let time = constrain(elapsedTime / this.duration, 0, 1); // Normalize time between 0 and 1


    let currentX = lerp(this.startX, this.endX, time);

    push();
    translate(currentX, 0); 
    displayBackground();   

    if (time < 1) {
      requestAnimationFrame(() => this.pan());  
    }
  }


  reset() {
    this.startTime = null;
    
  }
}

let myCamera;
let duration = 2300;  







let startTime;




let originalWidth = 1876;
let originalHeight = 925;

// Calculate scaling factors
let xPositionScale;
let yPositionScale;

let cameraPanTimer;


// Images

// Background Images
let bg_house;
let bg_road;
let bg_topFence;
let bg_bottomTile;
let lawn;
let lawnend;
let lawnmower;

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
const ROWS = 9;
const COLUMNS = 5;
let grid = [
  ["0","0","0","0","0","0","0","0","0"],
  ["0","0","0","0","0","0","0","0","0"],
  ["0","0","0","0","0","0","0","0","0"],
  ["0","0","0","0","0","0","0","0","0"],
  ["0","0","0","0","0","0","0","0","0"]
];

// Game Mode
let modeState = "menu";
// Game State
let gameState = "pregame";


// Game Logic Variables
let cameraPanState = "forward";



function preload() {
  // Load images
  bg_house = loadImage("bgImages/day/house.png");
  bg_topFence = loadImage("bgImages/day/topFence.png");
  bg_bottomTile = loadImage("bgImages/day/bottomtile.png");
  lawn = loadImage("bgImages/day/lawn.png");
  lawnend = loadImage("bgImages/day/lawnroadinbetween.png");
  lawnmower = loadImage("bgImages/day/lawnmower.png");
  bg_road = loadImage("bgImages/day/road.png");

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
  xPositionScale = windowWidth/originalWidth;
  yPositionScale = windowHeight/originalHeight;  
  pregameCameraFWD = new Camera((width-sm_background.width)/2, -bg_road.width, duration); 
}


function draw() {
  background(220);
  if (modeState === "menu") {
    startMenu();
  }
  if (modeState === "adventure") {
    if (gameState === "pregame"){
      pregameCameraFWD.pan();
    }
    displayMouseXY(); // For debugging
  }
}



// function cameraPan(startX,endX) {

//   if (!startTime) {
//     startTime = millis(); // Record the start time
//   }

//   let elapsedTime = millis() - startTime;
//   let time = constrain(elapsedTime / duration, 0, 1); // Normalize time between 0 and 1

//   // Interpolate from startX to endX
//   let currentX = lerp(startX, endX, time); 

//   push();
//   translate(currentX, 0); // Apply camera pan
//   displayBackground();
//   pop();

//   // Continue the animation until it reaches the end point
//   if (time < 1) {
//     requestAnimationFrame(cameraPan);
//   }

// } 






function imageResize() {
  // Resize the background to fit window height and adjusted width
  let scalexHome = height / 3 * 4 / sm_background.width;
  let scaleyHome = height / sm_background.height;
  
  // Resizing the background
  sm_background.resize(sm_background.width * scalexHome, sm_background.height * scaleyHome);

  // Resize other images to maintain proportional scaling based on the background size
  sm_adventure_hovered.resize(sm_adventure_hovered.width * scalexHome, sm_adventure_hovered.height * scaleyHome);
  sm_minigame_hovered.resize(sm_minigame_hovered.width * scalexHome, sm_minigame_hovered.height * scaleyHome);
  sm_puzzle_hovered.resize(sm_puzzle_hovered.width * scalexHome, sm_puzzle_hovered.height * scaleyHome);
  sm_survival_hovered.resize(sm_survival_hovered.width * scalexHome, sm_survival_hovered.height * scaleyHome);
  sm_options_hovered.resize(sm_options_hovered.width * scalexHome, sm_options_hovered.height * scaleyHome);
  sm_help_hovered.resize(sm_help_hovered.width * scalexHome, sm_help_hovered.height * scaleyHome);
  sm_quit_hovered.resize(sm_quit_hovered.width * scalexHome, sm_quit_hovered.height * scaleyHome);



  let scalexLawn = height / 3*4 / (lawn.width + lawnmower.width + lawnend.width);
  let scaleyLawn = height / (lawn.height + bg_bottomTile.height + bg_topFence.height);


  bg_bottomTile.resize(bg_bottomTile.width * scalexLawn, bg_bottomTile.height * scaleyLawn);
  bg_house.resize(bg_house.width * scalexLawn, bg_house.height * scaleyLawn);
  bg_road.resize(bg_road.width * scalexLawn, bg_road.height * scaleyLawn);
  bg_topFence.resize(bg_topFence.width * scalexLawn, bg_topFence.height * scaleyLawn);
  lawnend.resize(lawnend.width * scalexLawn, lawnend.height * scaleyLawn);
  lawn.resize(lawn.width * scalexLawn, lawn.height * scaleyLawn);
  lawnmower.resize(lawnmower.width * scalexLawn, lawnmower.height * scaleyLawn);
}

function startMenu() {
  image(sm_background, (width - sm_background.width) / 2, 0); // Center the background
  startMenuHovered(); // Check if mouse is hovering over buttons
}

function displayBackground() {
  
  image(bg_topFence, bg_house.width, 0);
  image(bg_bottomTile, bg_house.width, bg_topFence.height + lawn.height);
  image(lawnend, bg_house.width + lawn.width + lawnmower.width, bg_topFence.height);
  image(lawn, bg_house.width + lawnmower.width, bg_topFence.height);
  image(lawnmower,bg_house.width ,bg_topFence.height);


  image(bg_road, bg_house.width+bg_topFence.width,0);
  image(bg_house, 0, 0);

}

function startMenuHovered() {



  // Adventure Button
  if (
    mouseX >= 958 * xPositionScale && 
    mouseX <= 1451 * xPositionScale && 
    mouseY >=  151* yPositionScale && 
    mouseY <= 260 * yPositionScale
  ) {
    image(sm_adventure_hovered, 946 * xPositionScale, 98 * yPositionScale);
  }

  // Mini Game Button
  if (
    mouseX >= 954 * xPositionScale && 
    mouseX <= 1422 * xPositionScale && 
    mouseY >= 275 * yPositionScale && 
    mouseY <= 403* yPositionScale
  ) {
    image(sm_minigame_hovered,  945* xPositionScale, 267 * yPositionScale);
  }

  // Puzzle Button
  if (
    mouseX >= 965 * xPositionScale && 
    mouseX <= 1383 * xPositionScale && 
    mouseY >= 403 * yPositionScale && 
    mouseY <= 531 * yPositionScale
  ) {
    image(sm_puzzle_hovered, 953 * xPositionScale, 397 * yPositionScale);
  }

  // Survival Button
  if (
    mouseX >= 967 * xPositionScale && 
    mouseX <= 1365 * xPositionScale && 
    mouseY >= 511* yPositionScale && 
    mouseY <= 634 * yPositionScale
  ) {
    image(sm_survival_hovered, 960 * xPositionScale, 505 * yPositionScale);
  }

  // Options Button
  if (
    mouseX >= 1182 * xPositionScale && 
    mouseX <= 1307 * xPositionScale && 
    mouseY >= 695 * yPositionScale && 
    mouseY <= 821 * yPositionScale
  ) {
    image(sm_options_hovered, 1171   * xPositionScale, 661 * yPositionScale);
  }

  // Help Button
  if (
    mouseX >= 1328 * xPositionScale && 
    mouseX <= 1385 * xPositionScale && 
    mouseY >= 724 * yPositionScale && 
    mouseY <= 854 * yPositionScale
  ) {
    image(sm_help_hovered, 1305 * xPositionScale, 638 * yPositionScale);
  }

  // Quit Button
  if (
    mouseX >= 1430 * xPositionScale && 
    mouseX <= 1517 * xPositionScale && 
    mouseY >= 699 * yPositionScale && 
    mouseY <= 841 * yPositionScale
  ) {
    image(sm_quit_hovered, 1405 * xPositionScale, 684 * yPositionScale);
  }
}


function displayMouseXY() {
  textSize(24);
  fill("black");
  text("X: " + mouseX + "  Y: " + mouseY, 10, 20);
}

function mouseReleased() {
  if (modeState === "menu") {
    if (mouseX >= 946 && mouseX <= 1451 && mouseY > 98 && mouseY < 260) {
      modeState = "adventure";
    }
    else if (mouseX >= 1430 && mouseX <= 1517 && mouseY > 699 && mouseY < 841) {
      window.close();
    }
  }
}

function windowResized() {
  // Resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}
