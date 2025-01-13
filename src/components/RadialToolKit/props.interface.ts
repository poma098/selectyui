import { HexColor } from "utils";

export interface PropsRadialToolKit {
  circleOuterSize?: number;
  circleInnerSize?: number;
  circleVisibleIcon?: boolean;
  circleOuterColor?: HexColor;
  boxShadow?: boolean;
  borderWidth?: number;
  color?: HexColor;
  style?: React.CSSProperties;
  className?: string;
  items: RadialToolKitItem[];
  limit?: number;
  visibleIcons?: boolean;
  animation?: RadialToolKitAnimation;
  onClick?: (item: RadialToolKitItem) => boolean | void;
  onClickMore?: (items: RadialToolKitItem[]) => boolean | void;
  magnetization?: boolean;
}

export interface PropsCircleRadialToolKit {
  outerSize?: number;
  innerSize?: number;
  circleVisibleIcon?: boolean;
  outerColor?: HexColor;
  rotationAngle?: number;
  triangleAngle?: number;
  animationDuration?: number;
  boxShadow?: boolean;
  colors?: HexColor[];
  borderWidth?: number;
  style?: React.CSSProperties;
  className?: string;
  visibleIcons?: boolean;
  activeItem?: RadialToolKitItem;
  activeIndex?: number;
  animation?: RadialToolKitAnimation;
  magnetization?: boolean;
}

export interface PropsItemsRadialToolKit {
  size: number;
  items: RadialToolKitItem[];
  limit: number;
  visibleIcons?: boolean;
  rotationAngle?: number;
  triangleAngle?: number;
  setActiveIndex?: (index: number) => void;
  color?: HexColor;
  boxShadow?: boolean;
  animation?: RadialToolKitAnimation;
  selectedIndex?: number;
}

export interface PropsItemRadialToolKit {
  size: number;
  index: number;
  item: RadialToolKitItem;
  length: number;
  visibleIcon?: boolean;
  rotationAngle?: number;
  triangleAngle?: number;
  setActiveIndex?: (index: number) => void;
  color?: HexColor;
  boxShadow?: boolean;
  animation?: RadialToolKitAnimation;
  selectedIndex?: number;
}

export interface PropsItemMoreRadialToolKit {
  size: number;
  index: number;
  items: RadialToolKitItem[];
  length: number;
  label?: string;
  icon?: string | JSX.Element;
  visibleIcon?: boolean;
  rotationAngle?: number;
  triangleAngle?: number;
  setActiveIndex?: (index: number) => void;
  color?: HexColor;
  boxShadow?: boolean;
  animation?: RadialToolKitAnimation;
  selectedIndex?: number;
}

export type ItemPosition = "top" | "right" | "bottom" | "left";

export type RadialToolKitAnimation = "slow" | "medium" | "fast" | "none";

export interface RadialToolKitItem {
  icon?: JSX.Element | string;
  label: string;
  callback: (item: RadialToolKitItem, index: number, coordinates: any) => void;
  button?: string;
}

export interface RadialToolKitCoordinates {
  x: number;
  y: number;
  angle: number;
  position: ItemPosition;
}

export interface BoxShadowWrapperProps {
  animation: RadialToolKitAnimation;
  KShadow: number;
}

export interface InnerCircleProps {
  innerSize: PropsCircleRadialToolKit["innerSize"];
  outerSize: PropsCircleRadialToolKit["outerSize"];
  borderWidth: PropsCircleRadialToolKit["borderWidth"];
  color: HexColor;
  animation: RadialToolKitAnimation;
  circleVisibleIcon: boolean;
  activeItem?: RadialToolKitItem;
}

export interface CanvasRendererProps {
  outerSize: PropsCircleRadialToolKit["outerSize"];
  colors: HexColor[];
  rotationAngle: number;
  animationDuration: number;
  activeIndex: number;
  triangleAngle: number;
  magnetization: boolean;
  animation: RadialToolKitAnimation;
}

export interface RadialToolKitAnimations {
  radialToolKit: {
    duration: RadialToolKitAnimationsTypes;
  };
  circle: {
    visibleSection: RadialToolKitAnimationsTypes;
    boxShadow: {
      delay: RadialToolKitAnimationsTypes;
      duration: RadialToolKitAnimationsTypes;
    };
    circle: {
      delay: RadialToolKitAnimationsTypes;
      duration: RadialToolKitAnimationsTypes;
    };
    overlay: {
      delay: RadialToolKitAnimationsTypes;
      duration: RadialToolKitAnimationsTypes;
    };
    icon: {
      duration: RadialToolKitAnimationsTypes;
    };
  };
  item: {
    container: {
      delay: (animation: RadialToolKitAnimation, index: number) => number;
      duration: RadialToolKitAnimationsTypes;
    };
    icon: {
      delay: (animation: RadialToolKitAnimation, index: number) => number;
      duration: RadialToolKitAnimationsTypes;
      color: {
        duration: RadialToolKitAnimationsTypes;
        delay: RadialToolKitAnimationsTypes;
      };
      borderColor: {
        duration: RadialToolKitAnimationsTypes;
        delay: RadialToolKitAnimationsTypes;
      };
      backgroundColor: {
        duration: RadialToolKitAnimationsTypes;
        delay: RadialToolKitAnimationsTypes;
      };
    };
    label: {
      delay: (animation: RadialToolKitAnimation, index: number) => number;
      duration: RadialToolKitAnimationsTypes;
      color: {
        duration: RadialToolKitAnimationsTypes;
        delay: RadialToolKitAnimationsTypes;
      };
      backgroundColor: {
        duration: RadialToolKitAnimationsTypes;
        delay: RadialToolKitAnimationsTypes;
      };
    };
    button: {
      duration: RadialToolKitAnimationsTypes;
    }
  };
}

export type RadialToolKitAnimationsTypes = Record<RadialToolKitAnimation, number>;