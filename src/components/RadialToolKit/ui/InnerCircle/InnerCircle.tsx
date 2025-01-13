import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnerCircleProps } from "../../props.interface";
import SETTINGS_ANIMATIONS from "../../SETTINGS_ANIMATIONS";
import Style from "./InnerCircleRadialToolKit.module.css";
import { useUITheme } from "context/UIContext";
import { MdOutlineMoreHoriz } from "react-icons/md";

const InnerCircle: React.FC<InnerCircleProps> = ({
  innerSize,
  borderWidth,
  color,
  animation,
  circleVisibleIcon,
  activeItem,
  outerSize,
}) => {
  const { realTheme } = useUITheme();
  return (
    <motion.div
      transition={{
        duration: SETTINGS_ANIMATIONS.circle.overlay.duration[animation],
        delay: SETTINGS_ANIMATIONS.circle.overlay.delay[animation],
        ease: [0.7, 0, 0.3, 1],
      }}
      initial={{
        opacity: 0,
        height: outerSize,
        width: outerSize,
      }}
      animate={{ opacity: 1, height: innerSize, width: innerSize }}
      exit={{
        opacity: 0,
        height: outerSize,
        width: outerSize,
      }}
      className={Style.overlay}
      style={{
        width: `${innerSize}px`,
        height: `${innerSize}px`,
        backgroundColor: realTheme === "dark" ? "#303036" : "#fff",
        borderWidth: `${borderWidth}px`,
        borderColor: color,
      }}
    >
      <AnimatePresence>
        {circleVisibleIcon && innerSize > 30 && (
          <motion.div
            className={Style.icon}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: SETTINGS_ANIMATIONS.circle.icon.duration[animation],
              type: "spring",
            }}
            style={{
              fontSize: innerSize > 40 ? 20 : 12,
              color: color,
            }}
          >
            {!!activeItem?.icon ? activeItem.icon : <MdOutlineMoreHoriz />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InnerCircle;