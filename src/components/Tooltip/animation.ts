import { Variants } from "framer-motion";
import { DropDownMenuPosition } from "../../types/definitionCoords.interface";

function getDirection(direction: DropDownMenuPosition, k: number): {
  x: number;
  y: number;
} {
  switch (direction) {
    case "center-top": {
      return {
        x: 0,
        y: k,
      };
    }
    case "right-center": {
      return {
        x: -k,
        y: 0,
      };
    }
    case "right-top": {
      return {
        x: -k,
        y: 0,
      };
    }
    case "right-bottom": {
      return {
        x: -k,
        y: 0,
      };
    }
    case "left-center": {
      return {
        x: k,
        y: 0,
      };
    }
    case "left-top": {
      return {
        x: k,
        y: 0,
      };
    }
    case "left-bottom": {
      return {
        x: k,
        y: 0,
      };
    }
    default: {
      return {
        x: 0,
        y: 0,
      };
    }
  }
}

export const Variant: Variants = {
  initial: ([x, y, direction]: [number, number, DropDownMenuPosition]) => {
    const { x: _x, y: _y } = getDirection(direction, 10);
    return {
      opacity: 0,
      top: y,
      left: x,
      y: _y,
      x: _x,
      pointerEvents: "none",
      transition: {
        type: "spring",
        ease: "easeInOut",
        top: {
          duration: 0,
        },
        left: {
          duration: 0,
        },
        damping: 22,
        stiffness: 400,
      },
    };
  },
  animate: ([x, y, direction]: [number, number, DropDownMenuPosition]) => {
    const { x: _x, y: _y } = getDirection(direction, 0);
    return {
      opacity: 1,
      top: y,
      left: x,
      y: 0,
      x: 0,
      pointerEvents: "auto",
      transition: {
        type: "spring",
        ease: "easeInOut",
        top: {
          duration: 0,
        },
        left: {
          duration: 0,
        },
        damping: 22,
        stiffness: 400,
      },
    };
  },
  exit: ([x, y, direction]: [number, number, DropDownMenuPosition]) => {
    const { x: _x, y: _y } = getDirection(direction, 0);
    return {
      opacity: 0,
      top: y,
      left: x,
      y: _y,
      x: _x,
      pointerEvents: "none",
      transition: {
        type: "spring",
        ease: "easeInOut",
        pointerEvents: {
          delay: 0.25,
        },
        left: {
          duration: 0,
        },
        top: {
          delay: 0.25,
        },
        opacity: {
          delay: 0.25,
        },
        damping: 18,
        stiffness: 180,
      },
    };
  },
};
