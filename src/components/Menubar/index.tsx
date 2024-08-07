import { useEffect, useRef, useState } from "react";
import ManubarItem from "./item";
import { MenuBarProps, SizeBackgroundItem } from "./props.interface";
import Style from "./style.module.css";
import { motion } from "framer-motion";
import { RefObject } from "react";

function useClickAway(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function Menubar({
  items,
  style,
  className,
  trigger = "hover",
  propsDropDownMenu,
}: MenuBarProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [rectActiveItem, setRectActiveItem] = useState<DOMRect | undefined>();
  const [sizeBackgroundItem, setSizeBackgroundItem] =
    useState<SizeBackgroundItem | null>(null);

  const refContent = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  useClickAway(refContainer, () => {
    setActiveIndex(undefined);
    setRectActiveItem(undefined);
  });

  useEffect(() => {
    if (activeIndex !== undefined && rectActiveItem) {
      const newSizeBackgroundItem: SizeBackgroundItem = {
        x: rectActiveItem.x,
        y: rectActiveItem.y,
        width: rectActiveItem.width,
        height: rectActiveItem.height,
        opacity: 1,
      };
      setSizeBackgroundItem(newSizeBackgroundItem);
    } else {
      if (sizeBackgroundItem) {
        setSizeBackgroundItem((prev) => ({
          ...(prev || { x: 0, y: 0, width: 0, height: 0, opacity: 0 }),
          opacity: 0,
        }));
      } else if (refContent.current && refContainer.current) {
        const styleContainer = getComputedStyle(refContainer.current);
        const initialSizeBackgroundItem: SizeBackgroundItem = {
          x: parseInt(
            styleContainer.paddingLeft || styleContainer.marginLeft,
            10
          ),
          y: parseInt(
            styleContainer.paddingTop || styleContainer.marginTop,
            10
          ),
          width: refContent.current.offsetWidth,
          height: refContent.current.offsetHeight,
          opacity: 0,
        };
        setSizeBackgroundItem(initialSizeBackgroundItem);
      }
    }
  }, [activeIndex, rectActiveItem]);

  return (
    <div
      className={[Style.container, className].join(" ")}
      style={style}
      ref={refContainer}
    >
      <div className={Style.content} ref={refContent}>
        {items.map((item, index) => {
          if (item.hidden) return null;
          return (
            <ManubarItem
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              rectActiveItem={rectActiveItem}
              setRectActiveItem={setRectActiveItem}
              refContainer={refContainer}
              trigger={trigger}
              propsDropDownMenu={propsDropDownMenu}
            />
          );
        })}
      </div>
      <div className={Style.background}>
        <motion.div
          className={Style.backgroundItem}
          initial={{
            width: sizeBackgroundItem?.width || 0,
            height: sizeBackgroundItem?.height || 0,
            opacity: sizeBackgroundItem?.opacity || 0,
            x: sizeBackgroundItem?.x || 0,
            y: sizeBackgroundItem?.y || 0,
          }}
          animate={{
            width: sizeBackgroundItem?.width,
            height: sizeBackgroundItem?.height,
            opacity: sizeBackgroundItem?.opacity,
            x: sizeBackgroundItem?.x,
            y: sizeBackgroundItem?.y,
          }}
        ></motion.div>
      </div>
    </div>
  );
}

export default Menubar;
