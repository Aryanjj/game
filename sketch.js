var gameState = "serve";
var description = "With the increase and rise of pollution \n around the world this game focusses\n on encountering pollution in a fun \n and interactive way";
var button;
var bg ,bgImg,serveTree,serveTreeImg,serveInvisibleGround;
var player,ground,topGround,topGroundGroup,seedGroup,topGroundImg;
var half, seedCount = 0, pollution, pollutionGroup, gun, gunGroup, gunCount = 0, playerBar, earthBar, pBar, seedImg, smokeImg;
var meteor, meteorImg1, meteorImg2, meteorGroup,groundImg;

function preload(){
  serveTreeImg = loadImage("tree.png");
  playBg = loadImage("li.jpg");
  topGroundImg = loadImage("float.png");
  seedImg = loadImage("seed.png");
  smokeImg = loadImage("smoke.png");
  meteorImg1 = loadImage("meteor1.png");
  meteorImg2 = loadImage("meteor2.png");
  groundImg = loadImage("tt.png");
  getBackground();
  
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  half = displayWidth / 2;
  button= createButton("Lets Plant");
  button.position(displayWidth/2,displayHeight/2+270);
  console.log(frameRate);
  serveTree = createSprite(displayWidth-displayWidth+200, displayHeight-50);
  serveTree.addImage(serveTreeImg);
  serveTree.scale = 0.09;

  //to be changed
  serveTree.velocityX = 10;
  serveInvisibleGround = createSprite(displayWidth-20, displayHeight +100, 20, displayHeight);
  serveInvisibleGround.visible = false;
  
  ground = createSprite(displayWidth / 2, displayHeight - 30, displayWidth+displayWidth/2+displayWidth/2, 20);
  
  ground.x = ground.width / 2;
  player = createSprite(40, displayHeight - 70, 40, 60);
   ground.visible = false;
  player.visible = false;
  playerBar = createSprite(displayWidth - displayWidth + 250, displayHeight / 2 - 300, 300, 20);
  playerBar.shapeColor = "green"; 
  playerBar.visible = false;
  pBar = createSprite(displayWidth - displayWidth + 250, displayHeight / 2 - 250, 300, 20);
  pBar.shapeColor = "red";
  pBar.visible = false;
  topGroundGroup = new Group();
  seedGroup = new Group();
  pollutionGroup = new Group();
  gunGroup = new Group();
  meteorGroup = new Group();
  // description.velocityX = -3;
  //  bg = createSprite(200,200, 500, 500);
  //  bg.addImage("hello",bgImg);
}

