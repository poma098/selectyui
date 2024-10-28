import { forwardRef } from "react";
import { AvatarSize, AvatarsProps } from "./props.inteface";
import React from "react";
import { Avatar } from "./Avatar";
import Style from "./style.module.css";
import { Tooltip } from "components/Tooltip";

const Avatars = forwardRef<HTMLDivElement, AvatarsProps>(
  ({ paths, size = "m", limit = 3, gap = 0, style }) => {

    if (limit <= 0) {
      throw new Error("The limit must be greater than 0");
    }

    const ref = React.useRef<HTMLDivElement>(null);

    if (limit > paths.length) {
      limit = paths.length;
    }

    return (
      <>
        <Tooltip
          observeElement={ref}
          position="auto"
          body={paths.slice(limit, paths.length).map((path, index) => (
            <div key={index} className={Style.tooltip} onClick={path.onClick}>
              <Avatar {...path} size="s" style={{ pointerEvents: "none" }} />
              <span className={Style.value}>{path.title}</span>
            </div>
          ))}
        />
        <div className={Style.container_group} style={style}>
          {paths.slice(0, limit).map((path, index) => (
            <Avatar
              {...path}
              key={index}
              size={size}
              style={{
                marginRight:
                  index === limit - 1 && paths.length <= limit ? 0 : gap,
              }}
            />
          ))}
          {paths.length > limit && (
            <div
              ref={ref}
              className={[Style.more, Style.container].join(" ")}
            >{`+${paths.length - limit}`}</div>
          )}
        </div>
      </>
    );
  }
);

export { Avatars };