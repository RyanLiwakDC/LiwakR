// set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// for adding ball counter
const counter = document.querySelector('p');
let count = 0;

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Create a class Shape
class Shape {

   constructor(x, y, velX, velY) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
   }  
}

// Creat Ball class
class Ball extends Shape {

   constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY); // Pass in x, y, velX, velY
      this.color = color;
      this.size = size;
      this.exists = true;
   }

   // Method to draw the ball
   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   // Method to update the ball movement
   update() {
      if ((this.x + this.size) >= width) {
         this.velX = -(Math.abs(this.velX));
      }

      if ((this.x - this.size) <= 0) {
         this.velX = Math.abs(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(Math.abs(this.velY));
      }

      if ((this.y - this.size) <= 0) {
         this.velY = Math.abs(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }

   // Method to detect collisions and if ball exists
   collisionDetect() {
      for (const ball of balls) {
        if (!(this === ball) && ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
        }
      }
    }

}

// Create EvilCircle class
class EvilCircle extends Shape {
   constructor(x, y) { // pass in only x, y
      super(x, y, 20, 20);
      this.color = "white";
      this.size = 10;

      // If keys pressed it will shift the EvilCircle shape on screen
      window.addEventListener("keydown", (e) => {
         switch (e.key) {
           case "a":
             this.x -= this.velX;
             break;
           case "d":
             this.x += this.velX;
             break;
           case "w":
             this.y -= this.velY;
             break;
           case "s":
             this.y += this.velY;
             break;
         }
       });

   }
   
   // Method to draw the evil ball
   draw() {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
   }

   // Method to keep Evil Circel in the screen boundary
   checkBounds() {
      if ((this.x + this.size) >= width) {
         this.x = -(Math.abs(this.size));
      }

      if ((this.x - this.size) <= 0) {
         this.x = Math.abs(this.size);
      }

      if ((this.y + this.size) >= height) {
         this.y = -(Math.abs(this.size));
      }

      if ((this.y - this.size) <= 0) {
         this.y = Math.abs(this.size);
      }

   }

   // Method to detect is Evil Circle runs into a ball
   collisionDetect() {
      for (const ball of balls) {
        if (ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + ball.size) {
            ball.exists = false;
            count--;
            counter.textContent = "Ball count: " +count;
          }
        }
      }
    }

}

const balls = [];

while (balls.length < 25) {
   const size = random(10,20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  balls.push(ball);
  count++;
  counter.textContent = "Ball Count: " +count;
}

// Declare the evilCircle object
const evilCircle = new EvilCircle(random(0, width), random(0, height));

// Loop in which ball and Evil Circle are updated
function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) {
      if (ball.exists) {
         ball.draw();
         ball.update();
         ball.collisionDetect();         
      }
   }

   evilCircle.draw();
   evilCircle.checkBounds();
   evilCircle.collisionDetect();

   requestAnimationFrame(loop);
}

// Calls the main loop function
loop();
