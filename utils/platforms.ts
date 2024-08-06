export class Platforms {
  position: {
    x: number;
    y: number;
  };
  with: number;
  height: number;

  constructor(x: number, y: number) {
    this.position = {
      x,
      y,
    };
    this.with = 500;
    this.height = 30;
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.with, this.height);
  }
}
