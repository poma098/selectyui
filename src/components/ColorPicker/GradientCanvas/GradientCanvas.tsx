import React, { useEffect, useRef } from "react";
import { GradientCanvasProps } from "../props.interface";

const GradientCanvas: React.FC<GradientCanvasProps> = ({
  hue,
  width,
  height,
  radius = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        // Создаем линейный градиент для оттенков
        const gradientX = ctx.createLinearGradient(0, 0, width, 0);
        gradientX.addColorStop(0, `hsl(${hue}, 0%, 100%)`);
        gradientX.addColorStop(1, `hsl(${hue}, 100%, 50%)`);

        // Создаем линейный градиент для яркости
        const gradientY = ctx.createLinearGradient(0, 0, 0, height);
        gradientY.addColorStop(1, "black");
        gradientY.addColorStop(0, "transparent");

        // Заполнение фона градиентами
        ctx.fillStyle = gradientX;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "multiply"; // Применяем умножение с вертикальным градиентом
        ctx.fillStyle = gradientY;
        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [hue, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ borderRadius: `${radius}px` }}/>;
};

export { GradientCanvas } ;
