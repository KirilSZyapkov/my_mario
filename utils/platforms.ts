
export class Platforms {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  image: any

  constructor(x: number, y: number, image:any) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw(c: CanvasRenderingContext2D) {
    c.drawImage(this.image, this.width, this.height);
  }
}
