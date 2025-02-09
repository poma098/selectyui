import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import HandlePoint from "../../HandlePoint/HandlePoint";
import { ColorHueRotatePickerProps } from "../../props.interface";
import { ColorGradientBar } from "../../ColorGradientBar/ColorGradientBar";
import cn from "classnames";
import { DEFAULT_STYLE } from "../../DEFAULT_STYLE";
import React from "react";
import { clamp } from "utils/clamp";
import { hslaToHex } from "utils/color/convert";

/**
 * ColorHueRotatePicker - A component for selecting a color hue.
 *
 * This component renders a color gradient bar with a draggable handle point
 * that allows users to select the hue of a given color. The component supports
 * both horizontal and vertical directions for the gradient bar.
 *
 * @param {ColorHueRotatePickerProps} props - The component props.
 * @param {number} [props.width=200] - The width of the component.
 * @param {number} [props.height=14] - The height of the component.
 * @param {HslaColor} props.hsla - The color in HSLA format.
 * @param {(newHsla: HslaColor) => void} [props.onChange] - Callback function for when the color changes.
 * @param {number} [props.radius=5] - The border radius of the component.
 * @param {number} [props.pointInnerSize=8] - The inner size of the draggable handle point.
 * @param {number} [props.pointOuterSize=12] - The outer size of the draggable handle point.
 * @param {HexColor} [props.pointOuterColor="#fff"] - The outer color of the draggable handle point.
 * @param {React.CSSProperties} [props.style={}] - Additional styles for the component.
 * @param {string} [props.className] - Additional class names for the component.
 * @param {boolean} [props.disabled=false] - Whether the component is disabled.
 * @returns {JSX.Element} The rendered ColorHueRotatePicker component.
 */
function ColorHueRotatePicker({
  width = 200,
  height = 14,
  hsla,
  onChange,
  radius = 5,
  pointInnerSize = 8,
  pointOuterSize = 12,
  pointOuterColor = "#fff",
  style,
  className,
  disabled = false,
}: ColorHueRotatePickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const hue = hsla.h;

  const padding = useMemo(
    () => ((width < height ? width : height) - pointOuterSize) / 2,
    [width, height, pointOuterSize]
  );

  const minPosition = useMemo(
    () => padding + pointOuterSize / 2,
    [padding, pointOuterSize]
  );

  const maxPosition = useMemo(
    () => width - padding - pointOuterSize / 2,
    [width, padding, pointOuterSize]
  );

  const cursorStyle = useMemo(() => {
    if (disabled || !onChange) return "default";
    return isDragging ? "none" : "crosshair";
  }, [disabled, onChange, isDragging]);

  const startDrag = () => {
    if (!onChange || disabled) return;
    setIsDragging(true);
  }
  const stopDrag = () => setIsDragging(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!areaRef.current) return;
      if (!onChange || disabled) return;

      const rect = areaRef.current.getBoundingClientRect();
      const position = clamp(clientX - rect.left, minPosition, maxPosition);

      // Рассчитываем новый hue
      const newHue =
        ((position - minPosition) / (maxPosition - minPosition)) * 360;

      const newHsla = { ...hsla, h: newHue };

      // Обновляем положение курсора
      setCursorPosition(position);

      // Вызываем callback
      onChange?.(newHsla);
    },
    [hsla, minPosition, maxPosition, onChange, disabled]
  );

  useEffect(() => {
    // Синхронизация положения ручки с hue
    const position = clamp(
      minPosition + (hue / 360) * (maxPosition - minPosition),
      minPosition,
      maxPosition
    );
    setCursorPosition(position);
  }, [hsla, hue, minPosition, maxPosition, isDragging]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        updatePosition(event.clientX);
      }
    };

    const handleMouseUp = () => stopDrag();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={areaRef}
      style={{
        position: "relative",
        width,
        height,
        borderRadius: radius,
        cursor: cursorStyle,
        ...DEFAULT_STYLE,
        ...style,
      }}
      onMouseDown={(event) => {
        if (event.button === 0) {
          startDrag();
          updatePosition(event.clientX);
        }
      }}
      className={cn(className)}
    >
      <ColorGradientBar width={width} height={height} radius={radius} />
      <HandlePoint
        x={cursorPosition}
        y={height / 2}
        color={hslaToHex({ ...hsla, a: 1, s: 100, l: 50 })}
        innerSize={pointInnerSize}
        outerSize={pointOuterSize}
        outerColor={pointOuterColor}
        radius={pointOuterSize / 2}
        style={{
          opacity: disabled ? 0.5 : undefined,
        }}
      />
    </div>
  );
}

export { ColorHueRotatePicker };
 