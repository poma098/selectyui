import { HexColor } from "utils/color/props.interface";

export interface ContainerBlurProps {
  children?: React.ReactNode;
  paddingY?: number;
  paddingX?: number;
  className?: string;
  style?: React.CSSProperties;
  styleContent?: React.CSSProperties;
  color?: HexColor;
  blur?: 0 | 1 | 2 | 4 | 8 | 16 | 32 | 64;
  rotate?: number;
}