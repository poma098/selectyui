import React, { forwardRef } from "react";
import { AvatarProps } from "./props.inteface";

import Style from "./style.module.css"

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  path,
  title,
  onClick = () => {},
}, ref) => {
  return (
    <div className={Style.container} ref={ref}>
      <div className={Style.wrapper}></div>
    </div>
  );
});

export { Avatar };