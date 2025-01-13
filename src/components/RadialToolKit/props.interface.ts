import { HexColor } from "utils";

export interface PropsRadialToolKit {
  circleOuterSize?: number;
  circleInnerSize?: number;
  circleVisibleIcon?: boolean;
  circleOuterColor?: HexColor;
  boxShadow?: boolean;
  borderWidth?: number;
  color?: HexColor;
  style?: React.CSSProperties;
  className?: string;
  items: RadialToolKitItem[];
  limit?: number;
  visibleIcons?: boolean;
  animation?: RadialToolKitAnimation;
  onClick?: (item: RadialToolKitItem) => boolean | void;
  onClickMore?: (items: RadialToolKitItem[]) => boolean | void;
  magnetization?: boolean;
}

export interface PropsCircleRadialToolKit {
  outerSize?: number;
  innerSize?: number;
  circleVisibleIcon?: boolean;
  outerColor?: HexColor;
  rotationAngle?: number;
  triangleAngle?: number;
  animationDuration?: number;
  boxShadow?: boolean;
  colors?: HexColor[];
  borderWidth?: number;
  style?: React.CSSProperties;
  className?: string;
  visibleIcons?: boolean;
  activeItem?: RadialToolKitItem;
  activeIndex?: number;
  animation?: RadialToolKitAnimation;
  magnetization?: boolean;
}

export interface PropsItemsRadialToolKit {
  size: number;
  items: RadialToolKitItem[];
  limit: number;
  visibleIcons?: boolean;
  rotationAngle?: number;
  triangleAngle?: number;
  setActiveIndex?: (index: number) => void;
  color?: HexColor;
  boxShadow?: boolean;
  animation?: RadialToolKitAnimation;
  selectedIndex?: number;
}

export interface PropsItemRadialToolKit {
  size: number;
  index: number;
  item: RadialToolKitItem;
  length: number;
  visibleIcon?: boolean;
  rotationAngle?: number;
  triangleAngle?: number;
  setActiveIndex?: (index: number) => void;
  color?: HexColor;
  boxShadow?: boolean;
  animation?: RadialToolKitAnimation;
  selectedIndex?: number;
}

export interface PropsItemMoreRadialToolKit {
  size: number;
  index: number;
  items: RadialToolKitItem[];
  length: number;
  label?: string;
  icon?: string | JSX.Element;
  visibleIcon?: boolean;
  rotationAngle?: number;
  triangleAngle?: number;
  setActiveIndex?: (index: number) => void;
  color?: HexColor;
  boxShadow?: boolean;
  animation?: RadialToolKitAnimation;
  selectedIndex?: number;
}

export type ItemPosition = "top" | "right" | "bottom" | "left";

export type RadialToolKitAnimation = "slow" | "medium" | "fast" | "none";

export interface RadialToolKitItem {
  icon?: JSX.Element | string;
  label: string;
  callback: (item: RadialToolKitItem, index: number, coordinates: any) => void;
  button?: string;
}

export interface RadialToolKitCoordinates {
  x: number;
  y: number;
  angle: number;
  position: ItemPosition;
}