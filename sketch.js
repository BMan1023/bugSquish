var time = 30; //number of seconds that game lasts
var score = 0; //starting score
var bugCount = 35; //the number of bugs that you start with
var bug = []; //the array where bug objects are stored
var speed = 5; //starting speed of the bugs
var dir = [-1,1];
var clicks = 0;
var squishes = 0;
var acc;
var screen = 0;

function preload(){

  for(var i = 0; i < bugCount; i++) { //fills array with bugCount number of objects

    bug[i] = new bugEnemy("bug5.png", random(50, 610), random(70, 480), random(dir)); //instantiates bug objects

  }

}

function setup() {

  createCanvas(640,480);

  imageMode(CENTER);

  setInterval(clock, 1000);

}

function draw() {

  if(screen == 0){

    background(144);
    textSize(38);
    text('Bug Squish' 200, 250);
    textSize(28);
    text('-Press Anywhere to Start-' 175, 275);
    if(mouseIsPressed){
      changeScreen(1);
    }

  }
  else if(screen == 1){

    background(144);
  
    textSize(24);
  
    text('Score:', 10, 30); // "Score:" text
  
    text('Time:', 530 , 30); // "Time:" text
  
    textSize(28);
  
    if(score == bugCount){
      gameOver();
    }
  
    if(time > 0){
  
      text(time, 595 , 30); //prints the time as it counts down
  
    }
  
    else if(time == 0){ //game end condition
  
      gameOver();
  
    }
  
    text(score, 85 , 30);
  
    for(var i = 0; i < bugCount; i++) {
  
        bug[i].draw();
  
      }

  }
  else if(screen == 2){
    gameOver();
  }


}
function changeScreen(x){
  if(x == 0){
    screen = 0;
  }
  if(x == 1){
    screen = 1;
    time = 30;
  }
  if(x == 2){
    screen = 2;
  }
}

function mouseClicked() {

  clicks++;

  for(var i = 0; i < bugCount; i++) {

    bug[i].squish(mouseX,mouseY);

  }

  speed += 2; //rate at which bugs speed up

}

function clock(){

  if(time > 0){

    time--; //decrements time on the clock

  }

}

function gameOver(){

  text(time, 595 , 30);

  textSize(42);

  text('Game Over!', 200, 220);

  textSize(28);

  text('Score: ' + score, 250 , 250);

  textSize(22);

  text('Accuracy: ' + (int(squishes / clicks * 100)) + '%', 235 , 280);

  exit(); // my attempt at ending the game.... this line errors..... effectively ending the game.*shrug*

}

function scorePlus(){

  score++; //increments score

}

function bugEnemy(spriteSheet,x,y,moving) { //bug constructor

  this.spritesheet = loadImage(spriteSheet);
  this.frame = 0;
  this.x = x;
  this.y = y;
  this.moving = moving;
  this.facing = moving;
  this.squished = false;
  this.draw = function() {

    push();
    
    translate(this.x,this.y);

    if(this.facing < 0) { //facing left or right
      scale(-1.0,1.0);
    }
    if(this.squished == true) { //if bug has already been squished
        image(this.spritesheet,0,0,80,80,80,0,80,80);
    }
    else if(this.moving != 0) { //if the bug is moving and not squished

      if(this.frame == 0)

        image(this.spritesheet, 0, 0,80,80,160,0,80,80);

      if(this.frame == 1)

        image(this.spritesheet, 0, 0,80,80,240,0,80,80);

      if(this.frame == 2)

        image(this.spritesheet, 0, 0,80,80,320,0,80,80);

      if(this.frame == 3)

        image(this.spritesheet, 0, 0,80,80,400,0,80,80);

      if(frameCount%4 == 0) {

        this.frame = (this.frame + 1)%4;

        this.x = this.x + speed * this.moving;

        if(this.x < 40 || this.x > width-40) {

          this.moving = -this.moving;

          this.facing = -this.facing;

        }  

      }

    }

    pop();

  }

  this.squish = function(x,y) { //squish the bug

    if((this.x-40 < x && x < this.x+40 &&

      this.y-40 < y && y < this.y+40) && this.squished == false) {

      this.squished = true;

      squishes++;

      scorePlus();

    }

  }

}
