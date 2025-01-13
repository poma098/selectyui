import ItemRadialToolKit from "../Item/Item";
import Style from "./ItemsRadialToolKit.module.css";
import { PropsItemsRadialToolKit } from "../../props.interface";
import ItemMoreRadialToolKit from "../Item/More";
import React from "react";

function ItemsRadialToolKit({
  size,
  items,
  limit,
  visibleIcons,
  rotationAngle,
  triangleAngle,
  setActiveIndex,
  color,
  boxShadow,
  animation,
  selectedIndex,
}: PropsItemsRadialToolKit) {
  return (
    <div
      className={Style.container}
      style={{ minWidth: `${size}px`, minHeight: `${size}px` }}
    >
      {items.slice(0, limit ?? items.length).map((item, index) => (
        <ItemRadialToolKit
          key={index}
          index={index}
          size={size}
          item={item}
          length={limit < items.length ? limit + 1 : items.length}
          visibleIcon={visibleIcons}
          rotationAngle={rotationAngle}
          triangleAngle={triangleAngle}
          setActiveIndex={setActiveIndex}
          color={color}
          boxShadow={boxShadow}
          animation={animation}
          selectedIndex={selectedIndex}
        />
      ))}
      {items.slice(limit ?? items.length).length > 0 && (
        <ItemMoreRadialToolKit
          index={limit}
          size={size}
          items={items.slice(limit ?? items.length)}
          length={limit + 1}
          label={`Еще: +${items.slice(limit ?? items.length).length}`}
          visibleIcon={visibleIcons}
          rotationAngle={rotationAngle}
          triangleAngle={triangleAngle}
          setActiveIndex={setActiveIndex}
          color={color}
          boxShadow={boxShadow}
          animation={animation}
          selectedIndex={selectedIndex}
        />
      )}
    </div>
  );
}

export default ItemsRadialToolKit;
