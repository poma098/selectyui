import React from "react";
import { useUITheme } from "../../context/UIContext";
import { Theme } from "../../types/theme.type";
import { Select } from "../../components/Select";
import { OptionProps } from "../../components/Select/props.interface";
import { ThemeSwitcherProps } from "./props.interface";

function ThemeSwitcher({
  placeholder = "Select theme",
  searchPlaceholder = "Search",
  maxHeight = 200,
  searchNotFoundTitle = "Not found",
  searchNotFoundDescription = "Try changing your request!",
  styleSelect = { width: "250px" },
}: ThemeSwitcherProps) {
  const { theme, setTheme, themes } = useUITheme();
  const options: OptionProps[] = [];
  for (const [key, value] of Object.entries(themes)) {
    options.push({
      id: key,
      label: value.name,
      icon: value.icon,
    });
  }
  return (
    <Select
      options={options}
      value={theme}
      hiddenOutsideClick={true}
      onChange={(e) => {
        setTheme(e[0] as Theme);
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
      styleSelect={styleSelect}
    />
  );
};

export { ThemeSwitcher };