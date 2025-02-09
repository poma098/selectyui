import { CSSProperties } from "react";
import { HexColor, HslaColor, HslColor } from "utils/color/props.interface";


type SetStateAction<S> = S | ((prevState: S) => S);

export interface OnChange<S> {
  (action: SetStateAction<S>): void;
}

export interface ColorSaturationAndLightnessPickerProps {
  hsla: HslaColor; // Цвет в формате HEX
  onChange?: (color: HslaColor) => void;
  width?: number; // Ширина холста
  height: number; // Высота холста
  radius?: number;
  pointInnerSize?: number;
  pointOuterSize?: number;
  pointOuterColor?: HexColor;
  pointRadius?: number;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

export interface HandlePointProps {
  x: number;
  y: number;
  color: string;
  innerSize?: number;
  outerSize: number;
  outerColor?: HexColor;
  radius?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  tabIndex?: number;
}

export interface GradientCanvasProps {
  hue: number;
  width: number;
  height: number;
  radius?: number;
}

export interface ColorGradientBarProps {
  width?: number; // ширина холста
  height?: number; // высота холста
  radius?: number; // радиус закругления углов
  colors?: HexColor[] | HslColor[]; // массив цветов для градиента
  direction?: "horizontal" | "vertical" | "diagonal-down" | "diagonal-up";
}

export interface ColorStop {
  color: HslaColor; // Цвет в формате HEX или HSL
  position: number; // Позиция от 0 до 1
}



export interface OpacityGradientBarProps {
  width?: number; // ширина холста (логическая)
  height?: number; // высота холста (логическая)
  radius?: number; // радиус закругления углов
  colors: ColorStop[]; // массив объектов с цветами и позициями
  gridSize?: number; // размер квадратиков сетки
  gridColor?: string; // цвет серых квадратиков сетки
  rotation?: number; // угол поворота (в градусах)
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface GradientPickerProps {
  colors: ColorStop[];
  onChange?: (
    color: ColorStop[] | ((prevColor: ColorStop[]) => ColorStop[])
  ) => void;
  width: number; // ширина холста (логическая)
  height?: number; // высота холста (логическая)
  type?: GradientType;
  rotate?: number;
  setRotate?: (rotate: number) => void;
  selectedIndex?: number;
  setSelectedIndex?: (index: number | undefined) => void;
  canceledOnBlurContainer?: React.RefObject<HTMLElement>[];
  disabled?: boolean;
  modeAlpha?: boolean;
}

export type GradientType =
  | "linear"
  | "radial"
  | "repeating-linear"
  | "repeating-radial";

export type RadialGradientShape = "circle" | "ellipse";
export type RadialGradientSize =
  | "closest-side"
  | "closest-corner"
  | "farthest-side"
  | "farthest-corner";

export interface PointGradientProps {
  width: number;
  index: number;
  color: ColorStop;
  focusedIndex?: number;
  draggingIndex: number | null;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  style?: React.CSSProperties;
}

export interface ColorHueRotatePickerProps {
  width?: number; // ширина холста (логическая)
  height?: number; // высота холста (логическая)
  hsla: HslaColor;
  onChange?: (color: HslaColor) => void;
  style?: React.CSSProperties;
  className?: string;
  radius?: number;
  pointInnerSize?: number;
  pointOuterSize?: number;
  pointOuterColor?: HexColor;
  pointRadius?: number;
  direction?: "horizontal" | "vertical";
  disabled?: boolean;
}

export interface ColorOpacityPickerProps {
  width?: number;
  height?: number;
  hsla: HslaColor;
  direction?: "horizontal" | "vertical";
  onChange?: (newHexColor: HslaColor) => void;
  radius?: number;
  pointInnerSize?: number;
  pointOuterSize?: number;
  pointOuterColor?: HexColor;
  pointRadius?: number;
  style?: CSSProperties;
  gridSize?: number;
  className?: string;
  disabled?: boolean;
}


export interface ColorPreviewProps {
  hsla: HslaColor;
  radius?: number;
  width?: number;
  height?: number;
  gridSize?: number;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  modeCopy?: boolean;
  modeAlpha?: boolean;
}

export interface ColorPickerAreaProps {
  color: HslaColor;
  onChange?: (color: HslaColor | ((prevColor: HslaColor) => HslaColor)) => void;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  modeCopy?: boolean;
  modeAlpha?: boolean;
  disabled?: boolean;
}

export interface ColorEyeDropperProps {
  onChange?: (color: HexColor) => void;
  style?: React.CSSProperties;
  className?: string;
  icon?: React.ReactNode;
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  radius?: React.CSSProperties["borderRadius"];
  size?: React.CSSProperties["fontSize"];
  disabled?: boolean;
}