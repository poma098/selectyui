import Style from "./style.module.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useMemo, useRef, useState } from "react";
import { definitionCoords } from "utils/definitionCoords";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  SelectProps,
  OptionProps,
  OptionGroupProps,
  Checked,
} from "./props.interface";
import SelectGroup from "./group";
import SelectOption from "./item";
import extractTextFromReactElement from "utils/extractTextFromReactElement";
import ScrollingText from "../../components/ScrollingText";

const itemVariants: Variants = {
  initial: ([x, y]: [number, number]) => ({
    opacity: 0,
    top: y - 10,
    left: x,
    y: 10,
    pointerEvents: "none",
    transition: {
      type: "spring",
      ease: "easeInOut",
      top: {
        duration: 0,
      },
      left: {
        duration: 0,
      },
      damping: 22,
      stiffness: 400,
    },
  }),
  animate: ([x, y]: [number, number]) => ({
    opacity: 1,
    top: y,
    left: x,
    y: 0,
    pointerEvents: "auto",
    transition: {
      type: "spring",
      ease: "easeInOut",
      top: {
        duration: 0,
      },
      left: {
        duration: 0,
      },
      damping: 22,
      stiffness: 400,
    },
  }),
  exit: ([x, y]: [number, number]) => ({
    opacity: 0,
    top: y + 10,
    left: x,
    pointerEvents: "none",
    transition: {
      type: "spring",
      ease: "easeInOut",
      left: {
        duration: 0,
      },
      top: {
        delay: 0.1,
      },
      opacity: {
        delay: 0.1,
      },
      damping: 18,
      stiffness: 180,
    },
  }),
};

function getCheckedOptions(
  options: OptionProps[] | OptionGroupProps[],
  value?: Checked[] | Checked
): OptionProps[] {
  const type = getTypeOptions(options);
  if (value) {
    const flatOptions: OptionProps[] = [];
    if (type === "group") {
      for (const option of options) {
        if ((option as OptionGroupProps).options) {
          const groupOptions = getCheckedOptions(
            (option as OptionGroupProps).options,
            value
          );
          if (groupOptions.length > 0) {
            flatOptions.push(...groupOptions);
          }
        }
      }
    } else {
      if (Array.isArray(value) && (options as OptionProps[]).length > 0) {
        for (const option of options as OptionProps[]) {
          if (value.includes(option.id)) {
            flatOptions.push(option);
          }
        }
      } else {
        for (const option of options as OptionProps[]) {
          if (value === option.id) {
            flatOptions.push(option);
          }
        }
      }
    }

    return flatOptions;
  }

  return [];
}

function getIdOptions(options: OptionProps[]): Checked[] {
  const flatOptions: Checked[] = [];
  for (const option of options) {
    flatOptions.push(option.id);
  }

  return flatOptions;
}

/**
 * Определяет есть ли хотя бы 1 иконка в группах
 * @param options Группа опции
 */
export function hasIconInGroup(options: OptionGroupProps[]): boolean {
  for (const option of options) {
    if (option.icon) {
      return true;
    }
  }

  return false;
}

/**
 * Определяет есть ли хотя бы 1 иконка в опциях
 * @param options Группа опции
 */
export function hasIconInOptions(options: OptionProps[]): boolean {
  for (const option of options) {
    if (option.icon) {
      return true;
    }
  }

  return false;
}

function getTypeOptions(
  options: OptionProps[] | OptionGroupProps[]
): "group" | "item" {
  if (options.length > 0) {
    if ((options[0] as OptionGroupProps).options) {
      return "group";
    }
  }

  return "item";
}

