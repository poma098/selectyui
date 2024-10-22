import { forwardRef, useRef, useState } from "react";
import { TooltipIconProps } from "./props.interface";
import { FaQuestionCircle } from "react-icons/fa";
import { Tooltip } from "../../components/Tooltip";
import Style from "./style.module.css";
import { motion, Variants } from "framer-motion";
import React, { useEffect } from "react";

const TooltipIcon = forwardRef<HTMLDivElement, TooltipIconProps>(
  (
    {
      icon = <FaQuestionCircle />,
      tooltipProps,
      className,
      style,
      initOpacity = 0.5,
    },
    ref
  ) => {
    const refQuestion = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState<boolean>(false);

    const variants: Variants = {
      initial: ([isHover, opacity]: [boolean, TooltipIconProps["initOpacity"]]) => {
        return {
          opacity: isHover ? 1 : opacity,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        };
      },
    };

    return (
      <>
        <motion.div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          variants={variants}
          initial="initial"
          animate="initial"
          exit="initial"
          custom={[isHover, initOpacity]}
          ref={refQuestion}
          className={[Style.container, className].join(" ")}
          style={style}
        >
          {icon}
        </motion.div>
        <Tooltip
          observeElement={refQuestion}
          {...tooltipProps}
          onMouseLeave={() => setIsHover(false)}
          onMouseEnter={() => setIsHover(true)}
        />
      </>
    );
  }
);

export { TooltipIcon };
