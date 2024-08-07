// context/UXContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { UIContextProps, UIProviderProps } from "../types/UIContext.interface";
import { Theme } from "../types/theme.type";
import { Themes } from "../types/themes.interface";
import { Fonts } from "../types/fonts.interface";
import { Lang, Langs } from "../types/langs.interface";
import {
  Shortcut,
  ShortcutKey,
  ShortcutObject,
} from "../types/shortcut.interface";
import Mousetrap from "mousetrap";

import Shortcuts from "../components/Shortcuts";

const UIContext = createContext<UIContextProps>({
  theme: "automatic",
  setTheme: () => {},
  themes: {},
  fonts: {},
  setFonts: () => {},
  localizationFiles: {},
  localization: "",
  setLocalization: () => {},
  fontFamily: "",
  setFontFamily: () => {},
  realTheme: "",
  locale: {} as Lang,
  getLocale: () => "",
  registerShortcut: () => {},
  unregisterShortcut: () => {},
  shortcuts: [],
  getShortcutByKey: () => {
    return undefined
  }
});

export const UIProvider: React.FC<UIProviderProps> = ({
  initialTheme = "automatic",
  initialThemes = {
    light: {
      name: "Light theme",
    },
    dark: {
      name: "Dark theme",
    },
    automatic: {
      name: "Automatic theme",
    },
  },
  initialFonts = {},
  initialFontFamily = "defaultFont",
  initialLocalizationFiles = {},
  initialLocalization = "",
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [realTheme, setRealTheme] = useState<Theme>(initialTheme);
  const [themes, setThemes] = useState<Themes>(initialThemes);

  const [fonts, setFonts] = useState<Fonts>(initialFonts);
  const [fontFamily, setFontFamily] = useState<string>(initialFontFamily);

  const [localization, setLocalization] =
    useState<keyof Langs>(initialLocalization);
  const [localizationFiles, setLocalizationFiles] = useState<Langs>(
    initialLocalizationFiles
  );
  const [locale, setLocale] = useState<Lang>(
    initialLocalizationFiles[initialLocalization]
  );

  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const registerShortcut = (shortcut: Shortcut) => {
    let shortcutObject = shortcut as ShortcutObject;
    shortcutObject.element = generateElementsShortcut(shortcutObject.key, shortcutObject);
    setShortcuts((prev) => [...prev, shortcutObject]);
    Mousetrap.bind(
      shortcut.key,
      (e: Mousetrap.ExtendedKeyboardEvent, combo: string) => {
        shortcut.callback(e, shortcuts as ShortcutObject[]);
      }
    );
  };

  const unregisterShortcut = (key: string | string[]) => {
    setShortcuts((prev) => prev.filter((shortcut) => shortcut.key !== key));
    Mousetrap.unbind(key);
  };

  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      let value: Theme = theme;
      if (theme === "automatic") {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          value = "dark";
        } else {
          value = "light";
        }
      } else {
        value = theme;
      }

      setRealTheme(value);
      setTheme(theme);
      document.body.setAttribute("data-theme", theme);
    };

    applyTheme(theme);
  }, [theme, themes]);

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").onchange = (event) => {
      const themeReal = event.matches ? "dark" : "light";
      if (theme === "automatic") {
        setRealTheme(themeReal);
      }
    };
  }, [theme]);

  useEffect(() => {
    const loadFonts = async () => {
      for (const [key, fontArray] of Object.entries(fonts)) {
        for (const font of fontArray) {
          try {
            const fontFace = new FontFace(
              font.fontFamily || key,
              `url(${font.fontFile})`,
              {
                weight: font.weight.toString(),
                style: font.style,
              }
            );
            await fontFace.load();
            document.fonts.add(fontFace);

            if (
              key === "defaultFont" &&
              (initialFontFamily === "defaultFont" || !initialFontFamily)
            ) {
              setFontFamily(font.fontFamily || key);
            }
          } catch (error) {
            console.error(`Failed to load font: ${font.fontFile}`, error);
          }
        }
      }
    };

    loadFonts();
  }, [fonts, initialFontFamily]);

  useEffect(() => {
    if (fontFamily) {
      // document.body.style.fontFamily =
      //   fontFamily !== "defaultFont"
      //     ? fontFamily
      //     : fonts.default?.[0]?.fontFamily || "defaultFont";

      // Добавляем style в head
      const style = document.createElement("style");
      style.type = "text/css";
      style.setAttribute("data-font", "true");
      style.textContent = `* { font-family: ${fontFamily}; } code, code *, kbd { font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace; }`;
      document.head.appendChild(style);
    } 

    return () => {
      document.head.querySelector("[data-font]")?.remove();
    }
  }, [fontFamily, fonts]);

  useEffect(() => {
    setLocale(localizationFiles[localization]);
  }, [localization, localizationFiles]);

  function getLocale(key: string) {
    return locale.object[key] || key;
  }

  function generateElementsShortcut(key: ShortcutKey, shortcut: ShortcutObject): React.ReactElement {
    return <Shortcuts shortcutsKey={key} shortcutActive={false} />;
  }

  /**
   * Поиск сочетания клавиш по ключу
   * @param {ShortcutKey} key - Ключ или массив ключей для поиска
   * @returns {Shortcut | undefined} - Найденное сочетание клавиш или undefined, если не найдено
   */
  function getShortcutByKey(key: ShortcutKey): ShortcutObject | undefined {
    return shortcuts.find((shortcut) => {
      const shortcutKeys = Array.isArray(shortcut.key)
        ? shortcut.key
        : [shortcut.key];
      const searchKeys = Array.isArray(key) ? key : [key];

      return searchKeys.some((searchKey) => shortcutKeys.includes(searchKey));
    });
  }

  return (
    <UIContext.Provider
      value={{
        theme,
        setTheme,
        themes,
        fonts,
        setFonts,
        localizationFiles,
        localization,
        setLocalization,
        fontFamily,
        setFontFamily,
        realTheme,
        locale,
        getLocale,
        registerShortcut,
        unregisterShortcut,
        shortcuts,
        getShortcutByKey,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

/**
 * Хук для работы с контекстом интерфейса пользователя
 */
export const useUI = (): UIContextProps => {
  return useContext(UIContext);
};

/**
 * Хук для работы с шорткатами
 */
export const useShortcuts = () => {
  const { registerShortcut, unregisterShortcut, shortcuts, getShortcutByKey } =
    useContext(UIContext);
  return { registerShortcut, unregisterShortcut, shortcuts, getShortcutByKey };
};

/**
 * Хук для работы с темой
 */
export const useUITheme = () => {
  const { theme, setTheme, themes, realTheme } = useContext(UIContext);
  return { theme, setTheme, themes, realTheme };
};

/**
 * Хук для работы с шрифтами
 */
export const useUIFonts = () => {
  const { fonts, setFonts, fontFamily, setFontFamily } = useContext(UIContext);
  return { fonts, setFonts, fontFamily, setFontFamily };
};

/**
 * Хук для работы с локализацией
 */
export const useUILocale = () => {
  const {
    localization,
    setLocalization,
    locale,
    localizationFiles,
    getLocale,
  } = useContext(UIContext);
  return {
    localization,
    setLocalization,
    locale,
    localizationFiles,
    getLocale,
  };
};
