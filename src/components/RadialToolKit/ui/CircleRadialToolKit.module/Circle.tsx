import Style from "./CircleRadialToolKit.module.css";
import {
  PropsCircleRadialToolKit,
} from "../../props.interface";
import { motion } from "framer-motion";
import cn from "classnames";
import { hexToHsl, hslToHex } from "utils";
import React  from "react";
import SETTINGS_ANIMATIONS from "../../SETTINGS_ANIMATIONS";
import BoxShadowWrapper from "../BoxShadowWrapper/BoxShadowWrapper";
import CanvasRenderer from "../CanvasRenderer/CanvasRenderer";
import InnerCircle from "../InnerCircle/InnerCircle";



function CircleRadialToolKit({
  outerSize = 100,
  innerSize = 30,
  outerColor = "#86868626",
  rotationAngle = 0,
  triangleAngle = 60,
  animationDuration = 300,
  borderWidth = 3,
  colors = ["#00000040", "#0000"],
  activeItem,
  activeIndex,
  boxShadow = true,
  circleVisibleIcon = true,
  magnetization = false,
  style,
  className,
  animation,
}: PropsCircleRadialToolKit) {
  
  const color = hslToHex(hexToHsl(colors[0]));
  const KShadow = outerSize / 3.5;

  return (
    <>
      {boxShadow && (
        <BoxShadowWrapper animation={animation} KShadow={KShadow} />
      )}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0,
        }}
        transition={{
          delay: SETTINGS_ANIMATIONS.circle.circle.delay[animation],
          duration: SETTINGS_ANIMATIONS.circle.circle.duration[animation],
        }}
        className={cn(Style.circle, className)}
        style={{
          width: `${outerSize}px`,
          height: `${outerSize}px`,
          boxShadow: `0 0 0 ${borderWidth}px ${outerColor} inset`,
          ...style,
        }}
      >
        <CanvasRenderer
          outerSize={outerSize}
          colors={colors}
          rotationAngle={rotationAngle}
          animationDuration={animationDuration}
          activeIndex={activeIndex}
          triangleAngle={triangleAngle}
          magnetization={magnetization}
          animation={animation}
        />
        <InnerCircle
          innerSize={innerSize}
          borderWidth={borderWidth}
          color={color}
          animation={animation}
          circleVisibleIcon={circleVisibleIcon}
          activeItem={activeItem}
          outerSize={outerSize}
        />
      </motion.div>
    </>
  );
};

export default CircleRadialToolKit;
