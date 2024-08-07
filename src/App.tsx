// App.tsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "routes";
import { UIProvider } from "./context/UIContext";

// Импорт файлов шрифтов
import fontBlack from "./assets/fonts/BlinkMacSystemFont-Black.woff";
import fontBlackItalic from "./assets/fonts/BlinkMacSystemFont-BlackItalic.woff";
import fontBold from "./assets/fonts/BlinkMacSystemFont-Bold.woff";
import fontBoldItalic from "./assets/fonts/BlinkMacSystemFont-BoldItalic.woff";
import fontHeavy from "./assets/fonts/BlinkMacSystemFont-Heavy.woff";
import fontHeavyItalic from "./assets/fonts/BlinkMacSystemFont-HeavyItalic.woff";
import fontLight from "./assets/fonts/BlinkMacSystemFont-Light.woff";
import fontLightItalic from "./assets/fonts/BlinkMacSystemFont-LightItalic.woff";
import fontMedium from "./assets/fonts/BlinkMacSystemFont-Medium.woff";
import fontMediumItalic from "./assets/fonts/BlinkMacSystemFont-MediumItalic.woff";
import fontRegular from "./assets/fonts/BlinkMacSystemFont-Regular.woff";
import fontRegularItalic from "./assets/fonts/BlinkMacSystemFont-RegularItalic.woff";
import fontSemibold from "./assets/fonts/BlinkMacSystemFont-Semibold.woff";
import fontSemiboldItalic from "./assets/fonts/BlinkMacSystemFont-SemiboldItalic.woff";
import fontThin from "./assets/fonts/BlinkMacSystemFont-Thin.woff";
import fontThinItalic from "./assets/fonts/BlinkMacSystemFont-ThinItalic.woff";
import fontUltralight from "./assets/fonts/BlinkMacSystemFont-Ultralight.woff";
import fontUltralightItalic from "./assets/fonts/BlinkMacSystemFont-UltralightItalic.woff";

import fontJetBrainsBold from "./assets/fonts/JetBrainsMono-Bold.woff2"
import fontJetBrainsExtraBold from "./assets/fonts/JetBrainsMono-ExtraBold.woff2";
import fontJetBrainsExtraLight from "./assets/fonts/JetBrainsMono-ExtraLight.woff2";
import fontJetBrainsLight from "./assets/fonts/JetBrainsMono-Light.woff2";
import fontJetBrainsMedium from "./assets/fonts/JetBrainsMono-Medium.woff2";
import fontJetBrainsRegular from "./assets/fonts/JetBrainsMono-Regular.woff2";
import fontJetBrainsSemiBold from "./assets/fonts/JetBrainsMono-SemiBold.woff2";
import fontJetBrainsThin from "./assets/fonts/JetBrainsMono-Thin.woff2";

import fontGilroyExtraBold from "./assets/fonts/Gilroy-ExtraBold.ttf";
import fontGilroyLight from "./assets/fonts/Gilroy-Light.ttf";

import "./assets/themes/light.theme.css";
import "./assets/themes/dark.theme.css";
import "./assets/themes/automatic.theme.css";
import "./assets/themes/custom.theme.css";

import RU from "./assets/lang/ru.json";
import EN from "./assets/lang/en.json";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { FaRegLightbulb, FaTrafficLight } from "react-icons/fa";

function App() {
  return (
    <UIProvider
      initialTheme="automatic"
      initialThemes={{
        light: {
          name: "Light theme",
          icon: <MdLightMode />,
        },
        dark: {
          name: "Dark theme",
          icon: <MdNightlightRound />,
        },
        automatic: {
          name: "Automatic theme",
          icon: <FaRegLightbulb />,
        },
        custom: {
          name: "Custom theme",
          icon: <FaTrafficLight />,
        },
      }}
      initialFonts={{
        defaultFont: [
          { weight: 900, style: "normal", fontFile: fontBlack },
          { weight: 900, style: "italic", fontFile: fontBlackItalic },
          { weight: 700, style: "normal", fontFile: fontBold },
          { weight: 700, style: "italic", fontFile: fontBoldItalic },
          { weight: 400, style: "normal", fontFile: fontHeavy },
          { weight: 400, style: "italic", fontFile: fontHeavyItalic },
          { weight: 300, style: "normal", fontFile: fontLight },
          { weight: 300, style: "italic", fontFile: fontLightItalic },
          { weight: 500, style: "normal", fontFile: fontMedium },
          { weight: 500, style: "italic", fontFile: fontMediumItalic },
          { weight: 400, style: "normal", fontFile: fontRegular },
          { weight: 400, style: "italic", fontFile: fontRegularItalic },
          { weight: 600, style: "normal", fontFile: fontSemibold },
          { weight: 600, style: "italic", fontFile: fontSemiboldItalic },
          { weight: 100, style: "normal", fontFile: fontThin },
          { weight: 100, style: "italic", fontFile: fontThinItalic },
          { weight: 200, style: "normal", fontFile: fontUltralight },
          { weight: 200, style: "italic", fontFile: fontUltralightItalic },
        ],
        customFont: [
          { weight: 900, style: "normal", fontFile: fontJetBrainsExtraBold },
          { weight: 800, style: "normal", fontFile: fontJetBrainsSemiBold },
          { weight: 700, style: "normal", fontFile: fontJetBrainsBold },
          { weight: 600, style: "normal", fontFile: fontJetBrainsBold },
          { weight: 500, style: "normal", fontFile: fontJetBrainsRegular },
          { weight: 400, style: "normal", fontFile: fontJetBrainsMedium },
          { weight: 300, style: "normal", fontFile: fontJetBrainsLight },
          { weight: 200, style: "normal", fontFile: fontJetBrainsExtraLight },
          { weight: 100, style: "normal", fontFile: fontJetBrainsThin },
        ],
        customFont2: [
          { weight: 900, style: "normal", fontFile: fontGilroyExtraBold },
          { weight: 800, style: "normal", fontFile: fontGilroyExtraBold },
          { weight: 700, style: "normal", fontFile: fontGilroyExtraBold },
          { weight: 600, style: "normal", fontFile: fontGilroyExtraBold },
          { weight: 500, style: "normal", fontFile: fontGilroyExtraBold },
          { weight: 400, style: "normal", fontFile: fontGilroyLight },
          { weight: 300, style: "normal", fontFile: fontGilroyLight },
          { weight: 200, style: "normal", fontFile: fontGilroyLight },
          { weight: 100, style: "normal", fontFile: fontGilroyLight },
        ],
      }}
      // initialFontFamily="customFont"
      initialLocalization="ru"
      initialLocalizationFiles={{
        ru: {
          name: "Русский",
          description: "Русский язык",
          object: RU,
          code: "ru",
          ISO4217: {
            name: "Российский рубль",
            code: "RUB",
            symbol: "₽",
            delimiter: ".",
            rounding: 2,
          },
          M49: 643,
          flag: "🇷🇺",
        },
        en: {
          name: "English",
          description: "English language",
          object: EN,
          code: "en",
          ISO4217: {
            name: "US Dollar",
            code: "USD",
            symbol: "$",
            delimiter: ",",
            rounding: 2,
          },
          M49: 840,
          flag: "🇺🇸",
        },
      }}
    >
      <RouterProvider router={router} />
    </UIProvider>
  );
}

export default App;
