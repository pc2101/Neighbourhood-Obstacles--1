//creating players and obstacles
var player,path
var car,cycles, streetlights,watch
var houses, trees

//game states
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var life=5;
var distance;

function preload(){
  playerImg = loadAnimation("images/Jake1.png", "images/Jake2.png", "images/jake3.png", "images/jake4.PNG", "images/jake5.png");
  car1=loadImage("images/car1.png")
  car2=loadImage("images/car2.png")
  car3=loadImage("images/car3.png") 
  car4=loadImage ("images/car4.png")
  pathImg=loadImage("images/path.png")
  youwinImg=loadImage("images/you_win.jpeg")
  youloseImg=loadImage("images/you_lose.jpeg")
  restartImg=loadImage("images/restart.jpeg")
}


function setup() {
  createCanvas(400, 600);

  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale=1.5

  player = createSprite(70,580,20,20);
  player.addAnimation("JakeRunning", playerImg);
  player.scale = 1.0

  restart = createSprite(30,10);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  edges = createEdgeSprites();
  
  carG = new Group();

  distance=0;
}

function draw() {
  


  if (gameState === PLAY) {
    background(0);
    restart.visible = false;
    distance = distance + Math.round(frameCount/60);
    path.velocityY= (4+distance/100);

    if (path.y > height) {
      path.y = height / 2;
    }

    if (keyDown(LEFT_ARROW)) {
      player.velocityX = -2;
      player.velocityY = 0;
    }
   
    if (keyDown(RIGHT_ARROW)) {
      player.velocityX = 2;
      player.velocityY = 0;
    } 

    if (carG.isTouching(player)) {
      life = Math.round(life-1);
    }
    
    if(life===0){
      gameState = END;
    }

    if(distance===5000){
      gameState = WIN;
    }
    
    createCars();
  }

  else if(gameState===END){
    background(0);
    restart.visible = true;
    path.destroy();
    carG.destroyEach();
    player.destroy();
    var lose=createSprite(180,180);
    lose.addImage(youloseImg);
    lose.scale=0.3
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  else if(gameState===WIN){
    background(0);
    restart.visible = true;
    path.destroy();
    carG.destroyEach();
    player.destroy();
    var win=createSprite(180,180);
    win.addImage(youwinImg);
    win.scale=0.3;
  }

  player.collide(edges);

  drawSprites()

  textSize(20);
  fill("yellow");
  text("Life: " + life, 40, 30);
  text("Distance: "+distance,40,50);
  
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  life=5;
  distance=0;
  path.destroy();
  carG.destroyEach();
  player.destroy();
}

function createCars (){
  if (World.frameCount % 50 == 0) {
    var car = createSprite(Math.round(random(50, 350), 40, 10, 10));
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: car.addImage(car1);
              break;
      case 2: car.addImage(car2);
              break;
      case 3: car.addImage(car3);
              break;
      case 4: car.addImage(car4);
              break;
      default: break;
    }
    car.scale = 0.2;
    car.velocityY = (6 + distance/100);
    car.lifetime = 150;
    carG.add(car);
  }
}

