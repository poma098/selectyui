import { TooltipProps, TooltipPropsBase } from "@components/Tooltip/props.interface";

export interface TooltipIconProps {
  tooltipProps: TooltipQuestionPropsProps;
  icon?: string | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

type TooltipNewBaseProps = Omit<TooltipPropsBase, "observeElement">;

interface TooltipNewPropsTitle extends TooltipNewBaseProps {
  icon?: React.ReactNode | string;
  title: React.ReactNode | string;
  body?: React.ReactNode | string;
  children?: never;
}

interface TooltipNewPropsBody extends TooltipNewBaseProps {
  icon?: React.ReactNode | string;
  title?: React.ReactNode | string;
  body: React.ReactNode | string;
  children?: never;
}

interface TooltipNewPropsChildren extends TooltipNewBaseProps {
  icon?: never;
  title?: never;
  body?: never;
  children: React.ReactNode | string;
} 

type TooltipQuestionPropsProps = TooltipNewPropsTitle | TooltipNewPropsBody | TooltipNewPropsChildren;

