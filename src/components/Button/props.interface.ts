import { HexColor } from "utils/color/props.interface";

// Основные свойства кнопки
interface BaseButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  position?: ButtonPosition;
  size?: ButtonSize;
  backgroundColor?: HexColor;
  color?: HexColor | "auto";
  borderColor?: HexColor;
}

// Вариант с icon (без label и children)
interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode | string;
  label?: never;
  children?: never;
}

// Вариант с текстом (без icon и children)
interface LabelButtonProps extends BaseButtonProps {
  icon?: never;
  label: string | React.ReactNode;
  children?: never;
}

// Вариант с icon и label (без children)
interface IconLabelButtonProps extends BaseButtonProps {
  icon: React.ReactNode | string;
  label: React.ReactNode | string;
  children?: never;
}

// Вариант с дочерними элементами (без icon и label)
interface ChildrenButtonProps extends BaseButtonProps {
  icon?: never;
  label?: never;
  children: React.ReactNode;
}

// Объедините все возможные варианты в один тип
export type ButtonProps =
  | IconButtonProps
  | LabelButtonProps
  | IconLabelButtonProps
  | ChildrenButtonProps;

// Определения типов
export type ButtonType = "button" | "submit" | "reset";
export type ButtonPosition = "left" | "right" | "center";
export type ButtonSize = "small" | "medium" | "large";
