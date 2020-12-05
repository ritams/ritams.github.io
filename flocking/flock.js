class Bird {
  constructor(pos, vel, acc, a) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.a = a;

    this.theta = this.vel.angle();
    this.perception = 100;
    this.maxSpeed = 5;
    this.maxForce = 1;

    this.maxAlignmet = 0.5;
    this.maxCohesion = 0.5;
    this.maxSeparation = 2;
  }

  move() {
    this.acc.limit(this.maxForce);
    this.vel.setMag(this.maxSpeed);
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    // var rnd = new V2d(random(-0.05, 0.05), random(-0.05, 0.05));
    // this.vel.add(rnd);
    this.theta = this.vel.angle();

    if (this.pos.x > canvas.width) {
      this.pos.x = this.pos.x - canvas.width;
    } else if (this.pos.x < 0) {
      this.pos.x = canvas.width + this.pos.x;
    }

    if (this.pos.y > canvas.height) {
      this.pos.y = this.pos.y - canvas.height;
    } else if (this.pos.y < 0) {
      this.pos.y = canvas.height + this.pos.y;
    }
  }

  draw(c) {
    var x1, y1, x2, y2, x3, y3, r3;
    r3 = Math.sqrt(3);

    y1 = -this.a / 2;
    x1 = -this.a / (2 * r3);

    x2 = x1;
    y2 = -y1;

    y3 = 0;
    x3 = (this.a / r3) * 2;

    var pos1 = rotate(x1, y1, this.theta);
    var pos2 = rotate(x2, y2, this.theta);
    var pos3 = rotate(x3, y3, this.theta);

    x1 = pos1.x + this.pos.x;
    y1 = pos1.y + this.pos.y;

    x2 = pos2.x + this.pos.x;
    y2 = pos2.y + this.pos.y;

    x3 = pos3.x + this.pos.x;
    y3 = pos3.y + this.pos.y;

    triangle(c, x1, y1, x2, y2, x3, y3, true);

    // circle(c, this.x, this.y, this.a, true);
  }

  stear(flock) {
    var avgVel = new V2d(); //new V2d(this.vel.x, this.vel.y);
    var avgPos = new V2d(); //new V2d(this.pos.x, this.pos.y);
    var avgSep = new V2d();
    var count = 1;
    avgVel.add(this.vel);
    avgPos.add(this.pos);
    for (var i = 0; i < flock.length; i++) {
      var other = flock[i];
      var pos = new V2d(this.pos.x, this.pos.y);
      var d = this.pos.dist(other.pos);
      if (this != other && d < this.perception) {
        count++;
        avgVel.add(other.vel);
        avgPos.add(other.pos);
        avgSep.add(pos.sub(other.pos).div(d * 0.9));
        // console.log(avgSep);
      }
    }

    if (count > 1) {
      avgVel.div(count);
      avgPos.div(count);
      avgSep.div(count - 1);
    }

    this.avgSep = avgSep;
    avgVel = avgVel.sub(this.vel).limit(this.maxAlignmet);
    avgPos = avgPos.sub(this.pos).limit(this.maxCohesion);
    avgSep = avgSep.limit(this.maxSeparation);
    // console.log(avgSep);

    this.acc.mul(0);
    this.acc.add(avgVel);
    this.acc.add(avgPos);
    this.acc.add(avgSep);
  }
}
