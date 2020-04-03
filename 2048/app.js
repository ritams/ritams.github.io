let canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 400;
canvas.style.backgroundColor = "grey";

let ctx = canvas.getContext("2d");
let pen = new Pen(ctx);

// add an event listner for key pressing
window.addEventListener("keydown", function (event) {
  let x = event.keyCode;

  if (x == 37) {
    // left
    grid.direction = "left";
  }
  if (x == 38) {
    // up
    grid.direction = "up";
  }
  if (x == 39) {
    // right
    grid.direction = "right";
  }
  if (x == 40) {
    // down
    grid.direction = "down";
  }
  if (x == 32) {
    grid.addValue();
  }

  grid.moveCells();
});

let grid = new Grid();
for (let i = 0; i < 2; i++) {
  let flag = grid.addValue();
  console.log(flag);
  if (!flag) break;
}

function animate() {
  window.requestAnimationFrame(animate);
  pen.clear();
  grid.show(pen);
}
animate();