function draw() {
   //  if (gameState == "serve") {
   //    bg.addImage(bgImg);
   //  }
   // else {
   //    bg = null;
   //  }

 
  // if (gameState=="serve" && keyDown==32) {
  //   gameState = "play";
  // }
  if (gameState == "serve") {
    background(bg);
   
    if (serveTree.isTouching(serveInvisibleGround)) {
      serveTree.velocityY = 0;
      gameState = "play";
    }
  }
  if (gameState == "play") {
     background(playBg);
    ground.visible = true;
    player.visible = true;
    playerBar.visible = true;
    pBar.visible = true; 
    if (keyWentDown("right")) {
      ground.velocityX = -3;
      player.velocityX = 3;
    }
    if (keyWentUp("right")) {
      ground.velocityX = 0;
      player.velocityX = 0;
    }
    if (keyDown("up")&&player.y>=displayHeight/2+70) {
      player.velocityY=-12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);
    
    if (player.x >= displayWidth) {
      player.x = 40;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
     button.hide();
     serveTree.destroy();
     
     if(player.x===400)
     {
     spawnTopGround();
     }
       if (player.isTouching(seedGroup)) {
     console.log("hAppy bday");
         seedGroup.destroyEach();
         seedCount = seedCount + 1;
       }
    if (World.frameCount % 470 == 0) {
      spawnPollution();
    }
    if (World.frameCount % 500==0|| World.frameCount%1200==0){
      spawnMeteor();
    }
    
    if (player.isTouching(pollutionGroup)&&seedCount>0&&keyDown("space")) {
      pollutionGroup.destroyEach();
      seedCount = seedCount - 1;
      gunGroup.setVisibilityEach= true;
      
    }
    if (player.isTouching(gunGroup) && keyDown("space")) {
      gunGroup.destroyEach();
      gunCount = gunCount + 1;
    }
    if (player.isTouching(pollutionGroup)) {
      playerBar.width = playerBar.width - 50;
    }
    if (meteorGroup.isTouching(ground)||meteorGroup.isTouching(player)||meteorGroup.isTouching(topGroundGroup)) {
      meteorGroup.destroyEach();
    }
    player.collide(topGroundGroup);
    // console.log(seedCount);
    // console.log(gunCount);
    console.log(World.frameCount);
  }

  drawSprites();
  if (gameState == "serve") {
    fill(128 + sin(frameCount * 0.1) * 128);
        textSize(40);
  
    textStyle(BOLDITALIC);
  if (mouseIsPressed) {
    stroke(255);
  }
  else {
    noStroke();
  }
  textSize(12 + (mouseX / width)*72);
  text(description, 50, 200);
}
  if (gameState == "play") {
    textSize(15);
    fill(250);
    textStyle(BOLD);
    text("Seeds: " + seedCount, displayWidth / 2 + 600, displayHeight / 2 - 300);
    
}
    
    // textSize(20);
    // fill(0);
    // text("Objective: Collect and plant seeds,\n fight the pollution monster\n and make the dry earth green", 600, 570);
    // text("Loading...", 50, displayHeight-50);
  }



function getBackground() {
  if (gameState == "serve") {
    bgImg = "bg1.jpg";
  }
  // else  {
  //   bgImg = "li.jpg";
  // }
  bg = loadImage(bgImg);
}
function changeState() {
  gameState = "play";
}

function keyPressed(){
  if (gameState == "serve" && keyCode === ENTER) {
    gameState == "play";
  }
}

 function spawnTopGround() {
  
    
   
   topGround = createSprite(displayWidth + 110, displayHeight / 2 + 190);
   topGround.addImage(topGroundImg);
   topGround.scale = 0.25;
   
    seed = createSprite(topGround.x, topGround.y - 60, 10, 50);
   seed.addImage(seedImg);
   seed.scale = 0.2;
   seed.velocityX = -3;

    topGround.velocityX = -3;
    topGroundGroup.add(topGround);
   seedGroup.add(seed);
   
 }

function spawnPollution() {
  pollution = createSprite(displayWidth + 110, ground.y - 100, 30, 60);
  pollution.velocityX = -3;
  pollution.addImage(smokeImg);
  pollution.scale = 0.3;
  
  gun = createSprite(pollution.x+100, pollution.y, 10, 50);
  gun.shapeColor = "red";
  gun.velocityX = -3;
  gun.visible = false;
  pollutionGroup.add(pollution);
  gunGroup.add(gun);
}
   
function spawnMeteor() {
  rand = Math.round(random(1, 2));
  if (rand == 1) {
    meteor = createSprite(displayWidth - displayWidth - 50, displayHeight / 2 - displayHeight / 2 - 70);
    meteor.velocityX = Math.round(random(4, 7));
    meteor.velocityY = Math.round(random(4, 7));
    meteor.addImage(meteorImg1);
    meteor.scale = 0.3;
  }
  else if (rand == 2) {
    meteor = createSprite(displayWidth + 50, displayHeight / 2 - displayHeight / 2 - 70);
    meteor.velocityX = Math.round(random(-4, -7));
    meteor.velocityY = Math.round(random(4, 7));
    meteor.addImage(meteorImg2);
    meteor.scale = 0.3;
  }
  meteorGroup.add(meteor);
}