export interface SelectProps {
  options: OptionProps[] | OptionGroupProps[];
  value?: Checked[] | Checked;
  hiddenOutsideClick?: boolean;
  onChange?: (items: Checked[]) => void;
  placeholder?: string;
  limit?: number;
  search?: boolean;
  searchPlaceholder?: string;
  autoClose?: boolean;
  maxHeight?: number;
  styleList?: React.CSSProperties;
  styleSelect?: React.CSSProperties;
  searchNotFoundTitle?: string;
  searchNotFoundDescription?: string;
  disabled?: boolean;
  formatText?: SelectFormatText;
  speedScrolling?: number;
  visibleReset?: boolean;
}

export type SelectFormatText = "none" | "trim" | "scrolling";

export type Checked = string | number;

export interface OptionProps {
  id: string | number;
  icon?: React.ReactNode | string;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  keywords?: string[];
}

export interface OptionGroupProps {
  groupLabel: string | React.ReactNode;
  icon?: React.ReactNode | string;
  options: OptionProps[];
}

export interface OptionGroupPropsWithChecked extends OptionGroupProps {
  checked?: Checked[] | Checked;
  hasIcon?: boolean;
  onChange: (value: Checked[]) => void;
  limit?: number;
  autoClose?: boolean;
  setVisible: (value: boolean) => void;
  formatText?: SelectFormatText;
  speedScrolling?: number;
}

export interface OptionPropsWithChecked extends OptionProps {
  checked?: Checked[] | Checked;
  hasIcon?: boolean;
  onChange: (value: Checked[]) => void;
  limit?: number;
  autoClose?: boolean;
  setVisible: (value: boolean) => void;
  formatText?: SelectFormatText;
  speedScrolling?: number;
}