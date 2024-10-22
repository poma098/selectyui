import { useRef, useState, useEffect } from "react";
import { MenuBarItemProps } from "./props.interface";
import Style from "./style.module.css";
import { DropDownMenu } from "../../components/DropDownMenu";
import { PADDING_Y } from "utils/definitionCoords";
import React from "react";

function ManubarItem({
  activeIndex,
  setActiveIndex,
  item,
  index,
  rectActiveItem,
  setRectActiveItem,
  refContainer,
  trigger,
  propsDropDownMenu = {},
  
}: MenuBarItemProps) {
  const [active, setActive] = useState(false);
  const [coordItem, setCoordItem] = useState({ x: 0, y: 0 });
  const refItem = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === index) {
      setActive(true);
      updateCoordinates();
    } else if (active && trigger === "click") {
      setActive(false);
      setRectActiveItem && setRectActiveItem(undefined);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (trigger === "click" && item.list && !item.list.length) {
      setActive(false);
      setRectActiveItem && setRectActiveItem(undefined);
    }
  }, [item.list]);

  const updateCoordinates = () => {
    if (refItem.current) {
      const itemRect = refItem.current.getBoundingClientRect();
      const containerRect = refContainer?.current?.getBoundingClientRect();

      // Функция для нахождения ближайшего фиксированного предка
      const findFixedAncestor = (
        element: HTMLElement | null
      ): HTMLElement | null => {
        let currentElement = element;
        while (currentElement && currentElement !== document.documentElement) {
          const position = window.getComputedStyle(currentElement).position;
          if (position === "fixed") {
            return currentElement;
          }
          currentElement = currentElement.parentElement;
        }
        return null;
      };

      // Найти ближайшего фиксированного предка
      const fixedAncestor = findFixedAncestor(refItem.current.parentElement);

      if (fixedAncestor) {
        const fixedAncestorRect = fixedAncestor.getBoundingClientRect();
        const relativeX = itemRect.left - fixedAncestorRect.left;
        const relativeY = itemRect.bottom - fixedAncestorRect.top;
        setCoordItem({ x: relativeX, y: relativeY - PADDING_Y });

        if (containerRect) {
          // Устанавливаем глобальные координаты для rectActiveItem
          setRectActiveItem &&
            setRectActiveItem({
              ...itemRect,
              x: itemRect.x - containerRect.x - 1,
              y: itemRect.y - containerRect.y - 1,
              width: itemRect.width,
              height: itemRect.height,
            });
        }
        
      } else {
        // Если нет фиксированного предка, передаем глобальные координаты элемента
        setCoordItem({ x: itemRect.left, y: itemRect.bottom - PADDING_Y });

        if (containerRect) {
          // Устанавливаем глобальные координаты для rectActiveItem
          setRectActiveItem &&
            setRectActiveItem({
              ...itemRect,
              x: itemRect.x - containerRect.x - 1,
              y: itemRect.y - containerRect.y - 1,
              width: itemRect.width,
              height: itemRect.height,
            });
        }
          
      }
    }
  };

  // const updateCoordinates = () => {
  //   if (refItem.current) {
  //     const rect = refItem.current.getBoundingClientRect();
  //     const containerRect = refContainer?.current?.getBoundingClientRect();

  //     if (containerRect) {
  //       setCoordItem({ x: rect.x, y: rect.bottom - PADDING_Y });
  //       rect.x -= containerRect.x + 1;
  //       rect.y -= containerRect.y + 1;
  //     } else {
  //       setCoordItem({ x: rect.x, y: rect.bottom - PADDING_Y });
  //     }

  //     setRectActiveItem && setRectActiveItem(rect);
  //   }
  // };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      openMenu();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      closeMenu();
    }
  };

  const handleClick = () => {
    if (trigger === "click" && item.list) {
      if (active) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    if (item.callback) {
      if (trigger === "click") {
        closeMenu();
      }
      if (trigger === "hover") {

      }
      item.callback(item, index);
    }
  };

  const openMenu = () => {
    setActiveIndex(index);
    updateCoordinates();
    setActive(true);
  };

  const closeMenu = () => {
    setActiveIndex(undefined);
    setActive(false);
    setRectActiveItem && setRectActiveItem(undefined);
  };

  const handleDropDownMouseEnter = () => {
    setActive(true);
  };

  const handleDropDownMouseLeave = () => {
    if (trigger === "click") {
      if (!item.list || !item.list.length) {
        closeMenu();
      }
    } else {
      setActive(false);
    }
  };

  return (
    <>
      <button
        className={Style.item}
        disabled={item.disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={trigger === "hover" ? handleMouseLeave : undefined}
        onClick={handleClick}
        ref={refItem}
        data-active={trigger === "hover" ? true : active}
        data-open-hover={trigger === "hover" ? active : false}
        data-not-list={!item.list}
      >
        {item.icon && <div className={Style.icon}>{item.icon}</div>}
        <div className={Style.data}>
          <div className={Style.title}>{item.label}</div>
          {item.description && (
            <div className={Style.description}>{item.description}</div>
          )}
        </div>
      </button>
      {item.list && (
        <DropDownMenu
          {...propsDropDownMenu}
          list={item.list}
          visible={active}
          setVisible={setActive}
          xStart={coordItem.x}
          yStart={coordItem.y}
          hiddenOutsideClick={trigger === "click"}
          onMouseEnter={handleDropDownMouseEnter}
          onMouseLeave={handleDropDownMouseLeave}
          callbackClickItem={(item, index) => {
            closeMenu();
            setActiveIndex(undefined);
          }}
        />
      )}
    </>
  );
}

export default ManubarItem;
