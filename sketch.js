// Extra for Experts:
// lerp, requestanimation


//peagif for Pea-display
//Pea-colliding after zombie

// TO DO LIST -- Finish classes and composition classes for all of the plants. create collisions between the zombies and plants (arrays? grid?).
// Figure out the built in timer, 

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
    translate(currentX-bg_house.width, 0);
    displayBackground();
  
    if (time < 1) {
      requestAnimationFrame(() => this.pan());
    }
    else {
      if (gameState === "pregame") {
        gameState = "countdown"; // Change game state after pan completes
        countdownStartTime = null; // Reset countdown timer
      }
    }
  }


  reset() {
    this.startTime = null;
    
  }
}

class Plant{
  constructor(x, y, plantType, health){
    this.y = y;
    this.x = x;
    this.plant = plantType;
    this.health = health;
    this.state = "idle";
    this.sunTimer = new Timer(5000);
    this.peaTimer = new Timer(1500)

    
  }

  produceSun(){
    if (this.plant === "sunflower"&& this.sunTimer.expired()){
      let sun = new Sun(random(bg_house.width+this.x*tileSizeX,bg_house.width+(this.x-1)*tileSizeX),tileSizeY * (this.y + 1.65), "plant");
      sunArray.push(sun);
      this.sunTimer = new Timer (10000);
    }
  }

  shootpea(){
    if(this.plant===peashooter&&this.peaTimer.expired()){

    }
  }

  display(){
    image(plantType,this.x, this.y);
  }
}

class Zombie {
  constructor(x, y, zombieType, health, speed, eatingImage){
    this.x = x;
    this.y = y;
    this.zombie = zombieType;
    this.health = health;
    this.dx = speed;
    this.state = "walk";
  }

  display(){
    image(zombieType,this.x, this.y);
  }

  move(){
    this.x+=this.dx;
  }
}


class Pea{
  constructor(x,y){
    this.x = x
    this.y=y
    this.vx = 20
    this.hit = false
  }

  // colliding(){
  //   if 
  // }

  update(arraylocation){
    if (!this.hit&&this.x<3000){
      this.x+=this.vx
    }
    else if(this.hit){
      let timer = new Timer(200)
      if (!timer.expired()){
        this.hiteffect()
      }
      else{
        peaArray.splice(arraylocation,1)
      }
    }
    else{
      peaArray.splice(arraylocation,1)
    }
  }
  // display(){
  //   if(!this.hit){
  //     image(pea,this.x,this.y,peasize,peasize)
  //   }
  // }
  


  // hiteffect(){
  //   display(peaeffect,this.x,this.y)
  // }
}


class Sun {
  constructor(x, y, finalY, mode){
    this.x = x;
    this.y = y;
    this.finalY = finalY;
    this.finalX = null;
    this.dy = 1.5;
    this.dx = null;
    this.collected = false;
    this.mode = mode;
    if (mode === "plant"){
      this.velocity = -3;
      this.acell = 0.2;
    }
  }

  update(arraylocation) {

    // For the Sun coming from the Sky
    if (this.y <= this.finalY && !this.collected && this.mode === "sky") {
      this.y += this.dy;
    }

    else if (this.mode==="sunflower"&&this.y<this.finalY){
      this.y += this.dy
      this.y += this.velocity
      this.velocity +=this.acell
    }
  }


  collecting(arraylocation){
    if (mouseX >= this.x && mouseX  <= this.x + 50 && mouseY >= this.y && mouseY  <=this.y + 50 && !this.collected){
      this.collected = true
    }

    if (this.collected){
      this.x -= this.dx;
      this.y -= this.dy;
      if (this.y < tileSize/10 && this.x < backgroundOffset- tileSize* (7/12)){
        sunArray.splice(arraylocation, 1);
      }
  }}

  display() {
    image(sun, this.x, this.y, sunSize, sunSize);
  }

}



// General Game Variables
let myCamera;
let duration = 1500;  

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


// Game Images
let readyMessage;
let setMessage;
let plantMessage;
let menuButton;
let menuScreen;

// Plant Bar
let plantBar;
let sunflowerPacket;
let peashooterPacket;
let cherryBombPacket;
let potatoMinePacket;
let wallnutPacket;
let chomperPacket;
let repeaterPacket;


// Plants
let peashooter;
let sunflower;
let cherryBomb;
let potatoMine;
let wallnut;
let chomper, chomperEating;
let repeater;


// Zombies
let zombieDie, zombieBurnt, zombieHead;
let brownZombieStill, brownZombieWalk, brownZombieAttack;
let coneZombieStill, coneZombieWalk, coneZombieAttack;
let bucketZombieStill, bucketZombieWalk, bucketZombieAttack;



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


