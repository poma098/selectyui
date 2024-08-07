import { useEffect, useRef, useState } from "react";
import { SwitchProps, SwitchSize } from "./props.interface";
import Style from "./style.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { GoDash } from "react-icons/go";
import { FaRegCircle } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import { hexStringToRgbaColor } from "utils/color/convert";
import { isDarkColor } from "utils/color/check";
import Tooltip from "../../components/Tooltip";

function getX(size: SwitchSize): number {
  switch (size) {
    case "xsmall":
      return 8;
    case "small":
      return 12;
    case "medium":
      return 16;
    case "large":
      return 20;
    case "xlarge":
      return 20;
  }
}

function Switch({
  className,
  style,
  checked = false,
  onChange,
  label,
  size = "medium",
  sticker = false,
  disabled,
  loading = false,
  checkedColor = "#66bb6a",
  uncheckedColor = "#7e7e7e30",
  checkedIcon,
  uncheckedIcon,
  checkedIconColor,
  uncheckedIconColor,
  checkedIconOpacity,
  uncheckedIconOpacity,
  inverted = false,
  tooltip = false,
  tooltipProps,
  tabIndex = 0,
}: SwitchProps) {
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

  const xOffset = inverted ? (value ? 0 : getX(size)) : value ? getX(size) : 0;
  const colorSticker1 = isDarkColor(hexStringToRgbaColor(checkedColor));
  const colorSticker2 = isDarkColor(hexStringToRgbaColor(uncheckedColor));

  return (
    <>
      {tooltip && label && !tooltipProps && (
        <Tooltip observeElement={ref} title={label} theme="dark" />
      )}
      {tooltip && tooltipProps && !tooltipProps.children && (
        <Tooltip observeElement={ref} {...tooltipProps} />
      )}
      {tooltip && tooltipProps && tooltipProps.children && (
        <Tooltip observeElement={ref} {...tooltipProps}>
          {tooltipProps.children}
        </Tooltip>
      )}
      <div className={Style.container}>
        <motion.div
          className={[Style.switch, className].join(" ")}
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
          <motion.div
            className={Style.switcher}
            tabIndex={0}
            animate={{
              x: xOffset,
            }}
            onClick={handleClick}
          >
            <AnimatePresence>
              {loading && (
                <motion.div
                  className={Style.loader}
                  initial={{
                    opacity: 0,
                    rotate: 0,
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
              {!loading && value && checkedIcon && (
                <motion.div
                  className={Style.icon}
                  style={{
                    opacity: checkedIconOpacity,
                    color: checkedIconColor,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: checkedIconOpacity || 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.35,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {checkedIcon}
                </motion.div>
              )}
              {!loading && !value && uncheckedIcon && (
                <motion.div
                  className={Style.icon}
                  style={{
                    opacity: uncheckedIconOpacity,
                    color: uncheckedIconColor,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: uncheckedIconOpacity || 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.35,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {uncheckedIcon}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {sticker && (
            <div
              className={Style.stickers}
              style={{
                flexDirection: inverted ? "row-reverse" : "row",
              }}
            >
              <div
                className={Style.sticker1}
                style={{
                  color: colorSticker1 ? "#fff" : "#000",
                  opacity: 0.25,
                }}
              >
                <GoDash />
              </div>
              <div
                className={Style.sticker2}
                style={{
                  color: colorSticker2 ? "#fff" : "#000",
                  opacity: 0.25,
                }}
              >
                <FaRegCircle />
              </div>
            </div>
          )}
        </motion.div>
        {label && <div className={Style.label}>{label}</div>}
      </div>
    </>
  );
}

export default Switch;
