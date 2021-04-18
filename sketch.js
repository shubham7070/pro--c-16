var path,mainCyclist, cycleBell;

var pathImg,mainRacerImg1,mainRacerImg2;

var oppPinkImg1,oppPinkImg2, oppYellowImg1,oppYellowImg2, oppRedImg1,oppRedImg2;

var player1,player2,player3;

var pinkCG, yellowCG, redCG;

var obstacleG1, obstacleG2, obstacleG3, obstacle1, obstacle2, obstacle3;

var obstacle01, obstacle02, obstacle03;

var distance = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, gameOverImg;

function preload(){
  
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  
  oppPinkImg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPinkImg2 = loadAnimation("images/opponent3.png");
  
  oppYellowImg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellowImg2 = loadAnimation("images/opponent6.png");
  
  oppRedImg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRedImg2 = loadAnimation("images/opponent9.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  
}

function setup(){
  
  createCanvas(1200,300);
  
  //moving road.
  path = createSprite(600,150);
  path.addImage(pathImg);
  
  mainCyclist = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale = 0.07;
  
  mainCyclist.setCollider("circle",0,0,600);
  mainCyclist.debug = false;
  
  gameOver = createSprite(600,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  
  obstacleG1 = new Group();
  obstacleG2 = new Group();
  obstacleG3 = new Group();
  
  distance = 0;
  
}

function draw(){
  background(0);
  
  drawSprites();
  textSize(20);
  fill("yellow");
  text("Distance: "+ distance,400,30);
  
  if (gameState === PLAY) {
  gameOver.visible = false;
  
  distance = distance + Math.round(getFrameRate()/50);
  path.velocityX = -(5+2*distance/150);
  
  edges = createEdgeSprites();
  mainCyclist.collide(edges); 
  
  if(path.x < 0){
    path.x = width/2
  }
    
  if(keyDown("space")){
    cycleBell.play();
  }  
  
  mainCyclist.y = World.mouseY;
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclist();
    }
    else if (select_oppPlayer == 2) {
      yellowCyclist();
    }
    else if (select_oppPlayer == 3) {
      redCyclist();
    }
  }
  
  var select_obs = Math.round(random(1,3));
  
  if (World.frameCount % 200 == 0) {
    if (select_obs == 1) {
      spawnObstacles1();
    }
    else if (select_obs == 2) {
      spawnObstacles2();
    }
    else if (select_obs == 3) {
      spawnObstacles3();
    }    
  }
    
    if(pinkCG.isTouching(mainCyclist)){
      gameState = END;
      player1.addAnimation("opponentPlayer1",oppPinkImg2);
      yellowCG.destroyEach();
      redCG.destroyEach();
      obstacleG1.destroyEach();
      obstacleG2.destroyEach();
      obstacleG3.destroyEach();
    }
    else if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.addAnimation("opponentPlayer2",oppYellowImg2);
      pinkCG.destroyEach();
      redCG.destroyEach();
      obstacleG1.destroyEach();
      obstacleG2.destroyEach();
      obstacleG3.destroyEach();
    }
    else if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.addAnimation("opponentPlayer3",oppRedImg2);
      yellowCG.destroyEach();
      pinkCG.destroyEach();
      obstacleG1.destroyEach();
      obstacleG2.destroyEach();
      obstacleG3.destroyEach();
    }
    else if(obstacleG1.isTouching(mainCyclist)){
      gameState = END;
      pinkCG.destroyEach();
      yellowCG.destroyEach();
      redCG.destroyEach();
      obstacleG2.destroyEach();
      obstacleG3.destroyEach();
    }
    else if(obstacleG2.isTouching(mainCyclist)){
      gameState = END;
      pinkCG.destroyEach();
      yellowCG.destroyEach();
      redCG.destroyEach();
      obstacleG1.destroyEach();
      obstacleG3.destroyEach();
    }
    else if(obstacleG3.isTouching(mainCyclist)){
      gameState = END;
      pinkCG.destroyEach();
      yellowCG.destroyEach();
      redCG.destroyEach();
      obstacleG2.destroyEach();
      obstacleG1.destroyEach();
    }
    
  }
  else if(gameState === END){
    
    textSize(20);
    fill("blue");
    stroke("black");
    text("press R for reset",500,200);
    
    gameOver.visible = true;
    
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
    
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
    
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    obstacleG1.setVelocityXEach(0);
    obstacleG1.setLifetimeEach(-1);
    
    obstacleG2.setVelocityXEach(0);
    obstacleG2.setLifetimeEach(-1);
    
    obstacleG3.setVelocityXEach(0);
    obstacleG3.setLifetimeEach(-1);
    
    textSize(20);
    fill("white");
    stroke("black");
    text("press UP_ARROW for restart",430,250);
    
    reset();
  }
  
  if(keyDown("up_arrow")){
      
      gameState = PLAY;
      mainCyclist.visible = true;
      mainCyclist.x = 70;
      mainCyclist.y = 150;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    }
    
}

function pinkCyclist() {
  
  player1 = createSprite(1100,Math.round(random(50,250)));
  player1.addAnimation("opponentPlayer1",oppPinkImg1);
  player1.scale = 0.05;
  player1.velocityX = -(5+2*distance/200);
  player1.setLifetime = 170;
  pinkCG.add(player1);
}

function yellowCyclist() {
  
  player2 = createSprite(1100,Math.round(random(50,250)));
  player2.addAnimation("opponentPlayer2",oppYellowImg1);
  player2.scale = 0.05;
  player2.velocityX = -(5+2*distance/200);
  player2.setLifetime = 170;
  yellowCG.add(player2);
}

function redCyclist() {
  
  player3 = createSprite(1100,Math.round(random(50,250)));
  player3.addAnimation("opponentPlayer3",oppRedImg1);
  player3.scale = 0.05;
  player3.velocityX = -(5+2*distance/200);
  player3.setLifetime = 170;
  redCG.add(player3);
}

function spawnObstacles1() {  
  obstacle01 = createSprite(1100,Math.round(random(50,250)));
  obstacle01.velocityX = -(5+2*distance/200);
  obstacle01.addImage(obstacle1);   
  obstacle01.scale = 0.08;
  obstacle01.setLifetime = 170;
  obstacleG1.add(obstacle01);
  
}

function spawnObstacles2() {
  obstacle02 = createSprite(1100,Math.round(random(50,250)));
  obstacle02.velocityX = -(5+2*distance/200);
  obstacle02.addImage(obstacle2);
  obstacle02.scale = 0.08;
  obstacle02.setLifetime = 170;
  obstacleG2.add(obstacle02);
  
}

function spawnObstacles3() {
  obstacle03 = createSprite(1100,Math.round(random(50,250)));
  obstacle03.velocityX = -(5+2*distance/200);
  obstacle03.addImage(obstacle3);
  obstacle03.scale = 0.08;
  obstacle03.setLifetime = 170;
  obstacleG3.add(obstacle03);
  
}

function reset(){
  
  if(keyDown("r")){

    mainCyclist.visible = false;
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    pinkCG.setVelocityXEach(0);
    yellowCG.setVelocityXEach(0);
    redCG.setVelocityXEach(0);
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    obstacleG1.setVelocityXEach(0);
    obstacleG2.setVelocityXEach(0);
    obstacleG3.setVelocityXEach(0);
    distance = 0;
    obstacleG1.destroyEach();
    obstacleG2.destroyEach();
    obstacleG3.destroyEach();
  }
}


