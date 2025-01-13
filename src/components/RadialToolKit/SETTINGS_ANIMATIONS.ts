import { RadialToolKitAnimation, RadialToolKitAnimations } from "./props.interface";

type RadialToolKitAnimationsTypes = Record<RadialToolKitAnimation, [number, number]>

const SETTINGS_ANIMATIONS: RadialToolKitAnimations = {
  radialToolKit: {
    duration: {
      slow: 200,
      medium: 110,
      fast: 50,
      none: 40,
    },
  },
  circle: {
    visibleSection: {
      slow: 1300,
      medium: 800,
      fast: 600,
      none: 400,
    },
    boxShadow: {
      delay: {
        slow: 0.75,
        medium: 0.5,
        fast: 0.3,
        none: 0,
      },
      duration: {
        slow: 0.5,
        medium: 0.4,
        fast: 0.3,
        none: 0,
      },
    },
    circle: {
      delay: {
        slow: 0.2,
        medium: 0.1,
        fast: 0,
        none: 0,
      },
      duration: {
        slow: 0.5,
        medium: 0.4,
        fast: 0.3,
        none: 0,
      },
    },
    overlay: {
      delay: {
        slow: 0.7,
        medium: 0.5,
        fast: 0.3,
        none: 0,
      },
      duration: {
        slow: 1.2,
        medium: 0.7,
        fast: 0.4,
        none: 0,
      },
    },
    icon: {
      duration: {
        slow: 0.6,
        medium: 0.4,
        fast: 0.2,
        none: 0,
      },
    },
  },
  item: {
    container: {
      delay: (animation, index) => {
        const values: RadialToolKitAnimationsTypes = {
          slow: [0.15, 1.2],
          medium: [0.1, 0.85],
          fast: [0.05, 0.5],
          none: [0, 0],
        };

        return values[animation][0] * (index + values[animation][1]);
      },
      duration: {
        slow: undefined,
        medium: undefined,
        fast: undefined,
        none: 0,
      },
    },
    icon: {
      delay: (animation, index) => {
        const values: RadialToolKitAnimationsTypes = {
          slow: [0.15, 1.3],
          medium: [0.1, 0.85],
          fast: [0.05, 0.5],
          none: [0, 0],
        };

        return values[animation][0] * (index + values[animation][1]);
      },
      duration: {
        slow: undefined,
        medium: undefined,
        fast: undefined,
        none: 0,
      },
      color: {
        duration: {
          slow: undefined,
          medium: undefined,
          fast: undefined,
          none: 0,
        },
        delay: {
          slow: 0,
          medium: 0,
          fast: 0,
          none: 0,
        },
      },
      borderColor: {
        duration: {
          slow: undefined,
          medium: undefined,
          fast: undefined,
          none: 0,
        },
        delay: {
          slow: 0,
          medium: 0,
          fast: 0,
          none: 0,
        },
      },
      backgroundColor: {
        duration: {
          slow: undefined,
          medium: undefined,
          fast: undefined,
          none: 0,
        },
        delay: {
          slow: 0,
          medium: 0,
          fast: 0,
          none: 0,
        },
      },
    },
    label: {
      duration: {
        slow: undefined,
        medium: undefined,
        fast: undefined,
        none: 0,
      },
      delay: (animation, index) => {
        const values: RadialToolKitAnimationsTypes = {
          slow: [0.15, 1.3],
          medium: [0.1, 0.85],
          fast: [0.05, 0.5],
          none: [0, 0],
        };

        return values[animation][0] * (index + values[animation][1]);
      },
      color: {
        delay: {
          slow: 0,
          medium: 0,
          fast: 0,
          none: 0,
        },
        duration: {
          slow: undefined,
          medium: undefined,
          fast: undefined,
          none: 0,
        },
      },
      backgroundColor: {
        delay: {
          slow: 0,
          medium: 0,
          fast: 0,
          none: 0,
        },
        duration: {
          slow: undefined,
          medium: undefined,
          fast: undefined,
          none: 0,
        },
      },
    },
    button: {
      duration: {
        slow: undefined,
        medium: undefined,
        fast: undefined,
        none: 0,
      }
    },
  },
};

export default SETTINGS_ANIMATIONS;