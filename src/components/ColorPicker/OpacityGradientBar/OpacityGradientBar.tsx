import React, { useEffect, useRef } from "react";
import { OpacityGradientBarProps } from "../props.interface";
import cn from "classnames";
import { hslaToHex } from "utils/color/convert";

const OpacityGradientBar: React.FC<OpacityGradientBarProps> = ({
  width = 300,
  height = 20,
  radius = 5,
  colors,
  gridSize = 10,
  gridColor = "#87878747",
  rotation = 0,
  style,
  className,
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    if (canvas) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Рисуем сетку
        for (let y = 0; y < height; y += gridSize) {
          for (let x = 0; x < width; x += gridSize) {
            if ((x / gridSize) % 2 ^ (y / gridSize) % 2) {
              ctx.fillStyle = gridColor;
              ctx.fillRect(x, y, gridSize, gridSize);
            }
          }
        }

        // Угол в радианах
        const angleInRadians = ((rotation % 360) * Math.PI) / 180;

        // Определяем границы холста
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        // Вычисляем направление градиента
        const sinAngle = Math.sin(angleInRadians);
        const cosAngle = Math.cos(angleInRadians);

        // Начальные и конечные координаты
        let x0, y0, x1, y1;

        // Логика: ищем точки пересечения с границами прямоугольника
        if (Math.abs(sinAngle) > Math.abs(cosAngle)) {
          // Градиент больше направлен вертикально
          x0 = halfWidth - (halfHeight * cosAngle) / sinAngle;
          y0 = 0;
          x1 = halfWidth + (halfHeight * cosAngle) / sinAngle;
          y1 = height;
        } else {
          // Градиент больше направлен горизонтально
          x0 = 0;
          y0 = halfHeight - (halfWidth * sinAngle) / cosAngle;
          x1 = width;
          y1 = halfHeight + (halfWidth * sinAngle) / cosAngle;
        }

        // Создаём линейный градиент
        const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
        
        colors.forEach(({ color, position }) => {
          gradient.addColorStop(position, hslaToHex(color) as string);
        });

        // ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = gradient;

        // Закруглённые углы
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arcTo(width, 0, width, height, 0);
        ctx.arcTo(width, height, 0, height, 0);
        ctx.arcTo(0, height, 0, 0, 0);
        ctx.arcTo(0, 0, width, 0, 0);
        ctx.closePath();

        // Применяем поворот

        // Рисуем путь
        ctx.fill();

        ctx.restore();
      }
    }
  }, [width, height, radius, colors, gridSize, gridColor, rotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{ borderRadius: radius, display: "block", ...style }}
      className={cn(className)}
      onClick={onClick}
    />
  );
};

export default OpacityGradientBar;
