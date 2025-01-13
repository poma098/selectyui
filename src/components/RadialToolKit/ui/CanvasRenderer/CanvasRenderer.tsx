import React, { useEffect, useRef, useState } from "react"
import { CanvasRendererProps } from "../../props.interface";
import Style from "./CanvasRadialToolKit.module.css";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import drawGradientTriangle from "../../utils/drawGradientTriangle";
import SETTINGS_ANIMATIONS from "../../SETTINGS_ANIMATIONS";
import calculateShortestAngle from "../../utils/calculateShortestAngle";
import normalizeAngle from "../../utils/normalizeAngle";
const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  outerSize,
  colors,
  rotationAngle,
  animationDuration,
  activeIndex,
  triangleAngle,
  magnetization,
  animation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [animatedAngle, setAnimatedAngle] = useState(rotationAngle);
  const [animatedTriangleAngle, setAnimatedTriangleAngle] =
    useState(triangleAngle);
  const [isMore200, setIsMore200] = useState(false);

  useAnimationFrame(() => {
    setAnimatedAngle((prev) => {
      const angle = magnetization
        ? (activeIndex ?? 0) * triangleAngle
        : rotationAngle;
      const delta =
        calculateShortestAngle(prev, angle) * (16 / animationDuration);
      return Math.abs(delta) < 0.01 ? angle : normalizeAngle(prev + delta);
    });
  }, [
    rotationAngle,
    animationDuration,
    activeIndex,
    triangleAngle,
    magnetization,
  ]);

  useAnimationFrame(() => {
    setAnimatedTriangleAngle((prev) => {
      if (!isMore200) return 0;
      const delta = (triangleAngle - prev) * (16 / animationDuration);
      return Math.abs(delta) < 0.01 ? triangleAngle : prev + delta;
    });
  }, [triangleAngle, animationDuration, isMore200]);

  useEffect(() => {
    const timeout = setTimeout(
      () => setIsMore200(true),
      SETTINGS_ANIMATIONS.circle.visibleSection[animation]
    );
    return () => clearTimeout(timeout);
  }, [animation]);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const devicePixelRatio = window.devicePixelRatio || 1;

        canvas.width = outerSize * devicePixelRatio;
        canvas.height = outerSize * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGradientTriangle(ctx, animatedTriangleAngle, animatedAngle, colors);
      }
    }
  }, [animatedAngle, animatedTriangleAngle, colors, outerSize]);

  return (
    <canvas
      ref={canvasRef}
      className={Style.canvas}
      height={outerSize}
      width={outerSize}
    ></canvas>
  );
};

export default CanvasRenderer;