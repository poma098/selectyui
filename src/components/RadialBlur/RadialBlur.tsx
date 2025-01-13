import React from "react";
import { RadialBlurProps } from "./props.interface";
import Style from "./style.module.css";
import cn from "classnames";

function RadialBlur({
  color = "#00000000",
  className,
  style,
  blur = 64,
}: RadialBlurProps) {
  return (
    <div
      className={cn(Style.container, className)}
      style={{
        ...style,
        backgroundImage: `radial-gradient(closest-side, ${color}, rgba(0, 0, 0, 0))`,
      }}
    >
      <div className={Style.wrapper}>
        <div
          className={Style.blur}
          style={{
            zIndex: 1,
            mask: `radial-gradient(closest-side, #000 12.5%, rgba(0, 0, 0, 0) 0%)`,
            backdropFilter: `blur(${blur > 64 ? 64 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 64 ? 64 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, #000 12.5%, rgba(0, 0, 0, 0) 0%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 2,
            mask: `radial-gradient(closest-side, #000 0%, #000 12.5%, rgba(0, 0, 0, 0) 25%)`,
            backdropFilter: `blur(${blur > 32 ? 32 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 32 ? 32 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, #000 0%, #000 12.5%, rgba(0, 0, 0, 0) 25%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 3,
            mask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 0%, #000 12.5%, #000 25%, rgba(0, 0, 0, 0) 37.5%)`,
            backdropFilter: `blur(${blur > 16 ? 16 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 16 ? 16 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 0%, #000 12.5%, #000 25%, rgba(0, 0, 0, 0) 37.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 4,
            mask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 12.5%, #000 25%, #000 37.5%, rgba(0, 0, 0, 0) 50%)`,
            backdropFilter: `blur(${blur > 8 ? 8 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 8 ? 8 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 12.5%, #000 25%, #000 37.5%, rgba(0, 0, 0, 0) 50%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 5,
            mask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 25%, #000 37.5%, #000 50%, rgba(0, 0, 0, 0) 62.5%)`,
            backdropFilter: `blur(${blur > 4 ? 4 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 4 ? 4 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 25%, #000 37.5%, $#000 50%, rgba(0, 0, 0, 0) 62.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 5,
            mask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 37.5%, #000 50%, #000 62.5%, rgba(0, 0, 0, 0) 75%)`,
            backdropFilter: `blur(${blur > 2 ? 2 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 2 ? 2 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 37.5%, #000 50%, #000 62.5%, rgba(0, 0, 0, 0) 75%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 6,
            mask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 50%, #000 62.5%, #000 75%, rgba(0, 0, 0, 0) 87.5%)`,
            backdropFilter: `blur(${blur > 1 ? 1 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 1 ? 1 : blur}px)`,
            WebkitMask: `radial-gradient(closest-side, rgba(0, 0, 0, 0) 50%, #000 62.5%, #000 75%, rgba(0, 0, 0, 0) 87.5%)`,
          }}
        ></div>
        <div
          className={Style.blur}
          style={{
            zIndex: 7,
            mask: `radial-gradient(
                     closest-side,
                     rgba(0, 0, 0, 0) 62.5%,
                     #000 75%,
                     #000 87.5%,
                     rgba(0, 0, 0, 0) 100%
                   )`,
            backdropFilter: `blur(${blur > 0 ? 0.5 : blur}px)`,
            WebkitBackdropFilter: `blur(${blur > 0 ? 0.5 : blur}px)`,
            WebkitMask: `radial-gradient(
                     closest-side,
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

export { RadialBlur };
