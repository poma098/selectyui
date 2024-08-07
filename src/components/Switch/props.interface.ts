import { TooltipPropsBase } from "@components/Tooltip/props.interface";
import { HexColor } from "utils/color/props.interface";

export interface SwitchProps {
  className?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string | React.ReactNode;
  size?: SwitchSize;
  sticker?: boolean;
  disabled?: boolean;
  loading?: boolean;

  checkedIcon?: string | React.ReactNode;
  uncheckedIcon?: string | React.ReactNode;
  checkedColor?: HexColor;
  uncheckedColor?: HexColor;

  checkedIconColor?: HexColor;
  uncheckedIconColor?: HexColor;
  checkedIconOpacity?: number;
  uncheckedIconOpacity?: number;

  inverted?: boolean;
  tooltip?: boolean;
  tooltipProps?: TooltipSwitchProps;
  tabIndex?: number;
}

type TooltipNewBaseProps = Omit<TooltipPropsBase, "observeElement">;

interface TooltipNewPropsTitle extends TooltipNewBaseProps {
  icon?: React.ReactNode | string;
  title: React.ReactNode | string;
  body?: React.ReactNode | string;
  children?: never;
}

interface TooltipNewPropsBody extends TooltipNewBaseProps {
  icon?: React.ReactNode | string;
  title?: React.ReactNode | string;
  body: React.ReactNode | string;
  children?: never;
}

interface TooltipNewPropsChildren extends TooltipNewBaseProps {
  icon?: never;
  title?: never;
  body?: never;
  children: React.ReactNode | string;
}

export type TooltipSwitchProps =
  | TooltipNewPropsTitle
  | TooltipNewPropsBody
  | TooltipNewPropsChildren;

export type SwitchSize = "xsmall" | "small" | "medium" | "large" | "xlarge";