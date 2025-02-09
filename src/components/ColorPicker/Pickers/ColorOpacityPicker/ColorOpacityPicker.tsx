import { useRef, useMemo, useCallback, useState } from "react";
import OpacityGradientBar from "../../OpacityGradientBar/OpacityGradientBar";
import HandlePoint from "../../HandlePoint/HandlePoint";
import { ColorOpacityPickerProps, ColorStop } from "../../props.interface";
import cn from "classnames";
import { DEFAULT_STYLE } from "../../DEFAULT_STYLE";
import { clamp } from "utils/clamp";
import React from "react";
import { hslaToHex } from "utils/color/convert";

/**
 * ColorOpacityPicker - A component for selecting opacity levels of a color.
 *
 * This component renders an opacity gradient bar with a draggable handle point
 * that allows users to select the opacity level of a given color. The component
 * supports both horizontal and vertical directions for the gradient bar.
 *
 * @param {ColorOpacityPickerProps} props - The component props.
 * @param {number} [props.width=200] - The width of the component.
 * @param {number} [props.height=14] - The height of the component.
 * @param {HslaColor} props.hsla - The color in HSLA format.
 * @param {"horizontal" | "vertical"} [props.direction="horizontal"] - The direction of the gradient.
 * @param {(newHexColor: HslaColor) => void} [props.onChange] - Callback function for when the color changes.
 * @param {number} [props.radius=50] - The border radius of the component.
 * @param {number} [props.pointInnerSize=9] - The inner size of the draggable handle point.
 * @param {number} [props.pointOuterSize=13] - The outer size of the draggable handle point.
 * @param {HexColor} [props.pointOuterColor="#fff"] - The outer color of the draggable handle point.
 * @param {number} [props.pointRadius=50] - The border radius of the handle point.
 * @param {CSSProperties} [props.style={}] - Additional styles for the component.
 * @param {number} [props.gridSize=5] - The size of the grid for the gradient bar pattern.
 * @param {string} [props.className] - Additional class names for the component.
 * @param {boolean} [props.disabled=false] - Whether the component is disabled.
 * @returns {JSX.Element} The rendered ColorOpacityPicker component.
 */
function ColorOpacityPicker({
  width = 200,
  height = 14,
  hsla,
  direction = "horizontal",
  onChange,
  radius = 50,
  pointInnerSize = 9,
  pointOuterSize = 13,
  pointOuterColor = "#fff",
  pointRadius = 50,
  style = {},
  gridSize = 5,
  className,
  disabled = false,
}: ColorOpacityPickerProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [isDraggingPoint, setIsDraggingPoint] = useState(false);

  const maxPos = direction === "horizontal" ? width : height;

  // Gradient colors for the OpacityGradientBar
  const gradientColors = useMemo<ColorStop[]>(
    () => [
      { color: { ...hsla, a: 0 }, position: 0 },
      { color: { ...hsla, a: 1 }, position: 1 },
    ],
    [hsla]
  );

  const padding = useMemo(
    () => ((width < height ? width : height) - pointOuterSize) / 2,
    [height, pointOuterSize, width]
  );

  const cursorStyle = useMemo(() => {
    if (disabled || !onChange) return "default";
    return isDraggingPoint ? "none" : "crosshair";
  }, [disabled, onChange, isDraggingPoint]);

  // Calculate handle position based on alpha
  const handlePosition = useMemo(
    () =>
      clamp(
        hsla.a * maxPos,
        pointOuterSize / 2 + padding,
        maxPos - pointOuterSize / 2 - padding
      ), // Ensuring the handle stays within bounds
    [hsla.a, maxPos, pointOuterSize, padding]
  );

  // Update alpha value
  const updateAlpha = useCallback(
    (clientCoord: number) => {
      if (!areaRef.current) return;
      if (!onChange || disabled) return;

      const rect = areaRef.current.getBoundingClientRect();
      const offset = direction === "horizontal" ? rect.left : rect.top;
      const position = clamp(
        clientCoord - offset,
        pointOuterSize / 2,
        maxPos - pointOuterSize / 2
      );

      // Calculate new alpha value
      const newAlpha =
        (position - pointOuterSize / 2) / (maxPos - pointOuterSize);

      // Notify parent about the new color
      onChange?.({ ...hsla, a: newAlpha });
    },
    [direction, maxPos, onChange, pointOuterSize, hsla, disabled]
  );

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (event.button !== 0) return;

      const moveHandler = (e: MouseEvent) => {
        setIsDraggingPoint(true);
        updateAlpha(direction === "horizontal" ? e.clientX : e.clientY);
      };

      const stopHandler = () => {
        setIsDraggingPoint(false);
        window.removeEventListener("mousemove", moveHandler);
        window.removeEventListener("mouseup", stopHandler);
      };

      updateAlpha(direction === "horizontal" ? event.clientX : event.clientY);

      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("mouseup", stopHandler);
    },
    [updateAlpha, direction]
  );

  return (
    <div
      ref={areaRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        borderRadius: `${radius}px`,
        cursor: cursorStyle,
        ...DEFAULT_STYLE,
        ...style,
      }}
      onMouseDown={handleMouseDown}
      className={cn(className)}
    >
      <OpacityGradientBar
        width={width}
        height={height}
        colors={gradientColors}
        rotation={direction === "horizontal" ? 0 : 90}
        gridSize={gridSize}
        radius={radius}
      />

      <HandlePoint
        x={direction === "horizontal" ? handlePosition : width / 2}
        y={direction === "horizontal" ? height / 2 : handlePosition}
        color={hslaToHex(hsla)}
        innerSize={pointInnerSize}
        outerSize={pointOuterSize}
        outerColor={pointOuterColor}
        radius={pointRadius}
        style={{
          opacity: disabled ? 0.5 : undefined,
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export { ColorOpacityPicker };
