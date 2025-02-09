import OpacityGradientBar from "../OpacityGradientBar/OpacityGradientBar";
import { ColorPreviewProps } from "../props.interface";
import Style from "./style.module.css";
import cn from "classnames"
import { motion } from "framer-motion";
import { LuCopy } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_STYLE } from "../DEFAULT_STYLE";
import { hslaToHex } from "utils/color/convert";
import React from "react";
import { Tooltip } from "components/Tooltip/Tooltip";

function ColorPreview({
  hsla,
  radius = 5,
  width = 100,
  height = 100,
  gridSize = (width - 4) / 2,
  size = 16,
  style,
  className,
  modeCopy = true,
  modeAlpha = true
}: ColorPreviewProps) {

  const refContainer = useRef<HTMLDivElement>(null);
  const [statusCopy, setStatusCopy] = useState(false);

  useEffect(() => {
    let tm: NodeJS.Timeout;
    if (statusCopy) {
      tm = setTimeout(() => {
        setStatusCopy(false);
      }, 1000);
    }
    return () => {
      clearTimeout(tm);
    };
  }, [statusCopy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(hslaToHex(hsla));
    setStatusCopy(true);
  };

  return (
    <div
      className={cn(Style.container, className)}
      style={{
        width,
        height,
        borderRadius: `${radius}px`,
        position: "relative",
        ...DEFAULT_STYLE,
        ...style,
        overflow: "hidden",
      }}
      ref={refContainer}
    >
      {modeCopy && (
        <Tooltip
          title={"Скопировано!"}
          observeElement={refContainer}
          trigger="click"
          visible={statusCopy}
          position="auto"
          padding={"5px 7px 5px 10px"}
          style={{
            borderRadius: radius ? 7 : 0,
          }}
        />
      )}
      {modeCopy && (
        <motion.div
          whileHover={{ opacity: 1 }}
          whileTap={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            transition: { duration: 0.075 },
          }}
          initial={{ opacity: 0 }}
          className={Style.containerCopy}
          style={{
            borderRadius: Math.max(radius - 1, 0),
          }}
          onClick={handleCopy}
        >
          <LuCopy className={Style.copyIcon} size={size} />
        </motion.div>
      )}
      <div
        style={{
          backgroundColor: hslaToHex({ ...hsla, a: modeAlpha ? hsla.a : 1 }),
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      ></div>
      <OpacityGradientBar
        width={width}
        height={height}
        gridSize={gridSize}
        colors={[
          {
            color: { ...hsla, a: modeAlpha ? hsla.a : 1 },
            position: 1,
          },
        ]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        radius={0}
      />
    </div>
  );
}

export { ColorPreview };