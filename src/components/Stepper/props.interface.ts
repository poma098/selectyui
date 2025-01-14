export interface PropsStepper {
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
  value: number;
  accuracy?: number;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
  className?: string;
  footer?: boolean;
  header?: string | React.ReactNode;
  unitPosition?: "left" | "right";
  disabled?: boolean;
  size?: StepperSize;
  bar?: boolean;
  barStyle?: React.CSSProperties;
  barClassName?: string;
  formatter?: (value: number) => string;
  enableScalingWithAltShift?: boolean;
  description?: string | React.ReactNode | ((value: number, unit?: string) => string | React.ReactNode);
  radius?: number;
}

export type StepperSize = "xs" | "s" | "m" | "l";