let tileSizeY;
let tileSizeX;


let plantOffsetX = 240;
let plantOffsetY = 50;





// Game Mode
let modeState = "menu";
// Game State
let gameState = "pregame";

// General Variables
let paused = false;
let countdownMessages = ["ready", "set", "plant"];
let countdownIndex = 0;
let countdownStartTime = null;
let sun;

// Sizing Variables
let sunSize;
let plantSizeX = 70;
let plantSizeY = 80;
let cherrySizeX = 110;
let cherrySizeY = 90;
let chomperSizeX = 95;
let chomperSizeY = 115;

// Planting Function
let hoveredPlant = null;


// Arrays

let peaArray = [];
let sunArray = [];
let zombieArray = [];
let plantArray = [];














// ---------- [ START OF CODE] --------------

function preload() {
  plantBar = loadImage("selectionscreen/bar.png");

  // Game GIFs/Images
  sun = loadImage("GIFs/sun.gif");

  // Plant GIFs
  peashooter = loadImage("GIFs/plants/peashooter.gif");
  sunflower = loadImage("GIFs/plants/sunflower.gif");
  cherrybomb = loadImage("GIFs/plants/cherrybomb.gif");
  potatoMine = loadImage("GIFs/plants/potato-mine.gif");
  wallnut = loadImage("GIFs/plants/wallnut.gif");
  chomper = loadImage("GIFs/plants/chomper.gif"), chomperEating = loadImage("GIFs/plants/chompereating.gif");
  repeater = loadImage("GIFs/plants/repeater.gif");

  // Zombie GIFs

  zombieDie = loadImage("GIFs/zombies/zombiedie.gif");
  zombieBurnt = loadImage("GIFs/zombies/generalZombieBurnt.webp");
  zombieHead = loadImage("GIFs/zombies/zombiehead.gif");

  brownZombieStill = loadImage("GIFs/zombies/zombiestill.gif");
  brownZombieWalk = loadImage("GIFs/zombies/zombiewalk.gif");
  brownZombieAttack = loadImage("GIFs/zombies/zombieattack.gif");

  coneZombieStill = loadImage("GIFs/zombies/conestill.gif");
  coneZombieWalk = loadImage("GIFs/zombies/conewalk.gif");
  coneZombieAttack = loadImage("GIFs/zombies/coneattack.gif");

  bucketZombieStill = loadImage("GIFs/zombies/bucketstill.gif");
  bucketZombieWalk = loadImage("GIFs/zombies/bucketwalk.gif");
  bucketZombieAttack = loadImage("GIFs/zombies/bucketattack.gif");

  // Plant Bar Itemms
  
  plantBar = loadImage("selectionscreen/bar.png");
  sunflowerPacket = loadImage("packets/sunflower.webp");
  peashooterPacket = loadImage("packets/peashooter.webp");
  cherryBombPacket = loadImage("packets/cherrybomb.webp");
  potatoMinePacket = loadImage("packets/potatomine.webp");
  wallnutPacket = loadImage("packets/wallnut.webp");
  chomperPacket = loadImage("packets/chomper.webp");
  repeaterPacket = loadImage("packets/repeater.webp");



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

  readyMessage = loadImage("Game Messages/ready.png");
  setMessage = loadImage("Game Messages/set.png");
  plantMessage = loadImage("Game Messages/plant.png");
  menuButton = loadImage("menus/pausemenu/home.png");
  menuScreen = loadImage("menus/pausemenu/menuscreen.png");
}



function setup() {
  createCanvas(1591, 775);
  imageResize(); // Resize all images once during setup
  xPositionScale = 1591/originalWidth;
  yPositionScale = 775/originalHeight;  
  pregameCameraFWD = new Camera((width-sm_background.width)/2, -bg_road.width, duration); 
  pregameCameraBWD = new Camera(-bg_road.width,(width-sm_background.width)/2-bg_house.width, duration);
  tileSizeX = lawn.width/9;
  tileSizeY = lawn.height/5;
  sunSize =  tileSizeX*0.5;
  
}

function backstage(){
  //sun
  let suntimer = new Timer(2000)
  suntimer.start()
  if (suntimer.expired()){
    let x= random*lawn.width+300+lawnmower.width
    let y= bg_topFence.height
    let finaly = y+200
    let sun = new Sun(x,y,finaly,"sky")
    sunArray.push(sun);
    suntimer = new Timer(2000)
  }
  
}




