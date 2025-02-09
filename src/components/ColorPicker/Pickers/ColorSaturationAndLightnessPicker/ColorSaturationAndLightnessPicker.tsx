import {
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { GradientCanvas } from "../../GradientCanvas/GradientCanvas";
import HandlePoint from "../../HandlePoint/HandlePoint";
import { ColorSaturationAndLightnessPickerProps } from "../../props.interface";
import cn from "classnames";
import { DEFAULT_STYLE } from "../../DEFAULT_STYLE";
import React from "react";
import { HslColor } from "utils/color/props.interface";
import { clamp } from "utils/clamp";
import { hslaToRgba, rgbaToHex } from "utils/color/convert";

function getCoordinatesFromHSLColor(hsl: HslColor): { x: number; y: number } {
  const { s, l } = hsl;
  const S_L = s / 100;
  const L = l / 100;
  const V = L + S_L * Math.min(L, 1 - L);
  const S_V = V === 0 ? 0 : 2 * (1 - L / V);
  return {
    x: S_V,
    y: 1 - V,
  };
}

function getHSLColorFromCoordinates(x: number, y: number): HslColor {
  const V = 1 - y;
  const S_V = x;
  const L = V * (1 - S_V / 2);
  const S_L = L === 0 || L === 1 ? 0 : (V - L) / Math.min(L, 1 - L);
  return {
    h: 0,
    s: clamp(S_L * 100, 0, 100),
    l: clamp(L * 100, 0, 100),
  };
}

/**
 * Component for selecting a color based on its saturation and lightness.
 *
 * You can pass a function to `onChange` to receive the selected color.
 * The selected color will be an object of type `HslColor`.
 *
 * The component is a canvas with a gradient of colors from white to black, and a
 * handle point that the user can drag to select a color.
 *
 * The component is fully responsive and can be used in any layout.
 *
 * @prop {HslColor} [hsla] Initial color. If not provided, the color will be set to black.
 * @prop {((color: HslColor) => void) | undefined} [onChange] Function to be called when the user selects a color.
 * @prop {number} [width] Width of the component. If not provided, the component will take the full width of its parent.
 * @prop {number} [height] Height of the component.
 * @prop {number} [radius] Radius of the canvas corners.
 * @prop {React.CSSProperties} [style] Additional CSS styles for the component.
 * @prop {string} [className] Additional class names for the component.
 * @prop {boolean} [disabled] Whether the component is disabled. Disabled components do not respond to user input.
 */
function ColorSaturationAndLightnessPicker({
  hsla,
  onChange,
  width,
  height,
  radius,
  style,
  className,
  disabled = false,
}: ColorSaturationAndLightnessPickerProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 100 });

  // Получаем `h` только из начального цвета
  const { h, a } = hsla ?? { h: 0, a: 1 };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const { width: observedWidth } = entry.contentRect;

      setDimensions((prev) => {
        const nextWidth = observedWidth || 100;
        if (prev.width !== nextWidth) {
          return { width: nextWidth };
        }
        return prev;
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref, width]);

  const computedWidth = useMemo(
    () => width || dimensions.width,
    [width, dimensions.width]
  );

  const cursorStyle = useMemo(() => {
    if (disabled || !onChange) return "default";
    return isDragging ? "none" : "crosshair";
  }, [disabled, onChange, isDragging]);

  // Синхронизация начальной позиции курсора с цветом
  useEffect(() => {
    if (!hsla || isDragging) return;

    const { x, y } = getCoordinatesFromHSLColor(hsla);

    setCursorPosition({
      x: x * computedWidth,
      y: y * height,
    });
  }, [hsla, isDragging, computedWidth, height]);

  const startDrag = () => {
    if (!onChange || disabled) return;
    setIsDragging(true);
  };
  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseEvents = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!onChange || disabled) return;

      const rect = ref.current.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      // Ограничиваем координаты в пределах canvas
      x = clamp(x, 0, computedWidth);
      y = clamp(y, 0, height);

      setCursorPosition({ x, y });

      // Вычисляем цвет, сохраняя текущий `h`
      const hsl = getHSLColorFromCoordinates(x / computedWidth, y / height);
      const hsla = { ...hsl, h, a };

      if (onChange) {
        onChange(hsla);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        handleMouseEvents(event);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [computedWidth, height, isDragging, onChange, a, disabled, h]);

  

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: cursorStyle,
        borderRadius: radius,
        width: computedWidth,
        height: height,
        ...DEFAULT_STYLE,
        ...style,
      }}
      className={cn(className)}
      onPointerDown={startDrag}
      ref={ref}
    >
      <GradientCanvas
        hue={h}
        width={computedWidth}
        height={height}
        radius={Math.max((radius ?? 0) - 1, 0)}
      />

      <HandlePoint
        x={cursorPosition.x}
        y={cursorPosition.y}
        color={rgbaToHex({
          ...hslaToRgba(hsla),
          a: 1,
        })}
        innerSize={9}
        outerSize={13}
        outerColor={"#fff"}
        radius={50}
        style={{
          opacity: disabled ? 0.5 : undefined
        }}
      />
    </div>
  );
}

export { ColorSaturationAndLightnessPicker };