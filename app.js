var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style = { "background-color": "grey" };

var c = canvas.getContext("2d");

class Circle {
  constructor(x, y, radius, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.maxRadius = 40;
    this.minRadius = this.radius;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
  }
  render(stroke = false, fill = true) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    if (stroke) {
      c.stroke();
    }
    if (fill) {
      c.fillStyle = this.color;
      c.fill();
    }
    c.closePath();
  }

  update() {
    if (this.vx != undefined) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
        this.vx = -this.vx;
      }
      if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
        this.vy = -this.vy;
      }
    }
  }

  grow() {
    if (this.radius < this.maxRadius) {
      this.radius += 2;
    }
  }
  shrink() {
    if (this.radius > this.minRadius) {
      this.radius -= 2;
    }
  }
}

var color = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"];
function pick(list) {
  var n = list.length;
  var i = Math.floor(Math.random() * n);
  return list[i];
}

var mouse = {
  x: undefined,
  y: undefined
};

addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  init();
});
window.addEventListener("click", function() {
  init();
});

var circleArray;

function init() {
  circleArray = [];
  for (var i = 0; i < 100; i++) {
    radius = 2 + Math.random() * 5;
    x = radius + Math.random() * (innerWidth - 2 * radius);
    y = radius + Math.random() * (innerHeight - 2 * radius);
    vx = (Math.random() - 0.5) * 6;
    vy = (Math.random() - 0.5) * 6;
    color_ = pick(color);
    circleArray.push(new Circle(x, y, radius, vx, vy, color_));
  }
}

init();
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  for (var i = 0; i < circleArray.length; i++) {
    circle = circleArray[i];
    circle.render();
    if (Math.sqrt((circle.x - mouse.x) ** 2 + (circle.y - mouse.y) ** 2) < 75) {
      circle.grow();
    } else {
      circle.shrink();
    }
    circle.update();
  }
  c.strokeStyle = "green";
  c.font = "50px Arial";
  c.textAllign = "center"
  c.strokeText("Things will be posted Soon", canvas.width / 2, canvas.height / 2);
}
animate();
