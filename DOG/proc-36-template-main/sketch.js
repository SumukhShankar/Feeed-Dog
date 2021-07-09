var dog,sadDog,happyDog, database;
var foodS,foodStock;


//create feed and lastFed variable here
var lastFedStock;
var lastfed;
var lastfedObj;
var addFood;
var feedFood;
var foodObj;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,700);

  foodObj = new Food();
  lastfedObj = new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  lastFedStock=database.ref('FeedTime');
  lastFedStock.on("value",ReadLastFed);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood=createButton("Feed");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to display text lastFed time here
  
  fill("white");
  textSize(15);
  if(lastfed>=12){
    text("Last Fed 12:00 PM",350,30);
  }else if(lastfed==0){
     text("Last Fed 12:00 AM",350 ,30);
  }else{
    text("Last Fed 10:00 AM",350,30);
  }

  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function ReadLastFed(data){
  lastfed=data.val();
  lastfedObj.updateFoodStock(lastfed);
}
 

function feedDog(){
  dog.addImage(happyDog);
  //write code here to update food stock and last fed time
  database.ref('/').update({
    FeedTime : lastfed + 1
  })

  var food_stock_val = foodObj.getFoodStock();

  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  
  
  database.ref('/').update({
    Food:food_stock_val
  })
  
  }
  


//function to add food in stock
function addFoods(){
  database.ref('/').update({
    FeedTime : lastfed - 1
  })

  dog.addImage(sadDog)
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


