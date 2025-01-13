import Style from "./ItemRadialToolKit.module.css";
import { ItemPosition, PropsItemRadialToolKit } from "../../props.interface";
import calculateCircleCoordinatesInRange from "../../utils/calculateCircleCoordinatesInRange";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { useUITheme } from "context/UIContext";
import React from "react";
import { hexToRgba, isDarkColor } from "utils";
import SETTINGS_ANIMATIONS from "../../SETTINGS_ANIMATIONS";
/**
 * Компонент ItemRadialToolKit
 * Отображает элемент в радиальной раскладке с заданной позицией и иконкой.
 */
function ItemRadialToolKit({
  index,
  size,
  item,
  length,
  visibleIcon,
  rotationAngle,
  triangleAngle,
  setActiveIndex,
  color,
  boxShadow,
  animation,
  selectedIndex
}: PropsItemRadialToolKit) {
  // Состояние для хранения координат элемента
  const [coords, setCoords] = useState<{
    x: number;
    y: number;
    position?: ItemPosition;
    angle: number;
  }>({ x: 0, y: 0, position: undefined, angle: 0 });
  const { realTheme } = useUITheme();
  const [active, setActive] = useState(false);

  const debouncedUpdateActiveState = useRef(
    debounce(
      (rotationAngle: number, triangleAngle: number, coordsAngle: number) => {
        const halfTriangleAngle = triangleAngle / 2;
        let localRotationAngle;
        if (rotationAngle < -halfTriangleAngle) {
          localRotationAngle = rotationAngle + 90 + 270;
        } else {
          localRotationAngle = rotationAngle;
        }

        const [startRange, endRange] = [
          coordsAngle - halfTriangleAngle,
          coordsAngle + halfTriangleAngle,
        ];

        const isActive =
          startRange < localRotationAngle && localRotationAngle <= endRange;
        setActive(isActive);

        if (isActive && setActiveIndex) {
          setActiveIndex(index);
        }
      },
      animation === "none" ? 1 : 2.5
    )
  ).current;

  useEffect(() => {
    const coordinates = calculateCircleCoordinatesInRange(
      size,
      length + 1, // +2 для коррекции центральной позиции
      index, // +1 для смещения от 0-го индекса
      -90,
      270
    );
    setCoords(coordinates);
  }, [size, index, length]);

  useEffect(() => {
    if (triangleAngle == undefined || rotationAngle == undefined) return;

    debouncedUpdateActiveState(rotationAngle, triangleAngle, coords.angle);

    // Очистка debounced-функции при размонтировании
    return () => {
      debouncedUpdateActiveState.cancel();
    };
  }, [rotationAngle, triangleAngle, debouncedUpdateActiveState, coords.angle]);

  return (
    <motion.div
      className={Style.container}
      data-position={coords.position}
      style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
      data-active={false}
      data-index={index}
      data-has-icon={!!item.icon && visibleIcon}
      initial={{
        opacity: animation === "none" ? 1 : 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: animation === "none" ? 1 : 0,
      }}
      transition={{
        delay: SETTINGS_ANIMATIONS.item.container.delay(animation, index),
        duration: SETTINGS_ANIMATIONS.item.container.duration[animation],
      }}
    >
      {/* Отображение иконки, если она передана */}
      {item.icon && visibleIcon && (
        <motion.div
          data-selected={
            selectedIndex === index && active && animation !== "none"
          }
          className={Style.icon}
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            color: active ? color : realTheme === "dark" ? "#fff" : "#000",
            borderColor: active ? color : undefined,
            backgroundColor: realTheme === "dark" ? "#303036" : "#fff",
          }}
          exit={{ scale: 0 }}
          transition={{
            delay: SETTINGS_ANIMATIONS.item.icon.delay(animation, index),
            duration: SETTINGS_ANIMATIONS.item.icon.duration[animation],
            color: {
              delay: SETTINGS_ANIMATIONS.item.icon.color.delay[animation],
              duration: SETTINGS_ANIMATIONS.item.icon.color.duration[animation],
            },
            borderColor: {
              delay: SETTINGS_ANIMATIONS.item.icon.borderColor.delay[animation],
              duration: SETTINGS_ANIMATIONS.item.icon.borderColor.duration[animation],
            },
            backgroundColor: {
              delay: SETTINGS_ANIMATIONS.item.icon.backgroundColor.delay[animation],
              duration: SETTINGS_ANIMATIONS.item.icon.backgroundColor.duration[animation],
            },
          }}
        >
          {item.icon}
        </motion.div>
      )}

      {/* Отображение подписи и кнопки */}
      <motion.div
        data-selected={
          selectedIndex === index &&
          (!item.icon || !visibleIcon) &&
          active &&
          animation !== "none"
        }
        className={Style.label}
        initial={{
          y: 10,
          scale: 0,
        }}
        animate={{
          y: 0,
          scale: 1,
          backgroundColor: active
            ? color
            : realTheme === "dark"
            ? "#3b3b3b"
            : "#f2f2f2",
          color: active
            ? isDarkColor(hexToRgba(color || "#000"))
              ? "#fff"
              : "#000"
            : realTheme === "dark"
            ? "#fff"
            : "#000",
        }}
        exit={{ y: 10, scale: 0 }}
        transition={{
          duration: SETTINGS_ANIMATIONS.item.label.duration[animation],
          delay: SETTINGS_ANIMATIONS.item.label.delay(animation, index),
          color: {
            delay: SETTINGS_ANIMATIONS.item.label.color.delay[animation],
            duration: SETTINGS_ANIMATIONS.item.label.color.duration[animation],
          },
          backgroundColor: {
            delay: SETTINGS_ANIMATIONS.item.label.backgroundColor.delay[animation],
            duration: SETTINGS_ANIMATIONS.item.label.backgroundColor.duration[animation],
          },
        }}
      >
        {item.label}
        {item.button && (
          <motion.div
            className={Style.button}
            transition={{
              duration: SETTINGS_ANIMATIONS.item.button.duration[animation],
            }}
            animate={{
              color: active ? color : undefined,
              backgroundColor: active
                ? isDarkColor(hexToRgba(color || "#000"))
                  ? "#fff"
                  : "#000"
                : undefined,
            }}
          >
            {item.button}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ItemRadialToolKit;