function draw() {
  background(220);
  




  for (let sun of sunArray){
    sun.display()
  }

  if (paused){
    gamePause();
  }
  else{
    gameResume();
  }
  
  
  // Handle different game states
  if (modeState === "menu") {
    startMenu();
  }
  if (modeState === "adventure"){

    cutSides();
    
    if (gameState === "pregame") {
      
      pregameCameraFWD.pan();
    } 
    else {
      pregameCameraBWD.pan();
      readySetPlant();
    }
    if (gameState === "gameStart"){
      // for (let y =0; y<5; y++){
      //   for (let x=0;x<9;x++){
      //     if (grid[y][x]==="1"){
      //       fill("yellow")
      //       rect(lawnmower.width+x*tileSizeX,bg_topFence.height+y*tileSizeY,tileSizeX,tileSizeY)
      //     }
      //   }
      // }
      gameTime();
      detectPacketInteractions();
      displayPlantSeeds();
      drawGrid();

    }
    displayMouseXY();
    
  }
  
}




function resetGrid(){
  grid = [
    ["0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0"]
  ];
}


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
  text("X: " + mouseX + "  Y: " + mouseY, 310, 20);
}


function detectPacketInteractions(){
  let pWidth = sunflowerPacket.width;
  let pHeight = sunflowerPacket.height;
  if (mouseIsPressed && mouseY>8 && mouseY<8+pHeight){
    if (mouseX>116&&mouseX<170){
      hoveredPlant = "sunflower";
    }
    if (mouseX>180&&mouseX<234){
      hoveredPlant = "peashooter";
    }
    if (mouseX>244&&mouseX<298){
      hoveredPlant = "repeater";
    }
    if (mouseX>308&&mouseX<362){
      hoveredPlant = "wallnut";
    }
    if (mouseX>372&&mouseX<426){
      hoveredPlant = "cherrybomb";
    }
    if (mouseX>436&&mouseX<490){
      hoveredPlant = "chomper";
    }
    if (mouseX>500&&mouseX<554){
      hoveredPlant = "potatomine";
    }
    
  }
}


function displayPlantSeeds() {
  if (hoveredPlant === "sunflower") {
    image(sunflower, mouseX + plantOffsetX, mouseY - plantOffsetY, plantSizeX, plantSizeY);
  }
  else if (hoveredPlant === "peashooter") {
    image(peashooter, mouseX + plantOffsetX, mouseY - plantOffsetY, plantSizeX, plantSizeY);
  }
  else if (hoveredPlant === "repeater") {
    image(repeater, mouseX + plantOffsetX, mouseY - plantOffsetY, plantSizeX, plantSizeY);
  }
  else if (hoveredPlant === "wallnut") {
    image(wallnut, mouseX + plantOffsetX, mouseY - plantOffsetY, plantSizeX, plantSizeY);
  }
  else if (hoveredPlant === "cherrybomb") {
    image(cherrybomb, mouseX + plantOffsetX, mouseY - plantOffsetY, cherrySizeX, cherrySizeY);
  }
  else if (hoveredPlant === "chomper") {
    image(chomper, mouseX + plantOffsetX, mouseY - plantOffsetY, chomperSizeX, chomperSizeY);
  }
  else if (hoveredPlant === "potatomine") {
    image(potatoMine, mouseX + plantOffsetX, mouseY - plantOffsetY, plantSizeX, plantSizeY);
  }
}


function mouseReleased() {
  for (let sun of sunArray){
    sun.collecting()
  }

  
  if (modeState === "menu") {
    if (mouseX >= 946 && mouseX <= 1451 && mouseY > 98 && mouseY < 260) {
      modeState = "adventure";
      
    }
    else if (mouseX >= 1430 * xPositionScale && mouseX <= 1517 * xPositionScale && mouseY > 699 * yPositionScale && mouseY < 841 * yPositionScale) {
      window.close();
    }
  }

  if (modeState === "adventure") {
    if (gameState === "gameStart"){
      if (mouseX >= 855  && mouseX <= 1037  && mouseY > 0  && mouseY < 34 ) {
        paused = true;
        gamePause();
      }
      if (paused) {
        if (mouseX >= 373  && mouseX <= 709  && mouseY > 550  && mouseY < 612 ) {
          paused = false;
          gameResume();
        }
      }
    }
  }
}


