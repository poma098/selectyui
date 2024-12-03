import { Variants } from "framer-motion";
import React from "react";
import { DefinitionCoords, DropDownMenuPosition } from "../../types/definitionCoords.interface";
import { ShortcutKey } from "../../types/shortcut.interface";

export interface DropDownMenuItemBase {
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

export interface DropDownMenuItemWithCallback extends DropDownMenuItemBase {
  callback: (item: DropDownMenuItem, index: number) => void;
  list?: never; // Не может существовать, если есть callback
  shortcutKey?: ShortcutKey;
}

export interface DropDownMenuItemWithList extends DropDownMenuItemBase {
  callback?: never; // Не может существовать, если есть list
  list: DropDownMenuItem[];
  shortcutKey?: never;
}

export interface DropDownMenuItemDevider {
  devider: boolean;
  list?: never;
  callback?: never;
  icon?: never;
  description?: never;
  label?: never;
  disabled?: never;
  hidden?: boolean;
  shortcutKey?: never;
}

export type DropDownMenuTrigger = "hover" | "click";

export type DropDownMenuItem =
  | DropDownMenuItemDevider
  | DropDownMenuItemWithCallback
  | DropDownMenuItemWithList;

type DropDownMenuPropsBase = {
  list: DropDownMenuItem[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
  hiddenOutsideClick?: boolean;
  hiddenHover?: boolean;
  openCallback?: (
    item: HTMLElement,
    parent: HTMLElement,
    event: React.MouseEvent | undefined
  ) => DefinitionCoords | void;
  openPosition?: DropDownMenuPosition;
  trigger?: DropDownMenuTrigger;
  formatText?: FormatText;
  speedScrolling?: number;
  style?: React.CSSProperties;
  className?: string;
  callbackClickItem?: (item: DropDownMenuItem, index: number) => void;
  debounceValue?: number;
};

export type FormatText = "none" | "trim" | "scrolling";

export type DropDownMenuPropsWithCoordinates = DropDownMenuPropsBase & {
  observeElement?: never;
  xStart: number;
  yStart: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type DropDownMenuPropsWithObserveElement = DropDownMenuPropsBase & {
  observeElement: React.RefObject<HTMLDivElement | HTMLButtonElement> | null;
  xStart?: never;
  yStart?: never;
  onMouseEnter?: never;
  onMouseLeave?: never;
};

export type DropDownMenuProps =
  | DropDownMenuPropsWithCoordinates
  | DropDownMenuPropsWithObserveElement;

export interface DropDownMenuPropsWithList extends DropDownMenuPropsBase {
  hiddenHover?: boolean;
  observeElement?: React.RefObject<HTMLDivElement> | null;
  list: DropDownMenuItem[];
  setVisibleList?: (visible: boolean) => void;
  visibleList?: boolean;
  callbackClickItem?: (item: DropDownMenuItem, index: number) => void;
}

export interface DropDownMenuContainerProps {
  list: DropDownMenuItem[];
  setVisible: (visible: boolean) => void;
  callbackClickItem?: (item: DropDownMenuItem, index: number) => void;
  formatText?: FormatText;
  speedScrolling?: number;
}

export interface DropDownMenuContainerItem {
  item: DropDownMenuItem;
  index: number;
  hasIcon: boolean;
  setVisible: (visible: boolean) => void;
  callbackClickItem?: (item: DropDownMenuItem, index: number) => void;
  formatText?: FormatText;
  speedScrolling?: number;
}
