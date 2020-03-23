var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d");
var centre = { x: 0, y: canvas.height };

var birds = [];
for (var i = 0; i < 300; i++) {
  var pos = new V2d(random(0, canvas.width), random(0, canvas.height));
  var vel = new V2d(random(), random());
  var acc = new V2d();
  birds.push(new Bird(pos, vel, acc, 7));
}

// var x, y, a, r3;
// x = 200;
// y = 200;
// a = 200;
// r3 = Math.sqrt(3);

var pos = new V2d(-500, 200);
var vel = new V2d(1, 1);
var acc = new V2d();

console.log((vel.angle() * 180) / Math.PI);

var bird = new Bird(pos, vel, acc, 10);
bird.draw(c);
function animate() {
  window.requestAnimationFrame(animate);
  clear(c);
  for (var i = 0; i < birds.length; i++) {
    birds[i].draw(c);
    birds[i].move();
    birds[i].stear(birds);
  }
  // bird.draw(c);

  // bird.move();
  // // console.log(bird.a, bird.theta);
}

animate();
