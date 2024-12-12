import { IoIosArrowDown } from "react-icons/io";
import {
  DropDownMenuContainerItem,
  DropDownMenuItem as IDropDownMenuItem,
} from "./props.interface";
import Style from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import DropDownMenuList from "./list";
import { useShortcuts } from "../../context/UIContext";
import { ShortcutObject } from "../../types/shortcut.interface";
import { definitionCoords } from "utils/definitionCoords";
import { ScrollingText } from "../../components/ScrollingText";
import React from "react";

function DropDownMenuItem({
  item,
  index,
  hasIcon,
  setVisible,
  callbackClickItem,
  formatText = "trim",
  speedScrolling = 2000,
}: DropDownMenuContainerItem) {

  const [visibleList, setVisibleList] = useState(false);
  const refItem = useRef(null);
  const { shortcuts, getShortcutByKey } = useShortcuts();

  const [shortcat, setShortcat] = useState<ShortcutObject>();

  useEffect(() => {
    if (item.shortcutKey) {
      const shortcut = getShortcutByKey(item.shortcutKey);
      setShortcat(shortcut);
    }
  }, [item.shortcutKey]);
    
  const handleClick = (
    item: IDropDownMenuItem,
    index: number,
    event: React.MouseEvent,
  ) => {
    if (item.disabled) return;
    if (item.hidden) return;
    if (!item.list){
      setVisibleList && setVisibleList(false);
      callbackClickItem && callbackClickItem(item, index);
      setVisibleList(false);
      setVisible && setVisible(false);
      item.callback && item.callback(item, index);
    } else {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleHover = (
    item: HTMLElement,
    parent: HTMLElement,
    e: React.MouseEvent | undefined
  ) => {
    return definitionCoords(item, parent, "auto");
  };

  return (
    <>
      <button
        ref={refItem}
        className={Style.item}
        data-disabled={item.disabled}
        data-opened={visibleList}
        data-has-icon={hasIcon}
        data-active={item?.active}
        onClick={(e) => {
          handleClick(item, index, e);
        }}
        data-has-list={item.list ? true : false}
      >
        {hasIcon && <div className={Style.icon}>{item.icon}</div>}
        <div className={Style.text}>
          <div
            className={Style.label}
            style={formatText === "none" ? { whiteSpace: "normal" } : undefined}
          >
            {typeof item.label === "string" && formatText === "trim" && (
              <span className={Style.textTrim}>{item.label}</span>
            )}
            {typeof item.label === "string" && formatText === "scrolling" && (
              <ScrollingText text={item.label} speed={speedScrolling} />
            )}
            {typeof item.label === "string" &&
              formatText === "none" &&
              item.label}
            {typeof item.label !== "string" && item.label}
          </div>
          {item.description && (
            <div
              className={Style.description}
              style={
                formatText === "none" ? { whiteSpace: "normal" } : undefined
              }
            >
              {typeof item.description === "string" &&
                formatText === "trim" && (
                  <span className={Style.textTrim}>{item.description}</span>
                )}
              {typeof item.description === "string" &&
                formatText === "scrolling" && (
                  <ScrollingText
                    text={item.description}
                    speed={speedScrolling}
                  />
                )}
              {typeof item.description === "string" &&
                formatText === "none" &&
                item.description}
              {typeof item.description !== "string" && item.description}
            </div>
          )}
        </div>
        {item.list && (
          <div className={Style.arrow}>
            <IoIosArrowDown />
          </div>
        )}
        {!item.list && shortcat && (
          <div className={Style.shortcut}>{shortcat.element}</div>
        )}
      </button>
      {item.list && (
        <DropDownMenuList
          list={item.list}
          visible={visibleList}
          setVisible={setVisible}
          setVisibleList={setVisibleList}
          observeElement={item.disabled ? null : refItem}
          openCallback={handleHover}
          trigger="hover"
          hiddenHover={true}
          callbackClickItem={callbackClickItem}
          hiddenOutsideClick={true}
          formatText={formatText}
          speedScrolling={speedScrolling}
        />
      )}
    </>
  );
}

export default DropDownMenuItem;
