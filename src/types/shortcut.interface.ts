/**
 * Тип для функции обратного вызова, которая будет вызвана при активации сочетания клавиш
 * @param {KeyboardEvent} event - событие нажатия клавиши
 */
export type ShortcutCallback = (
  event: KeyboardEvent,
  shortcuts: ShortcutObject[],
) => void;

/**
 * Тип для описания сочетания клавиш
 * @type {string | string[]}
 */
export type ShortcutKey = string | string[];

/**
 * Интерфейс для описания сочетания клавиш
 * @property {string | string[]} key - Ключ или массив ключей, которые активируют сочетание
 * @property {ShortcutCallback} callback - Функция обратного вызова, которая будет вызвана при активации сочетания
 * @property {string | React.ReactNode} name - Название сочетания или React компонент для отображения названия
 * @property {string | React.ReactNode} [icon] - Иконка для отображения перед названием или React компонент иконки
 * @property {string | React.ReactNode} [description] - Описание сочетания или React компонент для отображения описания
 */
export interface Shortcut {
  /**
   * Ключ или массив ключей, которые активируют сочетание
   * @type {string | string[]}
   */
  key: ShortcutKey;
  /**
   * Функция обратного вызова, которая будет вызвана при активации сочетания
   * @param {KeyboardEvent} event - событие нажатия клавиши
   */
  callback: ShortcutCallback;
  /**
   * Название сочетания или React компонент для отображения названия
   */
  name: string | React.ReactNode;
  /**
   * Иконка для отображения перед названием или React компонент иконки
   */
  icon?: string | React.ReactNode;
  /**
   * Описание сочетания или React компонент для отображения описания
   */
  description?: string | React.ReactNode;
}

/**
 * Интерфейс для описания сочетания клавиш
 * @property {React.ReactElement} element - Компонент для отображения сочетания
 * @type {ShortcutObject}
 * @memberof Shortcut
 */
export interface ShortcutObject extends Shortcut {

  /**
   * Компонент для отображения сочетания
   * @type {React.ReactElement}
   */
  element?: React.ReactElement;
}
