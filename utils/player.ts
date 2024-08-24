const gravity: number = 0.1;

export class Player {
  position: { x: number; y: number };
  // velocity: { x: number; y: number };
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  image: any;
  frames: number;
  playerPositions: {
    stand: { right: any; left: any; cropWidth: number; width: number };
    run: { right: any; left: any; cropWidth: number; width: number };
  };
  currentPlayerPosition: any;
  currentCropWidth: number;

  constructor(
    playerStandRightImg: any,
    playerStandLeftImg: any,
    playerRunRightImg: any,
    playerRunLeftImg: any
  ) {
    this.position = {
      x: 200,
      y: 100,
    };
    this.velocityX = 0;
    this.velocityY = 5;
    // this.velocity = {
    //   x: 0,
    //   y: 5,
    // };
    this.width = 66;
    this.height = 150;
    this.frames = 0;
    this.playerPositions = {
      stand: {
        right: playerStandRightImg,
        left: playerStandLeftImg,
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: playerRunRightImg,
        left: playerRunLeftImg,
        cropWidth: 341,
        width: 127.875,
      },
    };
    this.currentPlayerPosition = this.playerPositions.stand.right;
    this.currentCropWidth = 177;
  }

  draw(c: CanvasRenderingContext2D): void {
    c.drawImage(
      this.currentPlayerPosition,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(c: CanvasRenderingContext2D): void {
    this.frames++;
    if (
      this.frames > 58 &&
      (this.currentPlayerPosition === this.playerPositions.stand.right ||
        this.currentPlayerPosition === this.playerPositions.stand.left)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 29 &&
      (this.currentPlayerPosition === this.playerPositions.run.right ||
        this.currentPlayerPosition === this.playerPositions.run.left)
    ) {
      this.frames = 0;
    }
    this.draw(c);
    this.position.y += this.velocityY;
    this.position.x += this.velocityX;
    this.velocityY += gravity;
  }
}
