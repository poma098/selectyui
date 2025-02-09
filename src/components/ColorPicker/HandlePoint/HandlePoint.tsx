import React from "react";
import { HandlePointProps } from "../props.interface";

const HandlePoint: React.FC<HandlePointProps> = ({
  x,
  y,
  color,
  innerSize = 8,
  outerSize = 12,
  outerColor = "#fff",
  radius = 3,
  onMouseDown,
  style,
  children,
  tabIndex,
}) => {
  const size = (outerSize - innerSize) / 2;
  const diff = outerSize - innerSize;
  const halfDiff = diff / 2;
  return (
    <div
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: outerSize,
        height: outerSize,
        borderRadius: radius,
        backgroundColor: outerColor,
        transform: "translate(-50%, -50%)",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        ...style,
      }}
      tabIndex={tabIndex}
      onMouseDown={onMouseDown}
    >
      <div
        style={{
          position: "absolute",
          top: size,
          left: size,
          width: innerSize,
          height: innerSize,
          borderRadius: Math.max(radius - halfDiff, 0),
          backgroundColor: color,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HandlePoint;
