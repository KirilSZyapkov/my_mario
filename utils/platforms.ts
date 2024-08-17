export class Platforms {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;

  constructor(x: number, y: number) {
    this.position = {
      x,
      y,
    };
    this.width = 500;
    this.height = 30;
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
