var dog, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg1.png");
 dogHappy = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 330, 5, 5)
  dog.addImage(dogImg);
dog.scale=0.2;
  

  database = firebase.database();
  var foodStock = database.ref("fod");
  foodStock.on("value", readStock);
}


function draw() { 
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    foodStock = foodS - 1;
  }

  drawSprites();
  stroke ("yellow");
  textSize(20);
  fill ("white");
  text("food remaining: " + foodStock, 150, 220);
  text("press up arrow key to feed the dog milk!", 100, 50);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



