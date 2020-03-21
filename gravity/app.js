var canvas = document.querySelector("canvas");
// console.log(canvas);

canvas.height = innerHeight;
canvas.width = innerWidth;

var c = canvas.getContext("2d");

class Ball {
  constructor(x, y, radius, vx = 0, vy = 0, color = "black") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  drop(env) {
    this.vy += env.g;
  }

  rebound(env) {
    if (
      this.x + this.radius + this.vx >= canvas.width ||
      this.x - this.radius + this.vx <= 0
    ) {
      this.vx = -this.vx * env.friction;
    }

    if (
      this.y + this.radius + this.vy >= canvas.height ||
      this.y - this.radius + this.vy <= 0
    ) {
      this.vy = -this.vy * env.friction;
    }
  }

  collision(other) {
    var dx = other.x - this.x;
    var dy = other.y - this.y;
    var dis = Math.sqrt(dx ** 2 + dy ** 2);

    if (dis <= this.radius + other.radius) {
      this.color = "red";
      other.color = "red";

      var theta = Math.atan(dy / dx);

      this.v = Math.sqrt(this.vx ** 2 + this.vy ** 2);
      other.v = Math.sqrt(other.vx ** 2 + other.vy ** 2);

      this.vx = -this.v * Math.cos(theta);
      this.vy = -this.v * Math.cos(theta);

      other.vx = -other.v * Math.cos(theta);
      other.vy = -other.v * Math.cos(theta);
    } else {
      this.color = "black";
      other.color = "black";
    }
  }
}

class Environment {
  constructor(g, friction) {
    this.g = g;
    this.friction = friction;
  }
}

var color = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"];

function pick(list) {
  var n = list.length;
  var i = Math.floor(Math.random() * n);
  return list[i];
}

var ballArray;
function init() {
  ballArray = [];
  for (var i = 0; i < 200; i++) {
    radius = 2 + Math.random() * 15;
    x = radius + Math.random() * (innerWidth - 2 * radius);
    y = radius + Math.random() * (innerHeight - 2 * radius);
    vx = (Math.random() - 0.5) * 10;
    vy = (Math.random() - 0.5) * 10;
    color_ = pick(color);
    ballArray.push(new Ball(x, y, radius, vx, vy, color_));
  }
}

window.addEventListener("click", function() {
  init();
});

window.addEventListener("resize", function() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  init();
});

init();

var env = new Environment(0.5, 0.85);
var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

ball1 = new Ball(500, 500, 100, 0, 0);
ball2 = new Ball(100, 100, 50, 5, 5);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < ballArray.length; i++) {
    ball = ballArray[i];
    ball.move();
    ball.drop(env);
    ball.rebound(env);
    ball.draw();
  }

  // ball1.draw();
  // ball2.draw();
  // ball1.move();
  // ball2.move();

  // ball1.rebound(env);
  // ball2.rebound(env);
  // ball1.collision(ball2);
}

animate();
