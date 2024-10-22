import React from "react";
import DropDownMenuDevider from "./devider";
import DropDownMenuItem from "./item";
import {
  DropDownMenuContainerProps,
  DropDownMenuItemDevider,
  DropDownMenuItem as IDropDownMenuItem,
} from "./props.interface";
import Style from "./style.module.css";

function hasIcon(list: IDropDownMenuItem[]): boolean {
  for (const item of list) {
    if (item.icon) {
      return true;
    }
  }
  return false;
}

function DropDownMenuContainer({
  list,
  setVisible,
  callbackClickItem,
  formatText = "trim",
  speedScrolling = 2000,
}: DropDownMenuContainerProps) {
  function isDevider(item: IDropDownMenuItem): item is DropDownMenuItemDevider {
    return (item as DropDownMenuItemDevider).devider === true;
  }

  const hasIcons = hasIcon(list);

  return (
    <div className={Style.wrapper}>
      {list.map((item, index) => {
        if (item.hidden) return null;
        return isDevider(item) ? (
          <DropDownMenuDevider key={index} />
        ) : (
          <DropDownMenuItem
            item={item}
            index={index}
            key={index}
            hasIcon={hasIcons}
            setVisible={setVisible}
            callbackClickItem={callbackClickItem}
            formatText={formatText}
            speedScrolling={speedScrolling}
          />
        );
      })}
    </div>
  );
}

export default DropDownMenuContainer;
