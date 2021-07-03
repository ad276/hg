var sword, swordImage, enemyG, enemyImage, fruit1, fruit2,
    fruit3, banana, fruitG, fruit1Image, fruit2Image, fruit3Image, fruit4Image, score,gameOverImage;
var PLAY=1
var END=0
var gameState=PLAY
var fruitGroup;
var enemyG;
var gameOverSound, knifeSwooshSound;



function preload(){
  swordImage= loadImage("sword.png");
  enemyImage=loadAnimation("alien1.png","alien2.png")
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  bananaImage=loadImage("banana.png");
  gameOverImage=loadImage("gameover.png");
  gameOverSound = loadSound ("gameover.mp3");
  knifeSwooshSound = loadSound ("knifeSwooshSound.mp3");
 
}

function setup(){
  createCanvas(600, 600);
  
  sword=createSprite(200,200,100,100)
  sword.addImage(swordImage)
  sword.scale=1;
  
  
  
  
  fruitGroup = createGroup();
  enemyGroup= createGroup();
  score=0;
  
}

function draw(){
background("skyblue")
  
    if (gameState===PLAY) {
      sword.x=World.mouseX;
      sword.y=World.mouseY;
      fruits();
      enemy();
  
      if (fruitGroup.isTouching(sword)){
        fruitGroup.destroyEach();
        score=score+1
        knifeSwooshSound.play()
      }
    
      else{
        
       if(sword.isTouching(enemyGroup)) {
      enemyGroup.destroyEach()
      gameState=END;
      gameOverSound.play();
      fruitGroup.destroyEach()
      enemyGroup.setVelocityXEach(0)
      fruitGroup.setVelocityXEach(0)
      sword.addImage(gameOverImage)
      sword.scale=2
      sword.x=300
      sword.y=200
     
    }
     
    if (gameState===END){
       fruitGroup.setLifetimeEach(0);
       enemyGroup.setLifetimeEach(0);
     
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0); 
    }
      } 
    }
  

  drawSprites();
  
 text("Score: "+ score, 500,50);
  
}
  

function fruits (){
  
  if (World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position);
    
    if(position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    } 
    else 
    {
      if (position==2){
        fruit.x=0;
        fruit.velocityX= (7+(score/4));
      }
    }
      
       fruit.scale=0.2;
      var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(bananaImage);
              break;
      default: break;
    }
    fruit.y=Math.round(random(50,340));
  
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    }
  
  
  

  //fruit.velocityX =-6;
  
    
    
}

function enemy(){
if (World.frameCount%100===0){
 var enemy=createSprite(600,Math.round(random(30,400)),10,10)
  
 enemy.addAnimation("enemy_blinking",enemyImage)
  enemy.velocityX=-(8+(score/10));
  enemy.scale=0.75
  enemy.lifetime=150
  enemyGroup.add(enemy)
} 
}
