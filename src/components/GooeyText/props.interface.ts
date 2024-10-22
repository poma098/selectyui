import { HexColor } from "utils";

export interface GooeyTextProps {
  children: React.ReactNode;
  backgroundColor?: HexColor;
  textColor?: HexColor;
  textAlign?: GooeyTextPosition;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  maxWidth?: number;
  paddingY?: string;
  paddingX?: string;
}

export type GooeyTextPosition = "left" | "right" | "center";