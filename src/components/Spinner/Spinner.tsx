import Style from "./style.module.css";
import { ReactComponent as Spin } from "./ring.svg";
import React from "react";
import { PropsSpinner } from "./props.interface";

function Spinner({ className, color, size }: PropsSpinner) {
  return (
    <Spin
      className={`${Style.spinner} ${className}`}
      style={{ height: size, width: size, stroke: color ? color : "var(--main-color1)" }}
    />
  );
}

export { Spinner };
