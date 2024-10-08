"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@/utils/player";
import { Platforms } from "@/utils/platforms";
import { createImage } from "@/utils/createImage";
import { GenericObjects } from "@/utils/genericObjects";

function AnimatedCanvas() {
  const longPlatformImg = createImage("assets/platform.png");
  const shortPlatformImg = createImage("assets/platformSmallTall.png");
  const playerStandRightImg = createImage("assets/spriteStandRight.png");
  const playerStandLeftImg = createImage("assets/spriteStandLeft.png");
  const playerRunRightImg = createImage("assets/spriteRunRight.png");
  const playerRunLeftImg = createImage("assets/spriteRunLeft.png");
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [player, setPlayer] = useState(
    new Player(
      playerStandRightImg,
      playerStandLeftImg,
      playerRunRightImg,
      playerRunLeftImg
    )
  );

  const [genericObjects] = useState<GenericObjects[]>(() => {
    return [
      new GenericObjects(-1, -1, createImage("assets/background.png")),
      new GenericObjects(0, 0, createImage("assets/hills.png")),
    ];
  });
  const [platforms] = useState<Platforms[]>(() => {
    let plat: Platforms[] = [];
    for (let index = 0; index < 32; index++) {
      if (index % 2 === 0) {
        if (index === 0) {
          plat.push(
            new Platforms(index * longPlatformImg.width, 500, longPlatformImg)
          );
        } else {
          plat.push(
            new Platforms(
              index * longPlatformImg.width + 350,
              500,
              longPlatformImg
            )
          );
        }
      } else if (index % 3 === 0) {
        plat.push(
          new Platforms(
            index * longPlatformImg.width + 500,
            430,
            shortPlatformImg
          )
        );
      } else {
        plat.push(
          new Platforms(index * longPlatformImg.width, 500, longPlatformImg)
        );
      }
    }
    return plat;
  });

  const draw = (c: CanvasRenderingContext2D) => {
    c.fillStyle = "white";
    c.fillRect(0, 0, 1024, 576);
    genericObjects.forEach((genericObject) => {
      genericObject.draw(c);
    });
    platforms.forEach((platform) => {
      platform.draw(c);
    });
    player.update(c);
  };

  const updateCollisions = (c: any) => {
    setPlayer((curPlayer) => {
      if (keys.right.pressed && curPlayer.position.x < 500 && km < 14000) {
        curPlayer.velocityX = 3;
      } else if (
        keys.left.pressed &&
        curPlayer.position.x > 230 &&
        km !== 14000
      ) {
        curPlayer.velocityX = -3;
      } else {
        curPlayer.velocityX = 0;
        if (keys.right.pressed && km < 14000) {
          km += 5;
          genericObjects.forEach((genericObject) => {
            genericObject.position.x -= 3;
          });
          platforms.forEach((platform) => {
            platform.position.x -= 5;
          });
        } else if (keys.left.pressed && km !== 14000) {
          km -= 5;
          genericObjects.forEach((genericObject) => {
            if (platforms[0].position.x !== 0) {
              genericObject.position.x += 3;
            }
          });

          platforms.forEach((platform) => {
            if (platforms[0].position.x !== 0) {
              platform.position.x += 5;
            }
          });
        }
      }

      platforms.forEach((platform) => {
        if (
          curPlayer.position?.y + curPlayer.height <= platform.position.y &&
          curPlayer.position?.y + curPlayer.height + curPlayer.velocityY >=
            platform.position.y &&
          curPlayer.position.x + curPlayer.width >= platform.position.x &&
          curPlayer.position.x <= platform.position.x + platform.width
        ) {
          let p = curPlayer;
          p.velocityY = 0;
          return p;
        }
      });

      if (curPlayer.position.y > c.height) {
        router.refresh();
      }

      if (km >= 14000) {
        router.refresh();
      }
      return curPlayer;
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        draw(context);
        updateCollisions(canvas);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  let keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
  };
  let km = 0;

  window.addEventListener("keydown", ({ key }) => {
    switch (key) {
      case "a":
        keys.left.pressed = true;
        player.currentPlayerPosition = player.playerPositions.run.left;
        player.currentCropWidth = player.playerPositions.run.cropWidth;
        player.width = player.playerPositions.run.width
        break;
      case "d":
        keys.right.pressed = true;
        player.currentPlayerPosition = player.playerPositions.run.right;
        player.currentCropWidth = player.playerPositions.run.cropWidth;
        player.width = player.playerPositions.run.width
        break;
    }
  });
  window.addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
        keys.left.pressed = false;
        player.currentPlayerPosition = player.playerPositions.stand.left;
        player.currentCropWidth = player.playerPositions.stand.cropWidth;
        player.width = player.playerPositions.stand.width
        break;
      case "d":
        keys.right.pressed = false;
        player.currentPlayerPosition = player.playerPositions.stand.right;
        player.currentCropWidth = player.playerPositions.stand.cropWidth;
        player.width = player.playerPositions.stand.width
        break;
    }
  });

  window.addEventListener("keypress", ({ key }) => {
    switch (key) {
      case "w":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityY = -4;
          return p;
        });
        break;
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={1024}
      height={576}
      className="flex border-2 border-black z-10"
    />
  );
}

export default AnimatedCanvas;
