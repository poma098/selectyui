import {
  DropDownMenuItem,
  DropDownMenuProps,
} from "@components/DropDownMenu/props.interface";

export type DropDownMenuPropsNotList = Omit<
  DropDownMenuProps,
  | "list"
  | "visible"
  | "setVisible"
  | "hiddenOutsideClick"
  | "hiddenHover"
  | "openCallback"
  | "openPosition"
  | "trigger"
  | "callbackClickItem"
  | "observeElement"
  | "xStart"
  | "yStart"
  | "onMouseEnter"
  | "onMouseLeave"
>;

export interface MenuBarProps {
  items: MenuBarItem[];
  style?: React.CSSProperties;
  className?: string;
  trigger?: MenuBarTrigger;
  propsDropDownMenu?: DropDownMenuPropsNotList;
}

export type MenuBarTrigger = "hover" | "click";

export interface SizeBackgroundItem {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
}

interface MenuBarItemBase {
  icon?: string | React.ReactNode;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

export interface MenuBarItemWithList extends MenuBarItemBase {
  list: DropDownMenuItem[];
  callback?: never;
}

export interface MenuBarItemWithCallback extends MenuBarItemBase {
  list?: never;
  callback: (item: MenuBarItem, index: number) => void;
}

export type MenuBarItem = MenuBarItemWithList | MenuBarItemWithCallback;

export interface MenuBarItemProps {
  item: MenuBarItem;
  activeIndex: number | undefined;
  setActiveIndex: (index: number | undefined) => void;
  index: number;
  rectActiveItem?: DOMRect;
  setRectActiveItem?: (rect: DOMRect | undefined) => void;
  refContainer: React.RefObject<HTMLElement>;
  trigger: MenuBarTrigger;
  propsDropDownMenu?: DropDownMenuPropsNotList;
}