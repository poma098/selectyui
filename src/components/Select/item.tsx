import { FaCheck } from "react-icons/fa6";
import Style from "./style.module.css";
import {
  Checked,
  OptionProps,
  OptionPropsWithChecked,
} from "./props.interface";
import { useEffect, useState } from "react";
import ScrollingText from "../../components/ScrollingText";

function SelectOption({
  id,
  icon,
  label,
  description,
  disabled,
  hidden,
  checked,
  hasIcon = true,
  onChange = () => {},
  limit = 1,
  autoClose = true,
  setVisible = () => {},
  formatText = "trim",
  speedScrolling = 2000,
}: OptionPropsWithChecked) {
  const isChecked = Array.isArray(checked)
    ? checked.includes(id)
    : checked === id;
  if (hidden) return null;

  const isLimit =
    Array.isArray(checked) && limit > 1 ? checked.length >= limit : false;

  const handleClick = (event: React.MouseEvent) => {
    let values: Checked[] = [];
    if (Array.isArray(checked) && !checked.includes(id)) {
      values = [...checked, id];
      if (limit === 1) values = [id];
      onChange(values);
    } else if (Array.isArray(checked) && checked.includes(id)) {
      values = checked.filter((item: any) => item !== id);
      if (limit === 1) values = [];
      onChange(values);
    } else {
      values = [id];
      onChange(values);
    }
    if (autoClose) {
      setVisible(false);
    }
  };

  return (
    <button
      className={Style.item}
      data-checked={isChecked}
      disabled={isChecked ? disabled : isLimit ? true : disabled}
      onClick={handleClick}
    >
      <div className={Style.checked}>{isChecked && <FaCheck />}</div>
      <div className={Style.dataItem}>
        {hasIcon && <div className={Style.iconItem}>{icon}</div>}
        <div className={Style.textItem}>
          <div className={Style.titleItem}>
            {typeof label === "string" && formatText === "scrolling" && (
              <ScrollingText
                text={label}
                speed={speedScrolling}
                gap={30}
                direction="ltr"
              />
            )}
            {typeof label === "string" && formatText === "trim" && (
              <span
                className={Style.titleTrim}
              >
                {label}
              </span>
            )}
            {typeof label === "string" && formatText === "none" && label}
            {typeof label !== "string" && label}
          </div>
          {description && (
            <div
              className={Style.descriptionItem}
              data-not-string={typeof description !== "string"}
            >
              {typeof description === "string" &&
                formatText === "scrolling" && (
                  <ScrollingText
                    text={description}
                    speed={speedScrolling}
                    gap={30}
                    direction="ltr"
                  />
                )}

              {typeof description === "string" && formatText === "trim" && (
                <span
                  className={Style.descriptionTrim}
                >
                  {description}
                </span>
              )}
              {typeof description === "string" &&
                formatText === "none" &&
                description}
              {typeof description !== "string" && description}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default SelectOption;