function Select({
  options,
  value,
  hiddenOutsideClick = true,
  onChange = () => {},
  placeholder = "Select options",
  limit = 1,
  search = false,
  searchPlaceholder = "Search",
  autoClose = true,
  maxHeight,
  styleList,
  styleSelect,
  searchNotFoundTitle = "Not found",
  searchNotFoundDescription = "Try changing your request!",
  disabled,
  formatText = "trim",
  speedScrolling = 2000,
  visibleReset = true,
}: SelectProps) {
  const [visible, setVisible] = useState(false);
  const [_x, _setX] = useState(0);
  const [_y, _setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<
    OptionProps[] | OptionGroupProps[]
  >(options);
  const [widthContent, setWidthContent] = useState<string>("100%");

  const [scrollTop, setScrollTop] = useState(0);

  const refContainer = useRef(null);
  const refList = useRef(null);
  const refClose = useRef(null);
  const refClear = useRef(null);
  const refBtns = useRef(null);
  const refCount = useRef(null);

  const [checked, setChecked] = useState(
    useMemo(() => getCheckedOptions(options, value), [options, value])
  );

  useEffect(() => {
    if (searchValue.length > 0) {
      const searchValueLowerCase = searchValue.toLowerCase();
      const opts: OptionProps[] | OptionGroupProps[] = [];
      options.map((option: OptionProps | OptionGroupProps) => {
        if ((option as OptionGroupProps).groupLabel) {
          const group: OptionGroupProps = { ...(option as OptionGroupProps) };

          let groupLabel: string = "";
          if (typeof group.groupLabel === "string") {
            groupLabel = group.groupLabel.toLowerCase();
          } else {
            groupLabel = extractTextFromReactElement(
              group.groupLabel
            ).toLowerCase();
          }

          if ((groupLabel as string).includes(searchValueLowerCase)) {
            opts.push(group as any);
          } else {
            group.options = [];
            (option as OptionGroupProps).options.map((item: OptionProps) => {

              if (item.hidden) return;

              let description = item.description;
              let label = item.label;
              let keywords = (item.keywords?.join(" ") || "").toLowerCase();

              if (typeof label === "string") {
                label = label.toLowerCase();
              } else {
                label = extractTextFromReactElement(label).toLowerCase();
              }

              if (typeof description === "string") {
                description = description.toLowerCase();
              } else {
                description =
                  extractTextFromReactElement(description).toLowerCase();
              }

              if (
                (label as string).includes(searchValueLowerCase) ||
                (description as string).includes(searchValueLowerCase) ||
                (keywords as string).includes(searchValueLowerCase)
              ) {
                group.options.push(item);
              }
            });

            if (group.options.length > 0) {
              opts.push(group as any);
            }
          }
        } else {
          if ((option as OptionProps).hidden) return;
          let description = (option as OptionProps).description;
          let label = (option as OptionProps).label;
          let keywords = ((option as OptionProps).keywords?.join(" ") || "").toLowerCase();

          if (typeof label === "string") {
            label = label.toLowerCase();
          } else {
            label = extractTextFromReactElement(label).toLowerCase();
          }

          if (typeof description === "string") {
            description = description.toLowerCase();
          } else {
            description =
              extractTextFromReactElement(description).toLowerCase();
          }

          if (
            (label as string).includes(searchValueLowerCase) ||
            (description as string).includes(searchValueLowerCase) ||
            (keywords as string).includes(searchValueLowerCase)
          ) {
            opts.push(option as any);
          }
        }
      });

      setFilteredOptions(opts);
    } else {
      setFilteredOptions(options);
    }
  }, [searchValue, options]);

  useEffect(() => {
    setChecked(getCheckedOptions(options, value));
  }, [options, value]);

  const handleClickClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setChecked([]);
    onChange([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refList.current &&
        refClose.current &&
        refContainer.current &&
        !(refList.current as HTMLElement).contains(event.target as Node) &&
        !(refClose.current as HTMLElement).contains(event.target as Node) &&
        !(refContainer.current as HTMLElement).contains(event.target as Node)
      ) {
        if (hiddenOutsideClick && setVisible) {
          setVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hiddenOutsideClick]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (disabled) return;
    setVisible(!visible);
  };

  useEffect(() => {
    if (visible && refList.current && refContainer.current) {
      const { x, y, widthParent } = definitionCoords(
        refList.current,
        refContainer.current,
        "bottomOrTopLeft"
      );

      _setX(x);
      _setY(y);
      setWidth(widthParent);
    }
  }, [visible]);

  useEffect(() => {
    if (refList && refList.current) {
      if (visible) {
        (refList.current as HTMLElement).scrollTop = scrollTop;
      } else {
        setScrollTop((refList.current as HTMLElement).scrollTop);
      }
    }
    
  }, [visible]);

  useEffect(() => {
    let widthBtns = 0;
    let widthCount = 0;

    if (refBtns && refBtns.current) {
      widthBtns = (refBtns.current as HTMLElement).offsetWidth;
    }

    if (refCount && refCount.current) {
      widthCount = (refCount.current as HTMLElement).offsetWidth;
    }

    setWidthContent(`calc(100% - ${widthBtns + widthCount + 6}px)`);
  }, [
    value,
    refBtns.current,
    refCount.current,
    refClear.current,
    checked.length > 0,
  ]);

  const HasIconInGroup = hasIconInGroup(filteredOptions as OptionGroupProps[]);
  const HasIconInOptions = hasIconInOptions(filteredOptions as OptionProps[]);

  return (
    <>
      <div
        className={Style.container}
        style={{ ...styleSelect }}
        onClick={handleClick}
        ref={refContainer}
        data-disabled={disabled}
      >
        {checked.length > 0 && (
          <>
            <div className={Style.content} style={{ width: widthContent }}>
              {checked[0].icon && (
                <div className={Style.icon}>{checked[0].icon}</div>
              )}
              <div className={Style.text}>
                <div className={Style.title}>
                  {typeof checked[0].label === "string" &&
                    formatText === "scrolling" && (
                      <ScrollingText
                        text={checked[0].label}
                        speed={speedScrolling}
                        gap={30}
                        direction="ltr"
                      />
                    )}

                  {typeof checked[0].label === "string" &&
                    formatText === "trim" && (
                      <span className={Style.titleTrim}>
                        {checked[0].label}
                      </span>
                    )}

                  {typeof checked[0].label === "string" &&
                    formatText === "none" &&
                    checked[0].label}

                  {typeof checked[0].label !== "string" && checked[0].label}
                </div>
                {checked[0].description && (
                  <div className={Style.description}>
                    {typeof checked[0].description === "string" &&
                      formatText === "scrolling" && (
                        <ScrollingText
                          text={checked[0].description}
                          speed={speedScrolling}
                          gap={30}
                          direction="ltr"
                        />
                      )}
                    {typeof checked[0].description === "string" &&
                      formatText === "trim" && (
                        <span className={Style.descriptionTrim}>
                          {checked[0].description}
                        </span>
                      )}

                    {typeof checked[0].description === "string" &&
                      formatText === "none" &&
                      checked[0].description}

                    {typeof checked[0].description !== "string" &&
                      checked[0].description}
                  </div>
                )}
              </div>
            </div>
            {checked.length > 1 && (
              <div className={Style.count} ref={refCount}>
                Еще: {checked.length - 1 > 99 ? "99+" : checked.length - 1}
              </div>
            )}
          </>
        )}
        {checked.length === 0 && (
          <div className={Style.placeholder}>
            <div className={Style.placeholderIcon}>
              <IoSearch />
            </div>
            <div className={Style.placeholderText}>{placeholder}</div>
          </div>
        )}
        {!disabled && (
          <div className={Style.btns} ref={refBtns}>
            {checked.length > 0 && visibleReset && (
              <button
                className={Style.close}
                ref={refClear}
                onClick={handleClickClear}
              >
                <IoClose />
              </button>
            )}
            <motion.button
              className={Style.arrow}
              onClick={handleClick}
              animate={{ rotate: visible ? 180 : 0 }}
              transition={{ delay: 0.1 }}
              ref={refClose}
            >
              <IoIosArrowDown />
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            custom={[_x, _y]}
            variants={itemVariants}
            className={Style.list}
            ref={refList}
            style={{ width: width, maxHeight, ...styleList }}
          >
            {search && (
              <div className={Style.search}>
                <div className={Style.searchIcon}>
                  <IoSearch />
                </div>
                <input
                  className={Style.searchInput}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchPlaceholder}
                />
                {searchValue.length > 0 && <button
                  className={Style.close}
                  onClick={() => setSearchValue("")}
                >
                  <IoClose />
                </button>}
              </div>
            )}
            {filteredOptions.length > 0 &&
              filteredOptions.map(
                (item: OptionProps | OptionGroupProps, index: number) => {
                  if ("groupLabel" in item) {
                    return (
                      <SelectGroup
                        key={index}
                        {...item}
                        checked={value}
                        hasIcon={HasIconInGroup}
                        onChange={onChange}
                        limit={limit}
                        autoClose={autoClose}
                        setVisible={setVisible}
                        formatText={formatText}
                        speedScrolling={speedScrolling}
                      />
                    );
                  } else {
                    return (
                      <SelectOption
                        key={index}
                        {...item}
                        checked={value}
                        hasIcon={HasIconInOptions}
                        onChange={onChange}
                        limit={limit}
                        autoClose={autoClose}
                        setVisible={setVisible}
                        formatText={formatText}
                        speedScrolling={speedScrolling}
                      />
                    );
                  }
                }
              )}
            {filteredOptions.length === 0 && (
              <div className={Style.noResults}>
                <div className={Style.noResultsIcon}>
                  <IoSearch />
                </div>
                <div className={Style.noResultsText}>
                  <div className={Style.noResultsTitle}>
                    {searchNotFoundTitle}
                  </div>
                  <div className={Style.noResultsDescription}>
                    {searchNotFoundDescription}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Select;
