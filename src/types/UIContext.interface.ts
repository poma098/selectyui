import { Theme } from '@type/theme.type';
import { Fonts } from '@type/fonts.interface';
import { Themes } from "@type/themes.interface";
import { Lang, Langs } from './langs.interface';
import { Shortcut, ShortcutKey, ShortcutObject } from './shortcut.interface';

export interface UIContextProps {
  /**
   * Текущая тема интерфейса.
   */
  theme: Theme;

  /**
   * Установка текущей темы интерфейса.
   */
  setTheme: (theme: Theme) => void;

  /**
   * Текущие темы интерфейса.
   */
  themes: Themes;

  /**
   * Значение фактической темы интерфейса.
   */
  realTheme: keyof Themes;

  /**
   * Список шрифтов.
   */
  fonts: Fonts;

  setFonts: (fonts: Fonts) => void;
  localizationFiles: Langs;
  // setLocalizationFiles: (localizationFile: keyof Langs) => void;
  localization: keyof Langs;
  setLocalization: (localization: keyof Langs) => void;
  fontFamily: string; // Добавлено
  setFontFamily: (fontFamily: string) => void;

  /**
   * Язык интерфейса.
   * @type {Lang}
   */
  locale: Lang;

  /**
   * Получение фразы или слова по ключу языковой таблицы.
   * @param {string} key Ключ языка.
   * @returns {string} Значение языка.
   */
  getLocale: (key: string) => string;

  /**
   * Регистрация сочетания клавиш.
   * @param {Shortcut} shortcut Сочетание клавиш.
   */
  registerShortcut: (shortcut: Shortcut) => void;

  /**
   * Удаление сочетания клавиш.
   * @param {string} key Ключ сочетания клавиш.
   */
  unregisterShortcut: (key: ShortcutKey) => void;

  /**
   * Список сочетаний клавиш.
   * @type {ShortcutObject[]} Список сочетаний клавиш.
   */
  shortcuts: ShortcutObject[];

  getShortcutByKey: (key: ShortcutKey) => ShortcutObject | undefined;
}

/**
 * Свойства провайдера интерфейса пользователя.
 * @property {Theme} initialTheme - Начальная тема интерфейса.
 * @property {Themes} initialThemes - Начальные темы интерфейса.
 * @property {Fonts} initialFonts - Начальные шрифты интерфейса.
 * @property {string} initialFontFamily - Начальное семейство шрифтов.
 * @property {string} initialLocalizationFile - Начальный файл локализации.
 * @property {React.ReactNode} children - Дочерние компоненты.
 * @property {keyof Langs} initialLocalization - Начальная локализация.
 * @property {Langs} initialLocalizationFiles - Начальные файлы локализации.
 */
export interface UIProviderProps {

  /**
   * Начальная тема интерфейса.
   * @type {Theme}
   * @default 'automatic'
   */
  initialTheme?: Theme;

  /**
   * Начальные темы интерфейса.
   * @type {Themes}
   */
  initialThemes?: Themes;

  /**
   * Начальные шрифты интерфейса.
   * @type {Fonts}
   */
  initialFonts?: Fonts;

  /**
   * Начальное семейство шрифтов.
   * @type {string}
   */
  initialFontFamily?: string;

  /**
   * Начальный файл локализации.
   * @type {string}
   */
  initialLocalizationFile?: string;

  /**
   * Дочерние компоненты.
   * @type {React.ReactNode}
   * @default null
   * @see https://reactjs.org/docs/context.html
   */
  children: React.ReactNode;

  /**
   * Начальная локализация.
   * @type {keyof Langs}
   * @default undefined
   */
  initialLocalization: keyof Langs;

  /**
   * Начальные файлы локализации.
   * @type {Langs}
   * @default undefined
   */
  initialLocalizationFiles: Langs;
}
