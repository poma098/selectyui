import React from "react";
import { LinearBlurProps } from "./props.interface";
import Style from "./style.module.css";

function LinearBlur({
  color = "#00000000",
  className,
  style,
  blur = 64,
  rotate = 0,
}: LinearBlurProps) {
  return (
    <div
      className={[Style.container, className].join(" ")}
      style={{
        ...style,
        backgroundImage: `linear-gradient(${
          rotate - 180
        }deg, rgba(0, 0, 0, 0), ${color})`,
      }}
    >
      <div className={Style.wrapper}>
        <div
          className={Style.blur}
          style={{
            zIndex: 1,
            mask: `linear-gradient(${rotate}deg, #000 0%, rgba(0, 0, 0, 0) 12.5%)`,
            backdropFilter: `blur(${blur > 64 ? 64 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 64 ? 64 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, #000 0%, rgba(0, 0, 0, 0) 12.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 2,
            mask: `linear-gradient(${rotate}deg, #000 0%, #000 12.5%, rgba(0, 0, 0, 0) 25%)`,
            backdropFilter: `blur(${blur > 32 ? 32 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 32 ? 32 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, #000 0%, #000 12.5%, rgba(0, 0, 0, 0) 25%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 3,
            mask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 0%, #000 12.5%, #000 25%, rgba(0, 0, 0, 0) 37.5%)`,
            backdropFilter: `blur(${blur > 16 ? 16 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 16 ? 16 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 0%, #000 12.5%, #000 25%, rgba(0, 0, 0, 0) 37.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 4,
            mask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 12.5%, #000 25%, #000 37.5%, rgba(0, 0, 0, 0) 50%)`,
            backdropFilter: `blur(${blur > 8 ? 8 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 8 ? 8 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 12.5%, #000 25%, #000 37.5%, rgba(0, 0, 0, 0) 50%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 5,
            mask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 25%, #000 37.5%, #000 50%, rgba(0, 0, 0, 0) 62.5%)`,
            backdropFilter: `blur(${blur > 4 ? 4 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 4 ? 4 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 25%, #000 37.5%, #000 50%, rgba(0, 0, 0, 0) 62.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 5,
            mask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 37.5%, #000 50%, #000 62.5%, rgba(0, 0, 0, 0) 75%)`,
            backdropFilter: `blur(${blur > 2 ? 2 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 2 ? 2 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 37.5%, #000 50%, #000 62.5%, rgba(0, 0, 0, 0) 75%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 6,
            mask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 50%, #000 62.5%, #000 75%, rgba(0, 0, 0, 0) 87.5%)`,
            backdropFilter: `blur(${blur > 1 ? 1 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 1 ? 1 : blur}px)`,
            WebkitMask: `linear-gradient(${rotate}deg, rgba(0, 0, 0, 0) 50%, #000 62.5%, #000 75%, rgba(0, 0, 0, 0) 87.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 7,
            mask: `linear-gradient(
                     ${rotate}deg,
                     rgba(0, 0, 0, 0) 62.5%,
                     #000 75%,
                     #000 87.5%,
                     rgba(0, 0, 0, 0) 100%
                   )`,
            backdropFilter: `blur(${blur > 0 ? 0.5 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 0 ? 0.5 : blur}px)`,
            WebkitMask: `linear-gradient(
                     ${rotate}deg,
                     rgba(0, 0, 0, 0) 62.5%,
                     #000 75%,
                     #000 87.5%,
                     rgba(0, 0, 0, 0) 100%
                   )`,
          }}
        ></div>
      </div>
    </div>
  );
}

export { LinearBlur };