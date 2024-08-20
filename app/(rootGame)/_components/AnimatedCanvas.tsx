"use client";

import { useRef, useEffect, useState } from "react";
import { Player } from "@/utils/player";
import { Platforms } from "@/utils/platforms";

function AnimatedCanvas() {
  const platformImg = new Image();
  platformImg.src = "assets/platform.png";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [player, setPlayer] = useState(new Player());
  const [platforms, setPlatforms] = useState<Platforms[]>(() => {
    let plat: Platforms[] = [];
    for (let index = 0; index < 32; index++) {
      if (index % 2 === 0) {
        if (index === 0) {
          plat.push(new Platforms(index * platformImg.width, 500, platformImg));
        } else {
          plat.push(
            new Platforms(index * platformImg.width + 660, 500, platformImg)
          );
        }
      } else if (index % 3 === 0) {
        plat.push(
          new Platforms(index * platformImg.width + 660, 280, platformImg)
        );
      } else {
        plat.push(new Platforms(index * platformImg.width, 500, platformImg));
      }
    }
    return plat;
  });

  const draw = (c: CanvasRenderingContext2D) => {
    c.fillStyle = "white";
    c.fillRect(0, 0, 1024, 576);

    platforms.forEach((platform) => {
      platform.draw(c);
    });
    player.update(c);
  };

  const updateCollisions = () => {
    setPlayer((curPlayer) => {
      if (keys.right.pressed && curPlayer.position.x < 500) {
        curPlayer.velocityX = 3;
      } else if (keys.left.pressed && curPlayer.position.x > 230) {
        curPlayer.velocityX = -3;
      } else {
        curPlayer.velocityX = 0;
        if (keys.right.pressed) {
          km += 5;
          platforms.forEach((platform) => {
            platform.position.x -= 5;
          });
        } else if (keys.left.pressed) {
          km -= 5;
          console.log(player.velocityX);

          if (curPlayer.velocityX !== 200) {
            platforms.forEach((platform) => {
              platform.position.x += 5;
            });
          }
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
      return curPlayer;
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    updateCollisions();
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        draw(context);
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
        break;
      case "d":
        keys.right.pressed = true;
        break;
    }
  });
  window.addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
        keys.left.pressed = false;
        break;
      case "d":
        keys.right.pressed = false;
        break;
    }
  });

  window.addEventListener("keypress", ({ key }) => {
    switch (key) {
      case "w":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityY = -6.7;
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
      className="flex border-2 border-black"
    />
  );
}

export default AnimatedCanvas;
