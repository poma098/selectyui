import React, { useEffect, useRef } from "react";
import { ColorGradientBarProps } from "../props.interface";

const ColorGradientBar: React.FC<ColorGradientBarProps> = ({
  width = 300, // логическая ширина по умолчанию
  height = 20, // логическая высота по умолчанию
  radius = 0, // радиус закругления по умолчанию
  colors = [
    "#FF0000", // 1
    "#FFFF00", // 2
    "#00FF00", // 1
    "#00FFFF", // 2
    "#0000FF", // 1
    "#FF00FF", // 2
    "#FF0000", // 1
  ],
  direction = "horizontal",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1; // Определяем devicePixelRatio (1 по умолчанию)

    if (canvas) {
      // Увеличиваем размер холста для поддержки высокого DPI
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Устанавливаем логический размер, чтобы он оставался корректным на экране
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Масштабируем содержимое для учета высокого DPI
        ctx.scale(dpr, dpr);

        // Очистка предыдущего содержимого
        ctx.clearRect(0, 0, width, height);

        // Определяем направление градиента
        let y0 = 0,
            x1 = 0,
            y1 = 0;

        switch (direction) {
          case "horizontal":
            x1 = width;
            break;
          case "vertical":
            y1 = height;
            break;
          case "diagonal-down":
            x1 = width;
            y1 = height;
            break;
          case "diagonal-up":
            x1 = width;
            y0 = height;
            break;
          default:
            x1 = width;
        }

        // Создаем линейный градиент
        const gradient = ctx.createLinearGradient(0, y0, x1, y1);
        const step = 1 / (colors.length - 1);
        colors.forEach((color, index) => {
          gradient.addColorStop(index * step, color as string);
        });

        // Заливаем градиентом
        ctx.fillStyle = gradient;

        // Закругленные углы
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arcTo(width, 0, width, height, 0);
        ctx.arcTo(width, height, 0, height, 0);
        ctx.arcTo(0, height, 0, 0, 0);
        ctx.arcTo(0, 0, width, 0, 0);
        ctx.closePath();

        // Рисуем путь
        ctx.fill();
      }
    }
  }, [width, height, radius, colors, direction]);

  return (
    <canvas
      ref={canvasRef}
      style={{ borderRadius: radius, display: "block" }}
    />
  );
};

export { ColorGradientBar };
