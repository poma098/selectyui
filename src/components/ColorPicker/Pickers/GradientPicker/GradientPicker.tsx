import { useEffect, useRef, useState } from "react";
import OpacityGradientBar from "../../OpacityGradientBar/OpacityGradientBar";
import { GradientPickerProps } from "../../props.interface";
import Style from "./style.module.css";
import { useClickOutside } from "./hooks/useClickOutside";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useAddColorPoint } from "./hooks/useAddColorPoint";
import PointGradient from "./Point";
import { TbAngle } from "react-icons/tb";
import React from "react";
import { Stepper } from "components/Stepper/Stepper";


/**
 * GradientPicker - a component for selecting and editing gradients.
 *
 * GradientPicker renders a horizontal bar with points for each color in the gradient.
 * The user can click on the points to select them, drag them to change their position,
 * and click on the bar to add a new color at the corresponding position.
 *
 * @param {GradientPickerProps} props - component props
 * @param {ColorStop[]} [props.colors=[]] - array of colors in the gradient
 * @param {(colors: ColorStop[]) => void} [props.onChange] - function to call when the gradient changes
 * @param {number} [props.width=300] - width of the component
 * @param {number} [props.height] - height of the component
 * @param {GradientType} [props.type="linear"] - type of the gradient
 * @param {number} [props.rotate=0] - angle of the gradient
 * @param {(rotate: number) => void} [props.setRotate] - function to call when the angle of the gradient changes
 * @param {number | undefined} [props.selectedIndex] - index of the selected color
 * @param {(selectedIndex: number | undefined) => void} [props.setSelectedIndex] - function to call when the selected index changes
 * @param {React.RefObject<HTMLElement>[]} [props.canceledOnBlurContainer=[]] - array of containers to cancel the blur event when the user clicks outside of them
 * @param {boolean} [props.disabled=false] - whether the component is disabled
 * @param {boolean} [props.modeAlpha=true] - whether the component should display the opacity of the colors
 * @returns {JSX.Element} - the rendered component
 */
function GradientPicker({
  colors = [],
  onChange,
  width = 300,
  height,
  type = "linear",
  rotate = 0,
  setRotate,
  selectedIndex,
  setSelectedIndex,
  canceledOnBlurContainer = [],
  disabled = false,
  modeAlpha = true
}: GradientPickerProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { draggingIndex, setDraggingIndex, handleMouseDown, isHidden } =
    useDragAndDrop(containerRef, width, colors, onChange, setSelectedIndex);

  useClickOutside([containerRef, ...canceledOnBlurContainer], () => {
    setFocusedIndex(undefined);
    setDraggingIndex(null);
    setSelectedIndex?.(undefined);
  });

  const addColorPoint = useAddColorPoint(
    containerRef,
    width,
    colors,
    onChange,
    setFocusedIndex,
    setSelectedIndex
  );

  useKeyboardNavigation(
    selectedIndex ?? focusedIndex,
    colors,
    setFocusedIndex,
    setSelectedIndex,
    onChange,
    disabled
  );

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setFocusedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <div
      className={Style.container}
      style={{ width, height }}
      ref={containerRef}
      tabIndex={0}
    >
      {!disabled && (
        <div className={Style.stoppers}>
          {colors.map((color, index) => (
            <PointGradient
              key={index}
              width={width}
              index={index}
              color={modeAlpha ? color : {
                ...color,
                color: {
                  ...color.color,
                  a: 1,
                },
              }}
              focusedIndex={focusedIndex}
              draggingIndex={draggingIndex}
              tabIndex={0}
              onMouseDown={(e) => {
                if (setSelectedIndex) {
                  setSelectedIndex(index);
                }
                handleMouseDown(index, e);
                setFocusedIndex(index);
                setDraggingIndex(index);
              }}
              style={{
                opacity: !isHidden || draggingIndex !== index ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      )}
      <OpacityGradientBar
        colors={colors
          .filter((color, index) => !isHidden || index !== draggingIndex)
          .map((color) => {
            if (modeAlpha) {
              return color;
            } else {
              return {
                ...color,
                color: {
                  ...color.color,
                  a: 1,
                },
              };
            }
          })}
        gridSize={5}
        style={{
          cursor:
            draggingIndex !== null ? "default" : disabled ? "default" : "copy",
        }}
        onClick={disabled ? undefined : addColorPoint}
      />
      {(type === "linear" || type === "repeating-linear") && (
        <div className={Style.angleContainer}>
          <div className={Style.angleText}>
            <div className={Style.angleTitle}>Угол</div>
            <div className={Style.angleDescription}>
              Укажите угол поворота градиента
            </div>
          </div>
          <div className={Style.angle}>
            <Stepper
              min={0}
              max={360}
              value={rotate}
              onChange={setRotate}
              unit={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignContent: "flex-start",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <TbAngle />
                </div>
              }
              disabled={disabled}
              unitPosition="right"
              accuracy={0}
              radius={6}
              step={1}
              size="xs"
              style={{
                width: 105,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { GradientPicker };
