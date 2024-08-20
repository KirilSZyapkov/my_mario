export class Platforms {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  image: any;

  constructor(x: number, y: number, image: any) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
