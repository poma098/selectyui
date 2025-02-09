import { ButtonProps } from "../../components/Button/props.interface";
import { DropDownMenuPosition } from "../../types/definitionCoords.interface";
import { HexColor } from "utils/color/props.interface";

export interface TooltipPropsBase {
  observeElement: React.RefObject<
    HTMLElement | HTMLButtonElement | HTMLDivElement | null
  >;
  trigger?: TooltipTrigger;
  hiddenOutsideClick?: boolean;
  visible?: boolean;
  theme?: TooltipTheme;
  buttons?: ButtonProps[];
  style?: React.CSSProperties;
  className?: string;
  triangleColor?: HexColor;
  position?: DropDownMenuPosition;
  triangeVisible?: boolean;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  delay?: number;
  padding: React.CSSProperties["padding"];
}

export interface TooltipPropsTitle extends TooltipPropsBase {
  icon?: React.ReactNode | string;
  title: React.ReactNode | string;
  body?: React.ReactNode | string;
  children?: never;
} 

export interface TooltipPropsBody extends TooltipPropsBase {
  icon?: React.ReactNode | string;
  title?: React.ReactNode | string;
  body: React.ReactNode | string;
  children?: never;
} 

export interface TooltipPropsChildren extends TooltipPropsBase {
  icon?: never;
  title?: never;
  body?: never;
  children: React.ReactNode | string;
} 

export type TooltipProps = TooltipPropsTitle | TooltipPropsBody | TooltipPropsChildren

export type TooltipTrigger = "hover" | "click"

export type TooltipTheme = "light" | "dark" | "automatic";