import React from "react";
import { useUIFonts, useUILocale } from "../../context/UIContext";
import Select from "../../components/Select";
import { OptionProps } from "../../components/Select/props.interface";
import { FontSwitcherProps } from "./props.interface";
import Style from "./style.module.css";

function FontSwitcher ({
  placeholder = "Select font",
  searchPlaceholder = "Search",
  maxHeight = 200,
  searchNotFoundTitle = "Not found",
  searchNotFoundDescription = "Try changing your request!",
  styleSelect = { width: "250px" },
}: FontSwitcherProps) {
  const { fonts, setFonts, fontFamily, setFontFamily } = useUIFonts();
  const { getLocale } = useUILocale();

  const options: OptionProps[] = [];
  for (const [key, value] of Object.entries(fonts)) {
    options.push({
      id: key,
      label: getLocale(key),
      icon: <div style={{ fontFamily: key }} className={Style.icon}>Aa</div>,
    });
  }

  return (
    <Select
      options={options}
      value={fontFamily}
      hiddenOutsideClick={true}
      onChange={(e) => {
        setFontFamily(e[0] as string);
      }}
      placeholder={placeholder}
      search={true}
      searchPlaceholder={searchPlaceholder}
      autoClose={true}
      maxHeight={maxHeight}
      searchNotFoundTitle={searchNotFoundTitle}
      searchNotFoundDescription={searchNotFoundDescription}
      limit={1}
      visibleReset={false}
      styleSelect={{ ...styleSelect }}
    />
  );
};

export default FontSwitcher;