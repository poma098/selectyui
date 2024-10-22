import React, { useRef, useEffect, useState } from "react";
import Style from "./style.module.css";
import {
  DropDownMenuProps,
} from "./props.interface";
import DropDownMenuContainer from "./container";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { definitionCoords } from "utils/definitionCoords";

export const itemVariants: Variants = {
  initial: ([x, y]: [number, number]) => ({
    opacity: 0,
    top: y + 10,
    left: x,
    y: 10,
    pointerEvents: "none",
    transition: {
      type: "spring",
      ease: "easeInOut",
      top: {
        duration: 0,
      },
      left: {
        duration: 0,
      },
      damping: 22,
      stiffness: 400,
    },
  }),
  animate: ([x, y]: [number, number]) => ({
    opacity: 1,
    top: y,
    left: x,
    y: 0,
    pointerEvents: "auto",
    transition: {
      type: "spring",
      ease: "easeInOut",
      top: {
        duration: 0,
      },
      left: {
        duration: 0,
      },
      damping: 22,
      stiffness: 400,
    },
  }),
  exit: ([x, y]: [number, number]) => ({
    opacity: 0,
    top: y + 10,
    left: x,
    pointerEvents: "none",
    transition: {
      type: "spring",
      ease: "easeInOut",
      left: {
        duration: 0,
      },
      top: {
        delay: 0.1,
      },
      opacity: {
        delay: 0.1,
      },
      damping: 18,
      stiffness: 180,
    },
  }),
};




/**
 * Рендерит компонент выпадающего меню.
 *
 * @example
 * const [visibleDropDownMenu, setVisibleDropDownMenu] = useState(false);
 * const refDropDownMenuButton = useRef(null);
 * 
 * const handleClickDropDownMenu = (
 *  item: HTMLElement,
 *  parent: HTMLElement,
 *  e: React.MouseEvent | undefined
 * ) => {
 *  return definitionCoords(item, parent, "topOrBottom");
 * };
 * 
 * <button ref={refDropDownMenuButton}>Open DropDownMenu</button>
 * 
 * <DropDownMenu
 *   list={listDropDownMenu}
 *   visible={visibleDropDownMenu}
 *   setVisible={setVisibleDropDownMenu}
 *   observeElement={refDropDownMenuButton}
 *   trigger="click"
 *   hiddenOutsideClick={true}
 * />
 *
 * @example
 * <DropDownMenu
 *   list={listDropDownMenu}
 *   visible={visibleDropDownMenu}
 *   setVisible={setVisibleDropDownMenu}
 *   openPosition="topOrBottom"
 *   trigger="hover"
 *   xStart={50}
 *   yStart={50}
 * />
 *
 *
 * @example
 * <DropDownMenu
 *   list={listDropDownMenu}
 *   visible={visibleDropDownMenu}
 *   setVisible={setVisibleDropDownMenu}
 *   observeElement={refDropDownMenuButton}
 *   openCallback={handleClickDropDownMenu}
 *   trigger="hover"
 *   hiddenOutsideClick={true}
 * />
 *
 * @param {Object} props - Свойства для компонента DropdownMenu.
 * @param {Array<DropDownMenuContainerItem>} props.list - Список элементов для отображения в выпадающем меню.
 * @param {boolean} props.visible - Определяет, видимо ли выпадающее меню.
 * @param {Function} props.setVisible - Функция для установки видимости выпадающего меню.
 * @param {HTMLElement | null} [props.observeElement=null] - Элемент для отслеживания событий наведения или клика.
 * @param {Function} [props.openCallback=undefined] - Функция, которая будет вызвана при открытии выпадающего меню.
 * @param {DropDownMenuPosition} [props.openPosition='auto'] - Позиция выпадающего меню.
 * @param {DropDownMenuTrigger} [props.trigger='hover'] - Тип события для открытия выпадающего меню.
 * @param {number} [props.xStart=0] - Начальная x-координата выпадающего меню.
 * @param {number} [props.yStart=0] - Начальная y-координата выпадающего меню.
 * @param {boolean} [props.hiddenOutsideClick=true] - Скрыть выпадающее меню при щелчке вне его.
 * @return {JSX.Element} Рендер компонента выпадающего меню.
 */
function DropDownMenu({
  list,
  visible,
  setVisible,
  hiddenOutsideClick = true,
  observeElement = null,
  hiddenHover = false,
  openCallback,
  openPosition = "auto",
  trigger = "hover",
  xStart = 0,
  yStart = 0,
  onMouseEnter,
  onMouseLeave,
  callbackClickItem,
  formatText = "trim",
  speedScrolling = 2000,
  style,
  className,
}: DropDownMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [_x, _setX] = useState(0);
  const [_y, _setY] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (hiddenOutsideClick && setVisible) {
          setVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hiddenOutsideClick]);

  const handleHover = (event: React.MouseEvent) => {
    if (trigger === "hover") {
      if (observeElement && observeElement.current) {
        setVisible && setVisible(true);
      }
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    if (trigger === "click") {
      setVisible && setVisible(true);
    }
  };

  useEffect(() => {
    if (visible) {
      if (openCallback) {
        try {
          const res = openCallback(
            menuRef.current as HTMLElement,
            (observeElement?.current as HTMLElement) ||
              (observeElement?.current as HTMLButtonElement),
            undefined
          );
          if (res) {
            _setX(res.x || xStart);
            _setY(res.y || yStart);
          }
        } catch (error) {
          _setX(xStart);
          _setY(yStart);
        }
      } else {
        try {
          const { x, y } = definitionCoords(
            menuRef.current as HTMLElement,
            (observeElement?.current as HTMLElement || observeElement?.current as HTMLButtonElement),
            openPosition
          );

          _setX(x || xStart);
          _setY(y || yStart);
        } catch (error) {
          _setX(xStart);
          _setY(yStart);
        }
      }
    }
  }, [visible]);

  const handleLeave = () => {
    setVisible && setVisible(false);
  };

  useEffect(() => {
    if (observeElement && observeElement.current) {
      observeElement.current.addEventListener("click", handleClick as any);
    }

    return () => {
      if (observeElement && observeElement.current) {
        observeElement.current.removeEventListener("click", handleClick as any);
      }
    };
  }, [observeElement, trigger, menuRef.current]);

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
  }, [hiddenHover, trigger]);

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
  }, [observeElement, trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={[Style.container, className].join(" ")}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={[_x, _y]}
          variants={itemVariants}
          ref={menuRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ ...style }}
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

export { DropDownMenu };
