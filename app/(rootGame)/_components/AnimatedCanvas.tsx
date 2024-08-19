"use client";

import { useRef, useEffect, useState } from "react";
import { Player } from "@/utils/player";
import { Platforms } from "@/utils/platforms";

function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [player, setPlayer] = useState(new Player());
  const [platforms, setPlatforms] = useState<Platforms[]>(() => {
    let platforms = [];
    for (let index = 0; index < 10; index++) {
      if (index % 3 === 0) {
        platforms.push(new Platforms(index * 500 + 55, 500));
      } else if (index % 4 === 0) {
        platforms.push(new Platforms(index * 500, 400));
      } else {
        platforms.push(new Platforms(500, 500));
      }
    }
    return platforms;
  });

  console.log(platforms);
  

  const draw = (c: CanvasRenderingContext2D) => {
    c.fillStyle = "white";
    c.fillRect(0, 0, 1024, 576);
    player.update(c);
    platforms.forEach((platform) => {
      platform.draw(c);
    });
  };

  const updateCollisions = () => {
    setPlayer((curPlayer) => {
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

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "d":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityX = 2.5;
          return p;
        });
        break;
      case "a":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityX = -2.5;
          return p;
        });
        break;
      case "w":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityY = -5;
          return p;
        });
        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "d":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityX = 0;
          return p;
        });
        break;
      case "a":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityX = 0;
          return p;
        });
        break;
      case "w":
        setPlayer((curPlauer) => {
          let p = curPlauer;
          p.velocityY = -5;
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
