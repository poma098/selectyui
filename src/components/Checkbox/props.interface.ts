import { TooltipPropsBase } from "@components/Tooltip/props.interface";

export interface CheckboxProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  size?: CheckboxSize;
  label?: string | React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
  checkedIcon?: string | React.ReactNode;
  uncheckedIcon?: string | React.ReactNode;
  checkedIconColor?: string;
  uncheckedIconColor?: string;
  checkedIconOpacity?: number;
  uncheckedIconOpacity?: number;
  tooltip?: boolean;
  tooltipProps?: TooltipCheckboxProps;
  className?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
}

export type CheckboxSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

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

export type TooltipCheckboxProps =
  | TooltipNewPropsTitle
  | TooltipNewPropsBody
  | TooltipNewPropsChildren;

export type SwitchSize = "xsmall" | "small" | "medium" | "large" | "xlarge";