import React, { useRef, useEffect, useState } from "react";
import Style from "./style.module.css";
import { DropDownMenuPropsWithList } from "./props.interface";
import DropDownMenuContainer from "./container";
import { AnimatePresence, motion } from "framer-motion";
import { itemVariants } from ".";

function DropDownMenuList({
  list,
  visible,
  setVisible,
  visibleList,
  setVisibleList,
  hiddenOutsideClick = true,
  observeElement = null,
  hiddenHover = false,
  openCallback,
  trigger,
  callbackClickItem,
  formatText = "trim",
  speedScrolling = 2000,
}: DropDownMenuPropsWithList) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [_x, _setX] = useState(0);
  const [_y, _setY] = useState(0);

  const handleHover = (event: React.MouseEvent) => {
    if (observeElement && observeElement.current) {
      setVisible && setVisible(true);
      setVisibleList && setVisibleList(true);
    }
  };

  const handleLeave = () => {
    setVisibleList && setVisibleList(false);
  };

  useEffect(() => {
    if (visible) {
      if (openCallback) {
        const res = openCallback(
          menuRef.current as HTMLElement,
          observeElement?.current as HTMLElement,
          undefined
        );
        if (res) {
          _setX(res.x);
          _setY(res.y);
        }
      }
    }
  }, [visible]);

  useEffect(() => {
    if (menuRef && menuRef.current) {
      menuRef.current.addEventListener("mouseover", handleHover as any);
    }

    return () => {
      if (menuRef && menuRef.current) {
        menuRef.current.removeEventListener("mouseover", handleHover as any);
      }
    };
  }, [menuRef, visible]);

  useEffect(() => {
    if (menuRef && menuRef.current) {
      menuRef.current.addEventListener("click", handleHover as any);
    }

    return () => {
      if (menuRef && menuRef.current) {
        menuRef.current.removeEventListener("click", handleHover as any);
      }
    };
  }, [menuRef, visible]);

  useEffect(() => {
    if (menuRef && menuRef.current) {
      menuRef.current.addEventListener("mouseleave", handleLeave as any);
    }

    return () => {
      if (menuRef && menuRef.current) {
        menuRef.current.removeEventListener("mouseleave", handleLeave as any);
      }
    };
  }, [menuRef, visible]);

  useEffect(() => {
    if (hiddenHover) {
      if (observeElement && observeElement.current) {
        observeElement.current.addEventListener(
          "mouseleave",
          handleLeave as any
        );
      }
    }

    return () => {
      if (hiddenHover && observeElement && observeElement.current) {
        observeElement.current.removeEventListener(
          "mouseleave",
          handleLeave as any
        );
      }
    };
  }, [hiddenHover]);

  useEffect(() => {
    if (observeElement && observeElement.current) {
      observeElement.current.addEventListener("mouseover", handleHover as any);
    }

    return () => {
      if (observeElement && observeElement.current) {
        observeElement.current.removeEventListener(
          "mouseover",
          handleHover as any
        );
      }
    };
  }, [observeElement]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={Style.container}
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={[_x, _y]}
          ref={menuRef}
        >
          <DropDownMenuContainer
            list={list}
            setVisible={setVisible}
            callbackClickItem={callbackClickItem}
            formatText={formatText}
            speedScrolling={speedScrolling}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DropDownMenuList;
