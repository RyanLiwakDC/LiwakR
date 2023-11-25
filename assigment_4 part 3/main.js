// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// class for defining a ball
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Method to draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Function to update te ball position
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
 
  // check for balls colliding
  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB(); // if balls cllide give them a random color
        }
      }
    }
  }
  

} // end Ball class

// Create a new ball instance
const testBall = new Ball(50, 100, 4, 4, "blue", 10);

// Call the members of the ball instance
testBall.x;
testBall.size;
testBall.color;
testBall.draw();

// create Array
const balls = [];

// Loop with random size and position
while (balls.length < 25) { // Limit to 25 balls
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

// creates a new instance of Ball() with randmom values
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; //semi-transparent black (0.25)
  ctx.fillRect(0, 0, width, height); //fills the rectangle

  for (const ball of balls) {
    ball.draw(); //draws a ball
    ball.update(); //updates it to move the ball
    ball.collisionDetect(); // checks for balls colliding
  }

  requestAnimationFrame(loop);
}
// calls the loop function to start the animation
loop();
