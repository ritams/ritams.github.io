let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let pen = new Pen(ctx);

let w = 40;
let rows = Math.floor(canvas.height / w);
let cols = Math.floor(canvas.width / w);

let snake, food;
let pause, dead, started;

function addFood() {
  let food = new Food(new V2d(randint(1, cols), randint(1, rows)), w);
  return food;
}

function gameOver() {
  pause = true;
  pen.push();
  pen.noStroke();
  pen.fill("rgb(255, 0, 0)");
  pen.text("Game Over", canvas.width / 2, canvas.height / 2);
  pen.pop();
}

function init() {
  started = false;
  pause = true;
  dead = false;
  let pos = new V2d(2, 5);
  snake = new Snake(pos, w);
  food = addFood();
}

init();

function drawGrid() {
  pen.push();
  pen.stroke("rgba(0, 0, 0, 0.1)");
  for (let i = 0; i < cols; i++) {
    x = i * w;
    pen.line(x, 0, x, canvas.height);
  }

  for (let i = 0; i < rows; i++) {
    y = i * w;
    pen.line(0, y, canvas.width, y);
  }
  pen.pop();
}

window.addEventListener("keydown", function(event) {
  let x = event.keyCode;

  if (x == 38) {
    if (snake.vel.y != -1) {
      snake.vel = new V2d(0, 1);
    } else {
      dead = true;
    }
  }
  if (x == 37) {
    if (snake.vel.x != 1) {
      snake.vel = new V2d(-1, 0);
    } else {
      dead = true;
    }
  }
  if (x == 39) {
    if (snake.vel.x != -1) {
      snake.vel = new V2d(1, 0);
    } else {
      dead = true;
    }
  }
  if (x == 40) {
    if (snake.vel.y != 1) {
      snake.vel = new V2d(0, -1);
    } else {
      dead = true;
    }
  }
  if (x == 32) {
    if (!dead) {
      pause = !pause;
      if (!started) {
        started = true;
      }
    } else {
      init();
    }
  }
});

let frameCount = 0;
function animate() {
  window.requestAnimationFrame(animate);
  pen.clear();

  // some stuff
  drawGrid();
  if (frameCount % 10 == 0) {
    frameCount = 0;

    // code
    if (!pause) {
      snake.move();
      if (snake.pos.dist(food.pos) <= 0.1) {
        snake.eat();
        food = addFood();
        snake.show(pen);
        food.show(pen);
      }
      dead = snake.checkHit();
    }
  }

  snake.show(pen);
  food.show(pen);
  pen.push();
  pen.fill("white");
  pen.text(
    `Score: ${snake.length - 1}`,
    canvas.width - 200,
    canvas.height - 100,
    (size = 50)
  );
  pen.pop();
  if (dead) {
    gameOver();
  } else if (!started) {
    pen.push();
    pen.stroke("green");
    pen.fill("rgba(0, 255, 0, 0.5)");
    pen.setStrokeWeight(2);
    pen.text("Press Space Bar to Start", canvas.width / 2, canvas.height / 2);
    pen.text(
      "Use Arrow keys to Play",
      canvas.width / 2,
      canvas.height / 2 - 100,
      50
    );
    pen.pop();
  } else {
    if (pause) {
      pen.push();
      pen.stroke("brown");
      pen.setStrokeWeight(2);
      pen.fill("rgba(100, 0, 0, 1)");
      pen.text("Paused", canvas.width / 2, canvas.height / 2);
      pen.text(
        "Press Space Bar to Resume",
        canvas.width / 2,
        canvas.height / 2 - 100,
        (size = 50)
      );
      pen.pop();
    }
  }

  frameCount++;
}

animate();
