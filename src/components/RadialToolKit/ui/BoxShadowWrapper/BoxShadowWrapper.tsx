import { motion } from "framer-motion";
import { BoxShadowWrapperProps } from "../../props.interface"
import React from "react";
import SETTINGS_ANIMATIONS from "../../SETTINGS_ANIMATIONS";
import { RadialBlur } from "components/RadialBlur";

const BoxShadowWrapper: React.FC<BoxShadowWrapperProps> = ({ animation, KShadow }) => {
  return (
    <motion.div
      style={{
        width: `calc(100% + ${KShadow * 2}px)`,
        height: `calc(100% + ${KShadow * 2}px)`,
        left: `-${KShadow}px`,
        top: `-${KShadow}px`,
        zIndex: 0,
        position: "absolute",
        pointerEvents: "none",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        delay: SETTINGS_ANIMATIONS.circle.boxShadow.delay[animation],
        duration: SETTINGS_ANIMATIONS.circle.boxShadow.duration[animation],
      }}
    >
      <RadialBlur color="#fff0" blur={4} />
    </motion.div>
  );
}

export default BoxShadowWrapper