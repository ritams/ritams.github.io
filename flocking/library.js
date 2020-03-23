// some utility functions

function getxy(x, y) {
  var x_ = x + centre.x;
  var y_ = centre.y - y;

  return { x: x_, y: y_ };
}

function angle(m1, m2) {
  return Math.atan((m1 - m2) / (1 + m1 * m2));
}

function clear(c) {
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function line(c, x1, y1, x2, y2, color = "black", lineWidth = 1) {
  var pos1 = getxy(x1, y1);
  var pos2 = getxy(x2, y2);

  c.beginPath();
  c.moveTo(pos1.x, pos1.y);
  c.lineTo(pos2.x, pos2.y);
  c.strokeStyle = color;
  c.lineWidth = lineWidth;
  c.stroke();
  c.closePath();
}

function lineRect(c, x, y, w, h, color = "black", lineWidth = 1) {
  var pos = getxy(x, y);
  c.beginPath();
  c.strokeStyle = color;
  c.lineWidth = lineWidth;
  c.strokeRect(pos.x, pos.y, w, h);
  c.closePath();
}

function circle(c, x, y, r, fill = false) {
  var pos = getxy(x, y);
  c.beginPath();
  c.arc(pos.x, pos.y, r, 0, Math.PI * 2);
  c.stroke();
  if (fill) {
    c.fill();
  }
  c.closePath();
}

function triangle(c, x1, y1, x2, y2, x3, y3, fill = false, color = "tomato") {
  var pos1 = getxy(x1, y1);
  var pos2 = getxy(x2, y2);
  var pos3 = getxy(x3, y3);

  c.beginPath();
  c.moveTo(pos1.x, pos1.y);
  c.lineTo(pos2.x, pos2.y);
  c.lineTo(pos3.x, pos3.y);
  c.lineTo(pos1.x, pos1.y);
  c.stroke();
  if (fill) {
    c.fillStyle = color;
    c.fill();
  }
  c.closePath();
}

function rotate(x, y, theta) {
  var x1 = x * Math.cos(theta) - y * Math.sin(theta);
  var y1 = x * Math.sin(theta) + y * Math.cos(theta);

  return { x: x1, y: y1 };
}
class V2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  len() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    var len = this.len();
    this.x /= len;
    this.y /= len;
    return this;
  }

  angle() {
    var theta = Math.atan(this.y / this.x);
    if (theta >= 0) {
      if (this.y >= 0) {
        return theta;
      } else {
        return Math.PI + theta;
      }
    } else {
      if (this.y > 0) {
        return Math.PI + theta;
      } else {
        return Math.PI * 2 + theta;
      }
    }
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mul(a) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  div(a) {
    this.x /= a;
    this.y /= a;
    return this;
  }

  dist(v) {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }

  limit(a) {
    if (this.len() > a) {
      this.normalize().mul(a);
    }
    return this;
  }

  setMag(a) {
    this.normalize().mul(a);
    return this;
  }
}

function random(a = -1, b = 1) {
  return a + Math.random() * (b - a);
}
