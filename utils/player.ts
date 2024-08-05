const gravity: number = 0.1;

export class Player {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  with: number;
  height: number;
  constructor() {
    this.position = {
      x: 10,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 5,
    };
    this.with = 30;
    this.height = 30;
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.with, this.height);
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.velocity.y += gravity;
  }
}
