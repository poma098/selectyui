export interface CodeProps {
  code: string;
  title?: string;
  language?: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
  showLineNumbers?: boolean;
  isLiveVisible?: boolean;
  editable?: boolean;
}