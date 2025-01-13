import Style from "./CircleRadialToolKit.module.css";
import { PropsCircleRadialToolKit } from "./props.interface";
import { useEffect, useRef, useState } from "react";
import drawGradientTriangle from "./utils/drawGradientTriangle";
import normalizeAngle from "./utils/normalizeAngle";
import calculateShortestAngle from "./utils/calculateShortestAngle";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { RadialBlur } from "../RadialBlur/RadialBlur";
import { hexToHsl, hslToHex } from "utils";
import { useUITheme } from "context/UIContext";
import React  from "react";

function CircleRadialToolKit({
  outerSize = 100,
  innerSize = 30,
  outerColor = "#86868626",
  rotationAngle = 0,
  triangleAngle = 60,
  animationDuration = 300,
  borderWidth = 3,
  colors = ["#00000040", "#0000"],
  activeItem,
  activeIndex,
  boxShadow = true,
  circleVisibleIcon = true,
  magnetization = false,
  style,
  className,
  animation
}: PropsCircleRadialToolKit) {
  const { realTheme } = useUITheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animatedAngle, setAnimatedAngle] = useState(rotationAngle);
  const [animatedTriangleAngle, setAnimatedTriangleAngle] =
    useState(triangleAngle);
  const [isMore200, setIsMore200] = useState(false);

  const color = hslToHex(hexToHsl(colors[0]))
  const KShadow = outerSize / 3.5

  useEffect(() => {
    let animationFrameId: number;
    const animateRotation = () => {
      setAnimatedAngle((prev) => {
        let angle = rotationAngle;
        if (magnetization) {
          angle = (activeIndex ?? 0) * triangleAngle;
        }
        const shortestDelta = calculateShortestAngle(prev, angle);
        const delta = shortestDelta * (16 / animationDuration); // Плавный переход

        if (Math.abs(delta) < 0.01) return angle; // Завершение анимации
        return normalizeAngle(prev + delta); // Угол остаётся в [0, 360)
      });
      animationFrameId = requestAnimationFrame(animateRotation);
    };
    animateRotation();
    return () => cancelAnimationFrame(animationFrameId);
  }, [rotationAngle, animationDuration, activeIndex, triangleAngle, magnetization]);

  useEffect(() => {
    let animationFrameId: number;
    const animateTriangleAngle = () => {
      setAnimatedTriangleAngle((prev) => {
        if (!isMore200) return 0;
        const delta = (triangleAngle - prev) * (16 / animationDuration); // Плавный переход
        if (Math.abs(delta) < 0.1) return triangleAngle; // Завершение анимации
        return prev + delta;
      });
      animationFrameId = requestAnimationFrame(animateTriangleAngle);
    };
    animateTriangleAngle();
    return () => cancelAnimationFrame(animationFrameId);
  }, [triangleAngle, animationDuration, isMore200]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Учитываем плотность пикселей на экране
        const devicePixelRatio = window.devicePixelRatio || 1;

        // Устанавливаем физические размеры Canvas
        canvas.width = outerSize * devicePixelRatio;
        canvas.height = outerSize * devicePixelRatio;

        const render = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка Canvas
          drawGradientTriangle(
            ctx,
            animatedTriangleAngle,
            animatedAngle,
            colors
          );
          requestAnimationFrame(render);
        };

        render();
      }
    }
  }, [animatedAngle, animatedTriangleAngle, colors]);

  // Инициализация размеров canvas при изменении outerSize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = outerSize * devicePixelRatio;
      canvas.height = outerSize * devicePixelRatio;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }
  }, [outerSize]);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setIsMore200(true);
      },
      animation === "slow" ? 1300 : animation === "medium" ? 800 : animation === "fast" ? 600 : 400
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {boxShadow && (
        <motion.div
          style={{
            width: `calc(100% + ${KShadow * 2}px)`,
            height: `calc(100% + ${KShadow * 2}px)`,
            left: `-${KShadow}px`,
            top: `-${KShadow}px`,
            zIndex: 0,
            position: "absolute",
            pointerEvents: "none",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            delay:
              animation === "slow"
                ? 0.75
                : animation === "medium"
                ? 0.5
                : animation === "fast"
                ? 0.3
                : 0,
            duration:
              animation === "slow"
                ? 0.5
                : animation === "medium"
                ? 0.4
                : animation === "fast"
                ? 0.3
                : 0,
            // type: "spring",
            // stiffness: 50, // жесткость пружины
            // damping: 8.5, // демпфирование (поглощение колебаний)
          }}
        >
          <RadialBlur
            color={realTheme === "light" ? "#fff" : "#2e2e2e"}
            blur={2}
          />
        </motion.div>
      )}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0,
        }}
        transition={{
          delay:
            animation === "slow"
              ? 0.2
              : animation === "medium"
              ? 0.1
              : animation === "fast"
              ? 0
              : 0,
          duration:
            animation === "slow"
              ? 0.5
              : animation === "medium"
              ? 0.4
              : animation === "fast"
              ? 0.3
              : 0,
          // type: "spring",
          // stiffness: 30, // жесткость пружины
          // damping: 5, // демпфирование (поглощение колебаний)
        }}
        className={cn(Style.circle, className)}
        style={{
          width: `${outerSize}px`,
          height: `${outerSize}px`,
          boxShadow: `0 0 0 ${borderWidth}px ${outerColor} inset`,
          ...style,
        }}
      >
        <canvas
          ref={canvasRef}
          className={Style.canvas}
          height={outerSize}
          width={outerSize}
        ></canvas>
        <motion.div
          transition={{
            delay:
              animation === "slow"
                ? 0.7
                : animation === "medium"
                ? 0.5
                : animation === "fast"
                ? 0.3
                : 0,
            duration:
              animation === "slow"
                ? 1.2
                : animation === "medium"
                ? 0.7
                : animation === "fast"
                ? 0.4
                : 0,
            ease: [0.7, 0, 0.3, 1],
          }}
          initial={{
            opacity: 0,
            height: outerSize,
            width: outerSize,
          }}
          animate={{ opacity: 1, height: innerSize, width: innerSize }}
          exit={{
            opacity: 0,
            height: outerSize,
            width: outerSize,
          }}
          className={Style.overlay}
          style={{
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            backgroundColor: realTheme === "dark" ? "#303036" : "#fff",
            borderWidth: `${borderWidth}px`,
            borderColor: color,
          }}
        >
          <AnimatePresence>
            {circleVisibleIcon && innerSize > 30 && (
              <motion.div
                className={Style.icon}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration:
                    animation === "slow"
                      ? 0.6
                      : animation === "medium"
                      ? 0.4
                      : animation === "fast"
                      ? 0.2
                      : 0,
                  type: "spring",
                }}
                style={{
                  fontSize: innerSize > 40 ? 20 : 12,
                  color: color,
                }}
              >
                {!!activeItem?.icon ? activeItem.icon : <MdOutlineMoreHoriz />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

export default CircleRadialToolKit;
