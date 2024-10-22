import { forwardRef, useEffect, useState } from "react";
import { ButtonProps } from "./props.interface";
import Style from "./style.module.css";
import { isDarkColor } from "utils/color/check";
import { hexStringToRgbaColor } from "../../utils/color/convert";
import React from "react";
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      disabled = false,
      onClick,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      onDoubleClick,
      onContextMenu,
      className,
      style,
      position = "left",
      size = "medium",
      children,
      icon,
      label,
      backgroundColor,
      color,
      borderColor,
    },
    ref
  ) => {
    const [colorText, setColorText] = useState(color);

    useEffect(() => {
      if (color && backgroundColor) {
        let colorT = color;
        if (color === "auto") {
          if (isDarkColor(hexStringToRgbaColor(backgroundColor))) {
            colorT = "#fff";
          } else {
            colorT = "#303036";
          }
        }
        setColorText(colorT);
      }
    }, [color, backgroundColor]);

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
        data-position={position}
        data-size={size}
        className={[Style.button, className].join(" ")}
        style={{ backgroundColor, color: colorText, borderColor, ...style }}
        ref={ref}
      >
        {children && children}
        {!children && icon && <span className={Style.icon}>{icon}</span>}
        {!children && label && <span className={Style.label}>{label}</span>}
      </button>
    );
  }
);

export { Button };