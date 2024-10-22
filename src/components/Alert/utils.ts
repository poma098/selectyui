import {
  AlertButtonsTemplates,
  AlertTemplate,
  AlertButtonPosition,
  FlexJustifyContent,
} from "./props.interface";

export function alertPositionConvert(
  position: AlertButtonPosition
): FlexJustifyContent {
  switch (position) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    default:
      return position;
  }
}

export function alertGetColorForTemplate(
  template: AlertTemplate
): AlertButtonsTemplates {
  switch (template) {
    case "error":
      return {
        icon: {
          color: "#ffffff9c",
        },
        background: {
          backgroundColor: "#f8635c",
          color: "#fff",
          borderColor: "#f8635c",
        },
        btn1: {
          backgroundColor: "#f1473e",
          color: "#fff",
          borderColor: "#f1473e",
        },
        btn2: {
          backgroundColor: "#fff",
          color: "#f1473e",
          borderColor: "#fff",
        },
      };
    case "error-light":
      return {
        icon: {
          color: "#f8635c",
        },
        background: {
          backgroundColor: "#f8635c47",
          color: "#303036",
          borderColor: "#00000000",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#f8635c",
          borderColor: "#f8635c47",
        },
        btn2: {
          backgroundColor: "#f8635c",
          color: "#fff",
          borderColor: "#f8635c",
        },
      };
    case "error-extra-light":
      return {
        icon: {
          color: "#f8635c",
        },
        background: {
          backgroundColor: "#ffffff",
          color: "#303036",
          borderColor: "#7d7d7d24",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#f8635c",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#f8635c21",
          color: "#f8635c",
          borderColor: "#00000000",
        },
      };
    case "info":
      return {
        icon: {
          color: "#ffffff9c",
        },
        background: {
          backgroundColor: "#5190ff",
          color: "#fff",
          borderColor: "#5190ff",
        },
        btn1: {
          backgroundColor: "#3276fa",
          color: "#fff",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#fff",
          color: "#5190ff",
          borderColor: "#fff",
        },
      };
    case "info-light":
      return {
        icon: {
          color: "#5190ff",
        },
        background: {
          backgroundColor: "#5190ff1a",
          color: "#303036",
          borderColor: "#00000000",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#3276fa",
          borderColor: "#3276fa47",
        },
        btn2: {
          backgroundColor: "#3276fa",
          color: "#fff",
          borderColor: "#00000000",
        },
      };
    case "info-extra-light":
      return {
        icon: {
          color: "#3276fa",
        },
        background: {
          backgroundColor: "#ffffff",
          color: "#303036",
          borderColor: "#7d7d7d24",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#3276fa",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#3276fa21",
          color: "#3276fa",
          borderColor: "#00000000",
        },
      };
    case "success":
      return {
        icon: {
          color: "#ffffff9c",
        },
        background: {
          backgroundColor: "#65b168",
          color: "#fff",
          borderColor: "#65b168",
        },
        btn1: {
          backgroundColor: "#62a365",
          color: "#fff",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#fff",
          color: "#62a365",
          borderColor: "#fff",
        },
      };
    case "success-light":
      return {
        icon: {
          color: "#65b168",
        },
        background: {
          backgroundColor: "#65b1681a",
          color: "#303036",
          borderColor: "#00000000",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#62a365",
          borderColor: "#62a36547",
        },
        btn2: {
          backgroundColor: "#65b168",
          color: "#fff",
          borderColor: "#00000000",
        },
      };
    case "success-extra-light":
      return {
        icon: {
          color: "#65b168",
        },
        background: {
          backgroundColor: "#ffffff",
          color: "#303036",
          borderColor: "#7d7d7d24",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#62a365",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#65b16821",
          color: "#62a365",
          borderColor: "#00000000",
        },
      };
    case "warning":
      return {
        icon: {
          color: "#ffffff9c",
        },
        background: {
          backgroundColor: "#FFAB00",
          color: "#fff",
          borderColor: "#FFAB00",
        },
        btn1: {
          backgroundColor: "#FFAB00",
          color: "#fff",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#fff",
          color: "#FFAB00",
          borderColor: "#fff",
        },
      };
    case "warning-light":
      return {
        icon: {
          color: "#FFAB00",
        },
        background: {
          backgroundColor: "#FFAB001a",
          color: "#303036",
          borderColor: "#00000000",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#FFAB00",
          borderColor: "#FFAB0047",
        },
        btn2: {
          backgroundColor: "#FFAB00",
          color: "#fff",
          borderColor: "#00000000",
        },
      };
    case "warning-extra-light":
      return {
        icon: {
          color: "#FFAB00",
        },
        background: {
          backgroundColor: "#ffffff",
          color: "#303036",
          borderColor: "#7d7d7d24",
        },
        btn1: {
          backgroundColor: "#00000000",
          color: "#FFAB00",
          borderColor: "#00000000",
        },
        btn2: {
          backgroundColor: "#FFAB0021",
          color: "#FFAB00",
          borderColor: "#00000000",
        },
      };
    default:
      return {
        icon: {
          color: undefined,
        },
        background: {
          backgroundColor: undefined,
          color: undefined,
          borderColor: undefined,
        },
        btn1: {
          backgroundColor: undefined,
          color: undefined,
          borderColor: undefined,
        },
        btn2: {
          backgroundColor: undefined,
          color: undefined,
          borderColor: undefined,
        },
      };
  }
}
