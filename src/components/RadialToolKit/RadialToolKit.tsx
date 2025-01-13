import CircleRadialToolKit from "./ui/CircleRadialToolKit.module/Circle";
import Style from "./RadialToolKit.module.css";
import { PropsRadialToolKit } from "./props.interface";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import cn from "classnames";
import ItemsRadialToolKit from "./ui/Items/Items";
import React from "react";
import { useCircleColors } from "./hooks/useCircleColors";
import useRadialToolkitHandlers from "./hooks/useRadialToolkitHandlers";
import SETTINGS_ANIMATIONS from "./SETTINGS_ANIMATIONS";

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

    const triangleAngle =
      limit < items.length ? 360 / (limit + 1) : 360 / items.length;

    const colors = useCircleColors(color);
    const handlers = useRadialToolkitHandlers({
      items,
      limit,
      circleOuterSize,
      containerRef,
      activeIndex,
      setRotationAngle,
      setSelectedIndex,
      onClick,
      onClickMore,
    });

    return (
      <div
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
          animationDuration={SETTINGS_ANIMATIONS.radialToolKit.duration[animation]}
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
      </div>
    );
  }
);

export { RadialToolKit };
