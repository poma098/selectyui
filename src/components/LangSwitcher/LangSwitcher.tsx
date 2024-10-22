import { useUILocale } from "../../context/UIContext";
import { Langs } from "../../types/langs.interface";
import { Select } from "../../components/Select";
import { OptionProps } from "../../components/Select/props.interface";
import { LangSwitcherProps } from "./props.interface";
import React from "react";

function LangSwitcher({
  placeholder = "Select language",
  searchPlaceholder = "Search",
  maxHeight = 200,
  searchNotFoundTitle = "Not found",
  searchNotFoundDescription = "Try changing your request!",
  styleSelect = { width: "250px" },
}: LangSwitcherProps) {
  const { localizationFiles, setLocalization, localization } = useUILocale();

  const options: OptionProps[] = [];
  for (const [key, value] of Object.entries(localizationFiles)) {
    options.push({
      id: key,
      label: value.description,
      icon: value.flag,
    });
  }

  return (
    <Select
      options={options}
      value={localization}
      hiddenOutsideClick={true}
      onChange={(e) => {
        setLocalization(e[0] as keyof Langs);
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

export { LangSwitcher };