let frogImg = new Image();
frogImg.src = "frog.png";
let snakeImg = new Image();
snakeImg.src = "snake.svg";
class Snake {
  constructor(pos, w = 10) {
    this.w = w;
    this.pos = pos;
    this.vel = new V2d(1, 0);
    this.body = [];
    this.length = 0;
    this.addPart();
  }

  addPart() {
    let part = new V2d(this.pos.x, this.pos.y);
    this.body.unshift(part);
    if (this.length > 0) {
      this.body.pop();
    } else {
      this.length = 1;
    }
  }

  show(pen) {
    for (let i = 0; i < this.length; i++) {
      if (i > 0) {
        pen.push();
        pen.fill("rgba(0, 150, 0, 1 )");
        // let d = map(i, 0, this.length - 1, 0, this.w / 2 - 12);

        pen.circle(
          (this.body[i].x + 1) * this.w + this.w / 2,
          (this.body[i].y + 1) * this.w - this.w / 2,
          this.w / 2
        );
        let pos = new V2d(
          (this.body[i].x + 1) * this.w + 5,
          (this.body[i].y + 1) * this.w - 5
        );
        pen.ctx.globalAlpha = map(i, 0, this.length, 1, 0);
        pen.image(frogImg, pos, this.w - 10, this.w - 10);

        pen.pop();
      } else {
        pen.push();
        let angle;
        if (this.vel.x == 1) {
          angle = 90;
        } else if (this.vel.x == -1) {
          angle = 270;
        } else if (this.vel.y == 1) {
          angle = 180;
        }

        let pos = new V2d(
          (this.pos.x + 1) * this.w - 5,
          (this.pos.y + 1) * this.w + 5
        );
        pen.rotate(angle, pos.x + this.w / 2 + 5, pos.y - this.w / 2 - 5);
        pen.image(snakeImg, pos, this.w + 10, this.w + 10);
        pen.pop();
      }
    }
  }

  move() {
    this.pos.add(this.vel);
    // this.pos.x = constrain(this.pos.x, 0, cols);
    // this.pos.y = constrain(this.pos.y, 0, rows);
    this.addPart();
  }

  eat() {
    let part = new V2d(this.pos.x, this.pos.y);
    this.body.unshift(part);
    this.length++;
  }

  checkHit() {
    let a, b;
    if (this.length > 1) {
      for (let i = 2; i < this.length; i++) {
        let d = this.body[0].dist(this.body[i]);
        if (d < 0.1) {
          a = true;
          break;
        } else {
          a = false;
        }
      }
    }
    let d = this.pos;
    if (d.x + 1 > cols || d.x < 0 || d.y > rows || d.y < 1) {
      b = true;
    } else {
      b = false;
    }
    return a || b;
  }
}

class Food {
  constructor(pos, w = 10) {
    this.w = w;
    this.pos = pos;
  }

  show(pen) {
    pen.push();
    let pos = new V2d((this.pos.x + 1) * this.w, (this.pos.y + 1) * this.w);
    pen.image(frogImg, pos, this.w, this.w);
    pen.pop();
  }
}
