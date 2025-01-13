import { HexColor } from "utils";

export interface RadialBlurProps {
  color?: HexColor;
  className?: string;
  style?: React.CSSProperties;
  blur?: 0 | 1 | 2 | 4 | 8 | 16 | 32 | 64;
}
