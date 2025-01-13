import CircleRadialToolKit from "./Circle";
import Style from "./RadialToolKit.module.css";
import { PropsRadialToolKit } from "./props.interface";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import cn from "classnames";
import ItemsRadialToolKit from "./Items";
import calculateCircleCoordinatesInRange from "./utils/calculateCircleCoordinatesInRange";
import { motion } from "framer-motion";
import { HexColor, hexToHsl, hslToHex } from "utils";
import React from "react";

const RadialToolKit = forwardRef<HTMLDivElement, PropsRadialToolKit>(
  ({
    circleOuterSize = 100,
    circleInnerSize = 30,
    circleVisibleIcon = true,
    circleOuterColor = "#86868626",
    boxShadow = true,
    borderWidth = 2,
    color = "#2f86e8",
    items,
    limit = items.length,
    visibleIcons = true,
    animation = "medium",
    magnetization = false,
    onClick,
    onClickMore,
    style,
    className,
  }, ref) => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number>();

    const containerRef = useRef<HTMLDivElement | null>(null);

    // Проксируем локальный ref через внешний ref
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const colors: HexColor[] = [
      (hslToHex(hexToHsl(color)) + "40") as HexColor,
      (hslToHex(hexToHsl(color)) + "00") as HexColor,
    ];
    const triangleAngle =
      limit < items.length ? 360 / (limit + 1) : 360 / items.length;

    const handleMouseMove = (event: MouseEvent) => {
      // debugger
      if (!containerRef.current) return;

      // Определяем центр компонента
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Вычисление угла поворота
      let angle =
        (Math.atan2(mouseY - centerY, mouseX - centerX) * 180) / Math.PI + 90;

      setRotationAngle(angle);
    };

    useEffect(() => {
      setSelectedIndex(undefined);
    }, [activeIndex]);

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent | MouseEvent) => {
        const key = (event as KeyboardEvent).key;
        const isClick = (event as MouseEvent).button === 0;

        let findIndex = 0;

        if (key) {
          findIndex = items
            .slice(0, limit ?? items.length)
            .findIndex(
              (item) => item.button?.toUpperCase() === key.toUpperCase()
            );
        } else if (isClick) {
          findIndex = Math.min(activeIndex, limit ?? items.length);
        }

        if (findIndex !== -1) {
          const coordinates = calculateCircleCoordinatesInRange(
            circleOuterSize,
            limit < items.length ? limit + 2 : items.length + 1, // +2 для коррекции центральной позиции
            findIndex, // +1 для смещения от 0-го индекса
            -90,
            270
          );

          const findItem = items.slice(0, limit ?? items.length)?.[findIndex];

          setRotationAngle(coordinates.angle);

          

          if (findItem) {
            event.stopPropagation();
            event.preventDefault();

            if (onClick) {
              const resultOnClick = onClick(items?.[findIndex]) ?? true;
              if (!resultOnClick) return;
            }

            setSelectedIndex(findIndex);

            findItem?.callback?.(items?.[findIndex], findIndex, coordinates);
          } else if (findIndex === limit) {

            event.stopPropagation();
            event.preventDefault();

            const moreItems = items.slice(limit, items.length).map((item, index) => {
              return {
                icon: item.icon,
                label: item.label,
                callback: item.callback,
              };
            });

            if (onClickMore) {
              const resultOnClickMore = onClickMore(moreItems) ?? true;
              if (!resultOnClickMore) return;
            }

            setSelectedIndex(-1);
          }
        }
      };

      document.body.addEventListener("mouseenter", handleMouseMove);
      document.body.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("keypress", handleKeyPress);
      document.body.addEventListener("click", handleKeyPress);

      return () => {
        document.body.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseenter", handleMouseMove);
        document.body.removeEventListener("keypress", handleKeyPress);
        document.body.removeEventListener("click", handleKeyPress);
      };
    }, [items, limit, circleOuterSize]);

    return (
      <motion.div
        ref={containerRef}
        className={cn(Style.container, className)}
        style={{
          ...style,
          width: circleOuterSize,
          height: circleOuterSize,
        }}
      >
        <ItemsRadialToolKit
          size={circleOuterSize}
          items={items}
          limit={limit}
          visibleIcons={visibleIcons}
          rotationAngle={rotationAngle}
          triangleAngle={triangleAngle}
          setActiveIndex={setActiveIndex}
          color={color}
          boxShadow={boxShadow}
          animation={animation}
          selectedIndex={selectedIndex}
        />
        <CircleRadialToolKit
          rotationAngle={rotationAngle}
          triangleAngle={triangleAngle}
          outerSize={circleOuterSize}
          innerSize={circleInnerSize}
          outerColor={circleOuterColor}
          animationDuration={
            animation === "slow"
              ? 200
              : animation === "medium"
              ? 110
              : animation === "fast"
              ? 50
              : 40
          }
          borderWidth={borderWidth}
          colors={colors}
          visibleIcons={visibleIcons}
          activeItem={items.slice(0, limit)[activeIndex]}
          activeIndex={activeIndex}
          circleVisibleIcon={circleVisibleIcon}
          boxShadow={boxShadow}
          animation={animation}
          magnetization={magnetization}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </motion.div>
    );
  }
);

export { RadialToolKit };
