
var monkey , monkey_running,invisibleground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime
var Play,End,gameState;


function preload(){
  
  
  monkey_running =                    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
   createCanvas(400,300)
  
//for creating monkey
  monkey = createSprite(40,250,10,10)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  invisibleground = createSprite(200,280,400,1)
 invisibleground.Visible=false;
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
background(180)
  stroke("black")
  fill("black")
  textSize(18)
  survivalTime=Math.ceil( frameCount/frameRate())
  
  stroke("skyblue")
  fill("black")
  textSize(14)
  text("Press 'space' to make the monkey jump",70,15)
   textSize(12)
  text("And collect the bananas",115,33)
  
   //for creating ground
  var ground = createSprite(200,280,400,5)
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x)
  
  
 if(gameState===Play){
   var num = Math.round(random(1,3))
  if (World.frameCount%100===0){
   if (num==1){
     obstacle();
   }
     if(num==2){
       banana();
   }      
    if(num==3){
       obstacle();
   }
 }
 
  
  //for making the monkey jump
  if(keyDown("space")&& monkey.y>= 220 ){
        monkey.velocityY = -12;
  }
   
  //for adding gravity
    monkey.velocityY=monkey.velocityY+0.5;
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach()
  }
   
  else
    
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.setVelocityXEach(0) 
    foodGroup.setVelocityXEach(0)
     ground.velocityX=0;
     gameState = End;
  }
 }
  
  if(gameState === End &&obstacleGroup.isTouching(monkey)){
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    
    
  }
  
  //stop trex from falling down
  monkey.collide(invisibleground);
  
   
  
  
  drawSprites(); 
  stroke("white")
  fill("black")
  textSize(15)
  text("Survival Time : "+survivalTime,200,50)
 }


function banana(){
  //for creating banana
   var banana =createSprite(400,Math.round(random(80,150)),10,10)
  banana.addImage(bananaImage);
   banana.velocityX=-4;
  banana.scale=0.1;
  banana.lifetime=100;
   foodGroup.add(banana)
}

 function obstacle(){
   //for creating obstacle  
   var obstacle = createSprite(400,260,10,40);
     obstacle.addImage(obstacleImage)
     obstacle.scale=0.1;
   obstacle.velocityX=-4;
     obstacleGroup.add(obstacle)
 }





