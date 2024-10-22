import { IoIosArrowDown } from "react-icons/io";
import {AccordionListProps, AccordionItem} from "./props.interface";
import Style from "./style.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";


function Accordion({
  list,
  className,
  style,
  type,
  format,
}: AccordionListProps) {
  
  const [listState, setListState] = useState<AccordionItem[]>(list);

  const handleClick = (item: AccordionItem, index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (type === "single") {
      setListState((prevState) => {
        const newState = [...prevState];
        const visible = newState[index].visible;
        newState.forEach((item) => (item.visible = false));
        newState[index].visible = !visible;
        return newState;
      })
    } else {
      setListState((prevState) => {
        const newState = [...prevState];
        newState[index].visible = !newState[index].visible;
        return newState;
      });
    }
  };

  let classN = Style.container;
  if (className) {
    classN += " " + className;
  }

  return (
    <div className={classN} style={style}>
      {listState.map((item, index) => (
        <div className={Style.accordion} key={index}>
          <div className={Style.accordionHeader}>
            <div className={Style.accordionTitle}>
              {format === "list" && (
                <div className={Style.accordionNumber}>{index + 1}.</div>
              )}
              {format === "marker" && (
                <div className={Style.accordionMarker}>{item.marker}</div>
              )}
              {format === "icon" && (
                <div className={Style.accordionIcon}>{item.icon}</div>
              )}
              <div className={Style.accordionText}>{item.title}</div>
            </div>
            <button
              className={Style.accordionToggle}
              onClick={(e) => {
                handleClick(item, index, e);
              }}
            >
              <motion.div
                className={Style.accordionToggleIcon}
                animate={{ rotate: item.visible ? 180 : 0 }}
              >
                <IoIosArrowDown />
              </motion.div>
            </button>
          </div>
          <AnimatePresence>
            {item.visible && (
              <motion.div
                className={Style.accordionContent}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
          {index < list.length - 1 && (
            <div className={Style.accordionDivider} />
          )}
        </div>
      ))}
    </div>
  );
}

export { Accordion };