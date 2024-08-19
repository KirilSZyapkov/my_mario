const gravity: number = 0.1;

export class Player {
  position: { x: number; y: number };
  // velocity: { x: number; y: number };
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  

  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocityX = 0;
    this.velocityY = 5;
    // this.velocity = {
    //   x: 0,
    //   y: 5,
    // };
    this.width = 30;
    this.height = 30;
  }

  draw(c: CanvasRenderingContext2D): void {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(c: CanvasRenderingContext2D): void {
    this.draw(c);
    this.position.y += this.velocityY;
    this.position.x += this.velocityX;
    this.velocityY += gravity;
  }
}
