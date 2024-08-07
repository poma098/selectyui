export interface ScrollingTextProps {
  text: string;
  width?: string;
  height?: string;
  gap?: number;
  speed: number; // скорость в символах в минуту
  direction?: "ltr" | "rtl"; // направление текста
  style?: React.CSSProperties;
  className?: string;
  autoDetect?: boolean;
}
