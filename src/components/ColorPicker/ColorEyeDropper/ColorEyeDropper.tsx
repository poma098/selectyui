import React, { useState } from "react";
import { isEyeDropperSupported } from "../utils/isEyeDropperSupported";
import { ColorEyeDropperProps } from "../props.interface";
import { TbColorPicker } from "react-icons/tb";
import cn from "classnames";
import Style from "./style.module.css";
import { DEFAULT_STYLE } from "../DEFAULT_STYLE";
import { motion } from "framer-motion";
import { HexColor } from "utils/color/props.interface";

const ColorEyeDropper: React.FC<ColorEyeDropperProps> = ({
  onChange,
  style,
  className,
  icon = <TbColorPicker />,
  height = 38,
  width = 38,
  radius = 5,
  size = 18,
  disabled = false
}) => {
  const [isActive, setIsActive] = useState(false);

  const handlePickColor = async () => {
    if (!isEyeDropperSupported()) {
      console.error("EyeDropper API is not supported in this browser.");
      return;
    }

    setIsActive(true);

    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      if (result && result.sRGBHex) {
        if (onChange) {
          onChange((result.sRGBHex.toUpperCase() + "FF") as HexColor);
        }
      }
    } catch (error) {
      console.error("Error using EyeDropper API:", error);
    } finally {
      setIsActive(false); // Снять активность после завершения
    }
  };

  return (
    <motion.button
      onClick={!disabled ? handlePickColor : undefined}
      style={{
        height,
        width,
        borderRadius: radius,
        fontSize: size,
        ...DEFAULT_STYLE,
        ...style,
        cursor: disabled ? "default" : "pointer",
      }}
      whileHover={{
        backgroundColor: disabled ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{
        backgroundColor: disabled ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.2)",
      }}
      whileFocus={{
        backgroundColor: disabled ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.2)",
      }}
      disabled={disabled}
      className={cn(className, Style.container)}
      aria-label="Pick a color"
      data-is-active={isActive}
    >
      {icon}
    </motion.button>
  );
};

export { ColorEyeDropper };
