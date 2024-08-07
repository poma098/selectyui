import { forwardRef, useRef, useState } from "react"
import { TooltipIconProps } from "./props.interface";
import { FaArrowAltCircleRight, FaQuestionCircle } from "react-icons/fa";
import Tooltip from "../../components/Tooltip";
import Style from "./style.module.css";
import { motion } from "framer-motion";

const TooltipIcon = forwardRef<HTMLDivElement, TooltipIconProps>(
  ({ icon = <FaQuestionCircle />, tooltipProps, className, style }, ref) => {
    const refQuestion = useRef(null);

    const [isHover, setIsHover] = useState(false);
    

    return (
      <>
        <motion.div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          animate={{ opacity: isHover ? 1 : 0.5 }}
          ref={refQuestion}
          className={[Style.container, className].join(" ")}
          style={style}
        >
          {icon}
        </motion.div>
        <Tooltip observeElement={refQuestion} {...tooltipProps} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}></Tooltip>
      </>
    );
  }
);

export default TooltipIcon;