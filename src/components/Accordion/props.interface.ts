export interface AccordionListProps {
  list: AccordionItem[];
  className?: string;
  format?: AccordionFormat;
  style?: React.CSSProperties;
  type?: AccordionType; 
}

export interface AccordionItem {
  title: React.ReactNode | string;
  content: React.ReactNode;
  icon?: React.ReactNode | string;
  marker?: React.ReactNode | string;
  visible?: boolean;
}

export type AccordionFormat = "list" | "marker" | "icon" | undefined;

export type AccordionType = "single" | "multiple" | undefined;