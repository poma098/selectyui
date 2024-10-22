import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.css";
import { ScrollingTextProps } from "./props.interface";
import { useUIFonts } from "context/UIContext";

const ScrollingText: React.FC<ScrollingTextProps> = ({
  text,
  width,
  height,
  speed,
  direction = "ltr",
  gap = 50,
  style,
  className,
  autoDetect = true,
}) => {
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { fontFamily } = useUIFonts();

  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    const textElement = textRef.current;
    const containerElement = containerRef.current;

    if (textElement) {
      setTextWidth(textElement.scrollWidth);
    }

    if (containerElement) {
      setContainerWidth(containerElement.offsetWidth);
    }
  }, [text, gap]);

  useEffect(() => {
    const textElement = textRef.current;
    const containerElement = containerRef.current;

    setTimeout(() => {
      if (textElement) {
        setTextWidth(textElement.scrollWidth);
      }

      if (containerElement) {
        setContainerWidth(containerElement.offsetWidth);
      }
    }, 100);
  }, [fontFamily]);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      const resizeObserver = new ResizeObserver(() => {
        setContainerWidth(containerElement.offsetWidth);
      });

      resizeObserver.observe(containerElement);

      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    if (autoDetect) {
      if (textWidth > containerWidth) {
        setAnimation(true);
      } else {
        setAnimation(false);
      }
    } else {
      setAnimation(true);
    }
      
  }, [textWidth, containerWidth, gap, fontFamily, autoDetect]);

  const animationDuration = (textWidth + gap) / (speed / 60);

  const variants = {
    animate: (textWidth: number) => {
      return {
        x: [
          direction === "ltr" ? 0 : -(textWidth + gap),
          direction === "ltr" ? -(textWidth + gap) : 0,
        ],
        transition: {
          repeat: Infinity,
          duration: animationDuration,
          ease: "linear",
        },
      };
    },
  };

  return (
    <div
      className={[styles.container, className].join(" ")}
      style={{ width, height, ...style }}
      ref={containerRef}
    >
      <div className={styles.textWrapper} style={{ whiteSpace: "nowrap" }}>
        {(animation)
           && (
            <>
              <motion.div
                className={styles.text}
                variants={variants}
                animate="animate"
                custom={textWidth}
                style={{ width: textWidth + gap - 1 }}
              >
                {text}
              </motion.div>
              <motion.div
                className={styles.text}
                variants={variants}
                animate="animate"
                custom={textWidth}
                style={{ width: textWidth + gap - 1 }}
              >
                {text}
              </motion.div>
            </>
          )}
        <div
          className={styles.text}
          style={{
            opacity: 0,
            position: "absolute",
            pointerEvents: "none",
            zIndex: -9999,
          }}
          ref={textRef}
        >
          {text}
        </div>
        {!animation && <div className={styles.text}>{text}</div>}
      </div>
    </div>
  );
};

export { ScrollingText };
