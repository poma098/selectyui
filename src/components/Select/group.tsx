import Style from "./style.module.css"
import SelectItem from "./item";
import { OptionGroupPropsWithChecked, OptionProps } from "./props.interface";
import { hasIconInOptions } from ".";

function SelectGroup({
  options,
  groupLabel,
  icon,
  checked,
  hasIcon = true,
  onChange,
  limit = 1,
  autoClose = true,
  setVisible = () => {},
  formatText = "trim",
  speedScrolling = 2000
}: OptionGroupPropsWithChecked) {
  return (
    <div className={Style.group}>
      <div className={Style.titleGroup}>
        {hasIcon && <div className={Style.titleGroupIcon}>{icon}</div>}
        <div className={Style.titleGroupTitle}>{groupLabel}</div>
      </div>
      <div className={Style.items}>
        {options.map((option, index) => {
          const HasIconInOptions = hasIconInOptions(options as OptionProps[]);
          return (
            <SelectItem
              key={index}
              {...option}
              checked={checked}
              hasIcon={HasIconInOptions}
              onChange={onChange}
              limit={limit}
              autoClose={autoClose}
              setVisible={setVisible}
              formatText={formatText}
              speedScrolling={speedScrolling}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectGroup;