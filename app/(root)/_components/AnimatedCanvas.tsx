"use client";

import { useRef, useEffect, useState } from "react";
import { Player } from "@/utils/player";
import { Platforms } from "@/utils/platforms";

function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  let x = 50;
  let y = 50;
  let vx = 2;
  let vy = 2;
  const radius = 20;

  const draw = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();

    // Update the position of the ball
    x += vx;
    y += vy;

    // Bounce the ball off the walls
    if (x + radius > context.canvas.width || x - radius < 0) {
      vx = -vx;
    }
    if (y + radius > context.canvas.height || y - radius < 0) {
      vy = -vy;
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
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

  return <canvas ref={canvasRef} width={500} height={500} />;
}

export default AnimatedCanvas;
