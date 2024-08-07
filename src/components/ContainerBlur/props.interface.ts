import { HexColor } from "utils/color/props.interface";

export interface ContainerBlurProps {
  children?: React.ReactNode;
  paddingY?: number;
  paddingX?: number;
  className?: string;
  style?: React.CSSProperties;
  styleContent?: React.CSSProperties;
  color?: HexColor;
}