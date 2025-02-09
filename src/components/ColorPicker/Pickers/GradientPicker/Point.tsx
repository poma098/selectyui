import { hslaToHex } from "utils/color/convert";
import HandlePoint from "../../HandlePoint/HandlePoint";
import OpacityGradientBar from "../../OpacityGradientBar/OpacityGradientBar";
import { PointGradientProps } from "../../props.interface";
import Style from "./style.module.css";
import React from "react";

function PointGradient({
  width,
  index,
  color,
  focusedIndex,
  draggingIndex,
  onMouseDown,
  tabIndex,
  style
}: PointGradientProps) {
  return (
    <HandlePoint
      x={width * color.position}
      y={0}
      color={hslaToHex(color.color) as string}
      innerSize={13}
      outerSize={17}
      radius={50}
      outerColor={focusedIndex === index ? "#2f86e8" : "#fff"}
      style={{
        cursor:
          focusedIndex === index
            ? draggingIndex === index
              ? "grabbing"
              : "grab"
            : "pointer",
        transform: "translate(-50%, 0%)",
        overflow: "visible",
        outline: focusedIndex === index ? "0px solid #2f86e8" : "none",
        ...style,
      }}
      tabIndex={tabIndex}
      onMouseDown={onMouseDown}
    >
      <OpacityGradientBar
        colors={[{ color: color.color, position: 0 }]}
        width={13}
        height={13}
        radius={50}
        gridSize={13 / 4}
        className={Style.opacityBar}
      />
      <div className={Style.background}></div>
      <div
        className={Style.triangle}
        style={{
          borderTopColor: focusedIndex === index ? "#2f86e8" : "#fff",
        }}
      ></div>
    </HandlePoint>
  );
}

export default PointGradient;