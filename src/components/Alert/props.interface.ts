import { ButtonProps } from "@components/Button/props.interface";
import { HexColor } from "utils/color/props.interface";

export interface AlertPropsBase {
  buttons?: ButtonProps[];
  style?: React.CSSProperties;
  className?: string;
  buttonPosition?: ButtonPosition;
  template?: AlertTemplate;
}

export interface AlertPropsWithChildren extends AlertPropsBase {
  children: React.ReactNode;
  icon?: never;
  title?: never;
  body?: never;
}


export interface AlertPropsWithTemplateTitle extends AlertPropsBase {
  icon?: string | React.ReactNode;
  title: string | React.ReactNode;
  body?: string | React.ReactNode;
  children?: never;
}

export interface AlertPropsWithTemplateBody extends AlertPropsBase {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  body: string | React.ReactNode;
  children?: never;
}


export interface AlertButtonsTemplates {
  btn1: {
    backgroundColor: HexColor | undefined;
    color: HexColor | "auto" | undefined;
    borderColor: HexColor | undefined;
  };
  btn2: {
    backgroundColor: HexColor | undefined;
    color: HexColor | "auto" | undefined;
    borderColor: HexColor | undefined;
  };
  icon: { color: HexColor | undefined };
  background: {
    backgroundColor: HexColor | undefined;
    color: HexColor | undefined;
    borderColor: HexColor | undefined;
  };
}

export type ButtonPosition = "center" | "left" | "right" | 'space-between' | 'space-around' | 'space-evenly';


export type AlertProps = AlertPropsWithChildren | AlertPropsWithTemplateTitle | AlertPropsWithTemplateBody

export type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

export type AlertTemplate = AlertTemplateSuccess | AlertTemplateError | AlertTemplateInfo | AlertTemplateWarning | "default";

export type AlertTemplateSuccess = "success" | "success-light" | "success-extra-light";

export type AlertTemplateError = "error" | "error-light" | "error-extra-light";

export type AlertTemplateInfo = "info" | "info-light" | "info-extra-light";

export type AlertTemplateWarning = "warning" | "warning-light" | "warning-extra-light";