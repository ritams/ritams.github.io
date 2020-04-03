class Grid {
  constructor(cellSize = 100, gridSize = 400) {
    this.cellSize = cellSize;
    this.gridSize = gridSize;

    this.rows = Math.floor(this.gridSize / this.cellSize);
    this.cols = this.rows;

    this.cells = [];
    this.totalUnoccupied = Math.floor(this.rows * this.cols);

    for (let x = 0; x < this.cols; x++) {
      let temp = [];

      for (let y = 0; y < this.rows; y++) {
        temp.push(new Cell(x, y, this.cellSize));
      }
      // first index is x and 2nd index is y
      this.cells.push(temp);
    }

    // for intaraction purpose
    this.direction = undefined;
  }

  addValue() {
    if (this.totalUnoccupied == 0) {
      return false;
    }

    let rnd = randint(0, this.totalUnoccupied);
    let count = 0;
    let cell;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (!this.cells[x][y].occupied) {
          if (count == rnd) {
            cell = this.cells[x][y];
          }
          count++;
        }
        if (cell) break;
      }
      if (cell) break;
    }

    cell.occupied = true;
    this.totalUnoccupied--;

    let r = random(0, 1);
    if (r < 0.8) {
      cell.value = 2;
    } else {
      cell.value = 4;
    }

    return true;
  }

  moveCells() {
    let moved = false;
    if (this.direction == "up") {
      // look through the row one bellow the top row
      // move the cells one step ahead if possible
      // look through the next row
      // do the same

      let count = 0;
      while (count < 3) {
        for (let y = this.rows - 2; y >= 0; y--) {
          for (let x = 0; x < this.cols; x++) {
            if (this.cells[x][y].occupied) {
              if (!this.cells[x][y + 1].occupied) {
                // shift the row
                this.cells[x][y + 1].value = this.cells[x][y].value;
                this.cells[x][y + 1].occupied = true;

                // make the row empty
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                moved = true;
              } else if (this.cells[x][y + 1].value == this.cells[x][y].value) {
                this.cells[x][y + 1].value *= 2;
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                this.totalUnoccupied++;
                moved = true;
              }
            }
          }
        }
        count++;
      }
      if (moved) this.addValue();
    } else if (this.direction == "down") {
      //
      let count = 0;
      while (count < 3) {
        for (let y = 1; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
            if (this.cells[x][y].occupied) {
              if (!this.cells[x][y - 1].occupied) {
                // shift the row
                this.cells[x][y - 1].value = this.cells[x][y].value;
                this.cells[x][y - 1].occupied = true;

                // make the row empty
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                moved = true;
              } else if (this.cells[x][y - 1].value == this.cells[x][y].value) {
                this.cells[x][y - 1].value *= 2;
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                this.totalUnoccupied++;
                moved = true;
              }
            }
          }
        }
        count++;
      }
      if (moved) this.addValue();
    } else if (this.direction == "left") {
      //
      let count = 0;
      while (count < 3) {
        for (let x = 1; x < this.cols; x++) {
          for (let y = 0; y < this.rows; y++) {
            if (this.cells[x][y].occupied) {
              if (!this.cells[x - 1][y].occupied) {
                // shift the row
                this.cells[x - 1][y].value = this.cells[x][y].value;
                this.cells[x - 1][y].occupied = true;

                // make the row empty
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                moved = true;
              } else if (this.cells[x - 1][y].value == this.cells[x][y].value) {
                this.cells[x - 1][y].value *= 2;
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                this.totalUnoccupied++;
                moved = true;
              }
            }
          }
        }
        count++;
      }
      if (moved) this.addValue();
    } else if (this.direction == "right") {
      //
      let count = 0;
      while (count < 3) {
        for (let x = this.cols - 2; x >= 0; x--) {
          for (let y = 0; y < this.rows; y++) {
            if (this.cells[x][y].occupied) {
              if (!this.cells[x + 1][y].occupied) {
                // shift the row
                this.cells[x + 1][y].value = this.cells[x][y].value;
                this.cells[x + 1][y].occupied = true;

                // make the row empty
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                moved = true;
              } else if (this.cells[x + 1][y].value == this.cells[x][y].value) {
                this.cells[x + 1][y].value *= 2;
                this.cells[x][y].value = undefined;
                this.cells[x][y].occupied = false;
                this.direction = undefined;
                this.totalUnoccupied++;
                moved = true;
              }
            }
          }
        }
        count++;
      }
      if (moved) this.addValue();
    }
  }

  show(pen) {
    pen.stroke("white");
    pen.setStrokeWeight(2);

    for (let i = 0; i < this.rows; i++) {
      let y = i * this.cellSize;
      pen.line(0, y, this.gridSize, y);
    }
    for (let i = 0; i < this.cols; i++) {
      let x = i * this.cellSize;
      pen.line(x, 0, x, this.gridSize);
    }

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.cells[x][y].occupied) {
          this.cells[x][y].show(pen);
        }
      }
    }
    if (this.totalUnoccupied == 0) {
      pen.fill("rgb(255, 0, 0)");
      pen.noStroke();
      pen.text("Game Over", canvas.width / 2, canvas.height / 2, 50);
    }
  }
}

class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.posx = this.x * this.w;
    this.posy = (this.y + 1) * this.w;
    this.occupied = false;
    this.value = 0;
  }

  show(pen) {
    pen.stroke("white");
    pen.fill("grey");
    pen.setStrokeWeight(2);
    pen.rect(this.posx, this.posy, this.w, this.w);

    // write the value on that grid
    pen.fill("white");
    pen.noStroke();
    pen.text(this.value, this.posx + this.w / 2, this.posy - this.w * 0.7, 50);
  }
}
