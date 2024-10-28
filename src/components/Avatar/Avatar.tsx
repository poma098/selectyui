import React, { forwardRef } from "react";
import { AvatarProps } from "./props.inteface";
import Style from "./style.module.css"
import { Tooltip } from "components/Tooltip";

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ path, title, onClick = () => {}, size = "m", style }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <>
        {title && <Tooltip
          observeElement={ref}
          position="auto"
          title={title}
        />}
        <div
          className={Style.container}
          data-size={size}
          onClick={onClick}
          style={{ ...style, backgroundImage: `url(${path})` }}
          ref={ref}
        ></div>
      </>
    );
  }
);

export { Avatar };