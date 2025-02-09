import React, { forwardRef, useEffect, useRef, useState } from "react";
import { TooltipProps } from "./props.interface";
import Style from "./style.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { definitionCoords } from "utils/definitionCoords";
import { Variant } from "./animation";
import { Button } from "../../components/Button";
import { useUITheme } from "../../context/UIContext";
import { DropDownMenuPosition } from "../../types/definitionCoords.interface";
import { ReactComponent as Triangle } from "../../assets/svg/triangle.svg";

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      observeElement,
      trigger = "hover",
      hiddenOutsideClick = true,
      visible = false,
      theme = "automatic",
      buttons = [],
      icon,
      title,
      body,
      children,
      style,
      className,
      triangleColor,
      position = "auto",
      triangeVisible = true,
      onMouseEnter,
      onMouseLeave,
      padding,
      delay = 300, // TODO: Добавить задержку наведения курсора на наблюдаемый элемент
    }: TooltipProps,
    ref
  ) => {
    const { realTheme } = useUITheme();

    const [visibleTooltip, setVisibleTooltip] = useState(visible);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const refTooltip = useRef<HTMLDivElement>(null);
    const refObserveElement = observeElement;

    const [factTheme, setFactTheme] = useState(theme);
    const [animationDirection, setAnimationDirection] =
      useState<DropDownMenuPosition>("center-top");

    const [coordsTriangle, setCoordsTriangle] = useState<{
      left: number | "initial";
      right: number | "initial";
      top: number | "initial";
      bottom: number | "initial";
      rotate: 0 | 90 | 180 | 270;
      x: number;
      y: number;
    }>({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      rotate: 0,
      x: 0,
      y: 0,
    });

    const handleMouseEnter = () => {
      if (trigger === "hover") {
        setVisibleTooltip(true);
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (trigger === "hover") {
        if (
          !refTooltip.current?.contains(event.relatedTarget as Node) &&
          !refObserveElement.current?.contains(event.relatedTarget as Node)
        ) {
          setVisibleTooltip(false);
        }
      }
    };

    const handleTooltipMouseEnter = () => {
      setVisibleTooltip(true);
    };

    const handleTooltipMouseLeave = () => {
      setVisibleTooltip(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        refTooltip.current &&
        !refTooltip.current.contains(event.target as Node) &&
        refObserveElement.current &&
        !refObserveElement.current.contains(event.target as Node)
      ) {
        if (hiddenOutsideClick) setVisibleTooltip(false);
      }
    };

    useEffect(() => {
      if (theme === "automatic") {
        setFactTheme(realTheme === "light" ? "light" : "dark");
      } else {
        setFactTheme(theme);
      }
    }, [theme, realTheme]);

    useEffect(() => {
      setVisibleTooltip(visible);
    }, [visible]);

    useEffect(() => {
      if (trigger === "click") {
        const handleClick = () => {
          setVisibleTooltip((prev) => !prev);
        };

        const observeEl = refObserveElement.current;
        if (observeEl) {
          observeEl.addEventListener("click", handleClick);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          if (observeEl) {
            observeEl.removeEventListener("click", handleClick);
          }
          document.removeEventListener("mousedown", handleClickOutside);
        };
      } else {
        const observeEl = refObserveElement.current;
        if (observeEl) {
          observeEl.addEventListener(
            "mouseenter",
            handleMouseEnter as EventListener
          );
          observeEl.addEventListener(
            "mouseleave",
            handleMouseLeave as EventListener
          );
        }

        return () => {
          if (observeEl) {
            observeEl.removeEventListener(
              "mouseenter",
              handleMouseEnter as EventListener
            );
            observeEl.removeEventListener(
              "mouseleave",
              handleMouseLeave as EventListener
            );
          }
        };
      }
    }, [trigger, hiddenOutsideClick, refTooltip, refObserveElement]);

    useEffect(() => {
      if (trigger === "hover" && refTooltip.current) {
        const tooltipEl = refTooltip.current;

        tooltipEl.addEventListener("mouseenter", handleTooltipMouseEnter);
        tooltipEl.addEventListener("mouseleave", handleTooltipMouseLeave);

        return () => {
          tooltipEl.removeEventListener("mouseenter", handleTooltipMouseEnter);
          tooltipEl.removeEventListener("mouseleave", handleTooltipMouseLeave);
        };
      }
    }, [trigger, refTooltip.current]);

    useEffect(() => {
      if (refTooltip.current && refObserveElement.current) {
        const {
          x,
          y,
          widthParent,
          heightParent,
          position: positionElement,
        } = definitionCoords(
          refTooltip.current,
          refObserveElement.current,
          position,
          ["center-top", "center-bottom", "right-center", "left-center"]
        );

        const PADDING_X = 16;
        const PADDING_Y = 15;

        setAnimationDirection(positionElement);

        switch (positionElement) {
          case "right-top": {
            setCoordsTriangle({
              left: -18,
              right: "initial",
              top: 0,
              bottom: "initial",
              rotate: 270,
              x: 6,
              y: 23,
            });

            setX(x + PADDING_X);
            setY(y - 10);
            break;
          }
          case "right-center": {
            setCoordsTriangle({
              left: -18,
              right: "initial",
              top: -32,
              bottom: 0,
              rotate: 270,
              x: 6,
              y: 14,
            });

            setX(x + PADDING_X);
            setY(y);
            break;
          }
          case "right-bottom": {
            setCoordsTriangle({
              left: -18,
              right: "initial",
              top: "initial",
              bottom: 34,
              rotate: 270,
              x: 6,
              y: 8,
            });

            setX(x + PADDING_X);
            setY(y + PADDING_Y);
            break;
          }
          case "left-top": {
            setCoordsTriangle({
              right: -18,
              left: "initial",
              top: 0,
              bottom: "initial",
              rotate: 90,
              x: -6,
              y: 23,
            });

            setX(x - PADDING_X);
            setY(y - heightParent / 2 - 1);
            break;
          }
          case "left-center": {
            setCoordsTriangle({
              right: -18,
              left: "initial",
              top: -32,
              bottom: 0,
              rotate: 90,
              x: -6,
              y: 14,
            });

            setX(x - PADDING_X);
            setY(y);
            break;
          }
          case "left-bottom": {
            setCoordsTriangle({
              right: -18,
              left: "initial",
              top: "initial",
              bottom: 34,
              rotate: 90,
              x: -6,
              y: 8,
            });

            setX(x - PADDING_X);
            setY(y + PADDING_Y);
            break;
          }
          case "center-top": {
            setCoordsTriangle({
              left: 0,
              right: 0,
              top: "initial",
              bottom: 2,
              rotate: 180,
              x: 0,
              y: 1,
            });

            setX(x);
            setY(y - PADDING_Y);
            break;
          }
          case "center-bottom": {
            setCoordsTriangle({
              left: 0,
              right: 0,
              top: -26,
              bottom: "initial",
              rotate: 0,
              x: 0,
              y: 27,
            });

            setX(x);
            setY(y + PADDING_Y);
            break;
          }
          default: {
            setCoordsTriangle({
              left: "initial",
              right: "initial",
              top: 0,
              bottom: "initial",
              rotate: 0,
              x: 0,
              y: 23,
            });

            setX(x - PADDING_X);
            setY(y - PADDING_Y);
            break;
          }
        }
      }
    }, [visibleTooltip]);

    return (
      <AnimatePresence>
        {visibleTooltip && (
          <motion.div
            className={[Style.tooltip, className].join(" ")}
            ref={refTooltip}
            style={{ ...style, top: y, left: x }}
            custom={[x, y, animationDirection]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={Variant}
            data-theme={factTheme}
            data-content={children ? "children" : "template"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {!children && (
              <div className={Style.container} style={{
                padding
              }}>
                <div className={Style.content}>
                  {(icon || title) && (
                    <div className={Style.header}>
                      {icon && <div className={Style.icon}>{icon}</div>}
                      {title && <div className={Style.title}>{title}</div>}
                    </div>
                  )}
                  {body && <div className={Style.body}>{body}</div>}
                </div>
                {buttons && buttons.length > 0 && (
                  <div className={Style.buttons}>
                    {buttons.map((b, i) => {
                      if (b.children && typeof b.children === "function") {
                        return (
                          <Button key={i} {...b}>
                            {b.children}
                          </Button>
                        );
                      } else {
                        return <Button key={i} {...b} />;
                      }
                    })}
                  </div>
                )}
              </div>
            )}
            {children && children}
            {triangeVisible && (
              <>
                <div
                  className={Style.triangleHelper}
                  style={{
                    backgroundColor: triangleColor,
                    left: coordsTriangle.left,
                    top: coordsTriangle.top,
                    right: coordsTriangle.right,
                    bottom: coordsTriangle.bottom,
                    transform: `translateX(${coordsTriangle.x}px) translateY(${coordsTriangle.y}px) rotate(${coordsTriangle.rotate}deg)`,
                  }}
                ></div>
                <Triangle
                  className={Style.arrow}
                  fill={triangleColor}
                  style={{
                    left: coordsTriangle.left,
                    top: coordsTriangle.top,
                    right: coordsTriangle.right,
                    bottom: coordsTriangle.bottom,
                  }}
                  data-rotate={coordsTriangle.rotate}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export { Tooltip };
