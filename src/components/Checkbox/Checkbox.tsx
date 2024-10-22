import { Tooltip } from "../../components/Tooltip";
import { CheckboxProps } from "./props.interface";
import Style from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { TbLoader2 } from "react-icons/tb";
import React from "react";

function Checkbox({
  className,
  style,
  checked = false,
  onChange,
  label,
  size = "medium",
  disabled = false,
  loading = false,
  checkedColor = "#66bb6a",
  uncheckedColor = "#7e7e7e30",
  checkedIcon = <FaCheck />,
  uncheckedIcon,
  checkedIconColor = "#fff",
  uncheckedIconColor,
  checkedIconOpacity,
  uncheckedIconOpacity,
  tooltip = false,
  tooltipProps,
  tabIndex = 0,
}: CheckboxProps) {

  const [value, setValue] = useState(checked);
  
  const ref = useRef(null);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  function handleClick() {
    if (disabled || loading) return;
    setValue(!value);
    if (onChange) onChange(!value);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Предотвращает прокрутку страницы при нажатии пробела
      handleClick();
    }
  }

  return (
    <>
      {tooltip && label && !tooltipProps && (
        <Tooltip observeElement={ref} title={label} theme="dark" />
      )}
      {tooltip && tooltipProps && !tooltipProps.children && (
        <Tooltip observeElement={ref} {...tooltipProps} />
      )}
      {tooltip && tooltipProps && tooltipProps.children && typeof tooltipProps.children === "function" && (
        <Tooltip observeElement={ref} {...tooltipProps}>
          {tooltipProps.children}
        </Tooltip>
      )}
      <div className={Style.container}>
        <motion.div
          className={[Style.checkbox, className].join(" ")}
          style={style}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          animate={{
            backgroundColor: value ? checkedColor : uncheckedColor,
            opacity: disabled || loading ? 0.5 : 1,
          }}
          data-size={size}
          data-disabled={disabled || loading}
          tabIndex={tabIndex}
          ref={ref}
        >
          {!loading && (
            <div
              className={Style.icon}
              style={{
                color: value ? checkedIconColor : uncheckedIconColor,
                opacity: value ? checkedIconOpacity : uncheckedIconOpacity,
              }}
            >
              {value ? checkedIcon : uncheckedIcon}
            </div>
          )}
          {loading && (
            <motion.div
              className={Style.icon}
              initial={{
                opacity: 0,
                rotate: 0,
              }}
              style={{
                color: value ? checkedIconColor : uncheckedIconColor,
              }}
              animate={{
                rotate: 360,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                opacity: {
                  duration: 0.35,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 1,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
            >
              <TbLoader2 />
            </motion.div>
          )}
        </motion.div>
        {label && <div className={Style.label}>{label}</div>}
      </div>
    </>
  );
}

export { Checkbox };
