import React, { useRef, useEffect, useState } from "react";
import { PropsAmplitudeGraph } from "./props.interface";
import interpolateArray from "utils/interpolate";

const AmplitudeGraph: React.FC<PropsAmplitudeGraph> = ({
  amplitudes,
  targetPoints = amplitudes.length,
  barWidth,
  width = "600px",
  height = "400px",
  roundCorners = false,
  alignment = "bottom",
  barColor = "blue",
  incompleteBarColor = "rgba(0, 0, 255, 0.3)",
  gap = 2,
  progress = 1,
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 600, height: 400 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const parentWidth = container.clientWidth;
      const parentHeight = container.clientHeight;

      const numericWidth =
        typeof width === "string" && width.endsWith("%")
          ? parentWidth * (parseFloat(width) / 100)
          : typeof width === "number"
          ? width
          : parseInt(width as string, 10);

      const numericHeight =
        typeof height === "string" && height.endsWith("%")
          ? parentHeight * (parseFloat(height) / 100)
          : typeof height === "number"
          ? height
          : parseInt(height as string, 10);

      setCanvasSize({ width: numericWidth, height: numericHeight });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: numericWidth, height: numericHeight } = canvasSize;

    // Учитываем плотность пикселей на экране
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Устанавливаем физические размеры Canvas
    canvas.width = numericWidth * devicePixelRatio;
    canvas.height = numericHeight * devicePixelRatio;

    // Устанавливаем стильный размер (CSS)
    canvas.style.width = `${numericWidth}px`;
    canvas.style.height = `${numericHeight}px`;

    // Масштабируем контекст для высокой четкости
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Очистка холста
    ctx.clearRect(0, 0, numericWidth, numericHeight);

    // Если задана ширина столбика, вычисляем количество столбиков
    const calculatedTargetPoints = barWidth
      ? Math.floor(numericWidth / (barWidth + gap))
      : targetPoints;

    // Получаем адаптированный массив амплитуд
    const adjustedAmplitudes = interpolateArray(
      amplitudes,
      calculatedTargetPoints
    );

    // Рассчитываем количество видимых амплитуд
    const visibleCount = Math.floor(adjustedAmplitudes.length * progress);

    // Ширина одного столбика с учетом расстояния между ними
    const actualBarWidth =
      barWidth || Math.max(numericWidth / calculatedTargetPoints - gap, 0);

    // Рисуем столбики
    adjustedAmplitudes.forEach((amp, index) => {
      const isComplete = index < visibleCount;
      const color = isComplete ? barColor : incompleteBarColor;

      let barHeight = amp * numericHeight;
      let y = 0;

      if (alignment === "bottom") {
        y = numericHeight - barHeight;
      } else if (alignment === "middle") {
        y = (numericHeight - barHeight) / 2;
      }

      const x = index * (actualBarWidth + gap);

      if (roundCorners) {
        const radius = Math.max(Math.min(actualBarWidth / 2, barHeight / 2), 0);
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(
          x + actualBarWidth,
          y,
          x + actualBarWidth,
          y + barHeight,
          radius
        );
        ctx.arcTo(x + actualBarWidth, y + barHeight, x, y + barHeight, radius);
        ctx.arcTo(x, y + barHeight, x, y, radius);
        ctx.arcTo(x, y, x + actualBarWidth, y, radius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, actualBarWidth, barHeight);
      }
    });
  }, [
    amplitudes,
    targetPoints,
    barWidth,
    canvasSize,
    roundCorners,
    alignment,
    barColor,
    incompleteBarColor,
    gap,
    progress,
  ]);


  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", ...style }} className={className}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
        }}
      />
    </div>
  );
};

export { AmplitudeGraph };