function windowResized() {
  // Resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}


function readySetPlant() {
  if (countdownStartTime === null) {
    countdownStartTime = millis();
  }

  let elapsedTime = millis() - countdownStartTime;

  if (elapsedTime >= 2000) {
    let messageDisplayTime = 1000;
    let messageIndex = Math.floor((elapsedTime - 2000) / messageDisplayTime);

    if (messageIndex < countdownMessages.length) {
      let currentMessage = countdownMessages[messageIndex];
      if (currentMessage === "ready") {
        image(readyMessage, (width / 2 - readyMessage.width / 2 + 125 +300) * xPositionScale, (height / 2 - readyMessage.height / 2 - 25) * yPositionScale);
      }
      else if (currentMessage === "set") {
        image(setMessage, (width / 2 - setMessage.width / 2 + 125+300) * xPositionScale, (height / 2 - setMessage.height / 2 - 25) * yPositionScale);
      }
      else if (currentMessage === "plant") {
        image(plantMessage, (width / 2 - plantMessage.width / 2 + 125+300) * xPositionScale, (height / 2 - plantMessage.height / 2 - 25) * yPositionScale);
      }
    }
    else {
      gameState = "gameStart";
    }
  }
}


function cutSides() {
  // Fill any empty space on the sides of the screen
  canvas = createCanvas(windowWidth-600+lawnend.width,windowHeight);
  canvas.position(300-lawnend.width/2, 0);

}


function gameTime() {
  image(menuButton, 1135, 0, 190, 40);
  image(plantBar, 300, 0, 570, 100);
  image(sunflowerPacket, 396, 8, 55, 78);
  image(peashooterPacket, 462, 8, 55, 78);
  image(repeaterPacket, 528, 8, 55, 78);
  image(wallnutPacket, 594, 8, 55, 78);
  image(cherryBombPacket, 660, 8, 55, 78);
  image(chomperPacket, 726, 8, 55, 78);
  image(potatoMinePacket, 792, 8, 55, 78);
}


function gamePause() {
  if (paused === true){
    noLoop();
    image(menuScreen, width/2 + 95, height/4 - 55);
  }
}


function gameResume() {
  if (paused === false){
    loop();
  }
}

function drawGrid() {
  for (let y =0;y<5;y++){
    for (let x= 0; x<9;x++){
      if(grid[y][x]==="1"){
        image(sunflower, 274+lawnmower.width+x*tileSizeX+20, bg_topFence.height+ y*tileSizeY , plantSizeX, plantSizeY);
      }
      else if(grid[y][x]==="2"){
        image(peashooter, 274+lawnmower.width+x*tileSizeX+20, bg_topFence.height+ y*tileSizeY , plantSizeX, plantSizeY);
      }
      else if(grid[y][x]==="3"){
        image(repeater, 274+lawnmower.width+x*tileSizeX+20, bg_topFence.height+ y*tileSizeY , plantSizeX, plantSizeY);
      }
      else if(grid[y][x]==="4"){
        image(wallnut, 274+lawnmower.width+x*tileSizeX+20, bg_topFence.height+ y*tileSizeY , plantSizeX, plantSizeY);
      }
      else if(grid[y][x]==="5"){
        image(cherrybomb, 274+lawnmower.width+x*tileSizeX, bg_topFence.height+ y*tileSizeY , cherrySizeX, cherrySizeY);
      }
      else if(grid[y][x]==="6"){
        image(chomper, 274+lawnmower.width+x*tileSizeX+20, bg_topFence.height+ y*tileSizeY - 20, chomperSizeX, chomperSizeY);
      }
      else if(grid[y][x]==="7"){
        image(potatoMine, 274+lawnmower.width+x*tileSizeX+20, bg_topFence.height+ y*tileSizeY , plantSizeX, plantSizeY);
      }

    }
  }
  // sunflower 1, pea 2, repeat 3, wall 4, cherry 5, chomper 6, mine 7
}




function toggleCell(x, y) {
  if (x>= 0 && y >= 0 && x < 9 && y < 5){
    if (grid[y][x] === "0" && hoveredPlant === "sunflower"){
      grid[y][x] = "1";
    }
    else if (grid[y][x] === "0" && hoveredPlant === "peashooter"){
      grid[y][x] = "2";
    }
    else if (grid[y][x] === "0" && hoveredPlant === "repeater"){
      grid[y][x] = "3";
    }
    else if (grid[y][x] === "0" && hoveredPlant === "wallnut"){
      grid[y][x] = "4";
    }
    else if (grid[y][x] === "0" && hoveredPlant === "cherrybomb"){
      grid[y][x] = "5";
    }
    else if (grid[y][x] === "0" && hoveredPlant === "chomper"){
      grid[y][x] = "6";
    }
    else if (grid[y][x] === "0" && hoveredPlant === "potatomine"){
      grid[y][x] = "7";
    }
    hoveredPlant = null
    
  }
}

function mousePressed() {


  let x = Math.floor((mouseX-lawnmower.width)/tileSizeX);
  let y = Math.floor((mouseY-bg_topFence.height)/tileSizeY);
  toggleCell(x,y);


}