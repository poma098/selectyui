import React, { useState, useEffect } from "react";
import { GooeyTextProps } from "./props.interface";
import Style from "./style.module.css";

const GooeyText: React.FC<GooeyTextProps> = ({
  children,
  backgroundColor = '#303036',
  textColor = '#fff',
  maxWidth,
  textAlign,
  style,
  className,
  radius = 10,
  paddingY = "0.9rem",
  paddingX = "1.1rem",
}) => {

  return (
    <>
      <div
        style={{
          ...style,
          maxWidth,
          padding: `calc(${paddingY} + 1px) 0px`,
          textAlign,
        }}
        className={Style.container}
      >
        <div
          style={{
            ...style,
            maxWidth,
            fontSize: undefined
          }}
          className={Style.gooContainer}
        >
          <div
            style={{
              ...style,
              display: "inline",
              color: textColor,
              padding: `${paddingY} ${paddingX}`,
              backgroundColor: "transparent",
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            }}
          >
            {children}
          </div>
        </div>
        <div
          className={[Style.goo, className].join(" ")}
          style={{
            ...style,
            color: "transparent !important",
            backgroundColor,
            padding: `${paddingY} ${paddingX}`,
          }}
        >
          {children}
        </div>
      </div>
      <svg
        style={{
          visibility: "hidden",
          position: "absolute",
          fill: backgroundColor,
        }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={radius}
              result="out"
            />
            <feColorMatrix
              in="out"
              mode="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -14`}
              result={Style.goo}
            />
            <feComposite in="SourceGraphic" in2={Style.goo} operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export { GooeyText };
