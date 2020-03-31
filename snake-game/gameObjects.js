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
    pen.push();
    pen.fill("grey");
    for (let i = 0; i < this.length; i++) {
      pen.rect(
        this.body[i].x * this.w,
        this.body[i].y * this.w,
        this.w,
        this.w
      );
    }
    pen.pop();
  }

  move() {
    this.pos.add(this.vel);
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
    if (d.x > cols || d.x < 0 || d.y > rows || d.y < 0) {
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
    pen.noStroke();
    pen.fill("red");
    pen.rect(this.pos.x * this.w, this.pos.y * this.w, this.w, this.w);
    pen.pop();
  }
}
