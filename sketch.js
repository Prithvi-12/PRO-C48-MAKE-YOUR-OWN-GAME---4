var asteroid, asteroidImg;
var earth, earthImg;
var flight, flightImg;
var spaceImg;
var bullet, bulletImg, bulletGroup;
var asteroidGroup;
var score = 0;
var life = 3;

function preload(){
  asteroidImg = loadImage("asteroid.png");
  earthImg = loadImage("earth.png");
  flightImg = loadImage("Flight.png");
  spaceImg = loadImage("space.jpg");
  bulletImg = loadImage("rocket.png");
}

function setup(){
  createCanvas(800, 800);
  earth = createSprite(400,800);
  earth.addImage(earthImg);

  flight = createSprite(400,590);
  flight.addImage(flightImg);
  flight.scale = 0.5;

  bulletGroup = createGroup();
  asteroidGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
  title = createElement("h1");

}

function draw() {
  background(spaceImg);

  title.html("˜”*°•.𝔖𝔭𝔞𝔠𝔢 𝔖𝔥𝔬𝔬𝔱𝔢𝔯.•°*”˜");
  title.style('color:Yellow'); 
  title.position(255,-14);
  
  heading.html("Life: "+life);
  heading.style('color:turquoise'); 
  heading.position(150,20);

  scoreboard.html("Score: "+score);
  scoreboard.style('color:turquoise'); 
  scoreboard.position(width-200,20);

  if (frameCount % 80 === 0){
    drawasteroid();
  }

  if (keyDown("space")){
    shootBullet();
  }

  if (life <= 0){
    stroke("red");
    textSize(50);
    textFont("algerian");
    text("Mission Failed", 250, 400);
    asteroid.destroy();
  }

  if (asteroidGroup.collide(flight)){
    life = life - 1;
    asteroidGroup.destroyEach();
  }

  if (asteroidGroup.collide(earth)){
    stroke("red");
    textSize(50);
    textFont("algerian");
    text("Mission Failed", 250, 400);
    asteroidGroup.destroy();
    earth.destroy();
  }
  

  flight.x = mouseX;

  if(asteroidGroup.collide(bulletGroup)){
    handleasteroidCollision();
    score = score + 1;
  }
  drawSprites();
} 

function drawasteroid(){
  asteroid = createSprite(random(400,10),30,30);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.4;
  asteroid.velocityY = 5;
  asteroidGroup.add(asteroid);
}

function shootBullet(){
  bullet = createSprite(400, 590);
  bullet.x = flight.x-20;
  bullet.addImage(bulletImg);
  bullet.scale = 0.10;
  bullet.velocityY = -5;
  bulletGroup.add(bullet);
}
function handleasteroidCollision(){
  bulletGroup.destroyEach();
  asteroidGroup.destroyEach();
}