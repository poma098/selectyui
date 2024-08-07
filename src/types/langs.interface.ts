/**
 * Интерфейс для языков.
 * @param name Название языка.
 * @param code Код языка (2 буквы) согласно ISO 639-1. Необязательное поле.
 * @param object Языковой объект, содержащий ключ-значение для переводов.
 * @param description Описание языка. Необязательное поле.
 * @param flag Флаг страны, может быть строкой или React компонентом. Необязательное поле.
 * @param ISO4217 Данные валюты согласно ISO 4217. Необязательное поле.
 * @param M49 Код страны согласно ISO 3166-1 alpha-2. Необязательное поле.
 */
export interface Lang {
  name: string;
  code?: string;
  object: { [key: string]: string };
  description?: string;
  flag?: string | React.ReactNode;
  ISO4217?: ISO4217;
  M49?: number;
}

/**
 * Интерфейс для данных валюты согласно ISO 4217.
 * @property {string} name - Название валюты.
 * @property {string} code - Код валюты.
 * @property {string} symbol - Символ валюты.
 * @property {number} rounding - Количество цифр после запятой.
 * @property {string} delimiter - Разделитель целого и дробного числа.
 */
export interface ISO4217 {
  /**
   * Название валюты
   * @type {string}
   * @memberof ISO4217
   * @readonly
   */
  name: string; // Название валюты

  /**
   * Код валюты
   * @type {string}
   * @memberof ISO4217
   * @readonly
   */
  code: string; // Код валюты

  /**
   * Символ валюты
   * @type {string}
   * @memberof ISO4217
   * @readonly
   */
  symbol: string; // Символ валюты

  /**
   * Количество цифр после запятой
   * @type {number}
   * @memberof ISO4217
   * @readonly
   */
  rounding: number; // Сколько цифр после запятой

  /**
   * Разделитель целого и дробного числа
   * @type {string}
   * @memberof ISO4217
   * @readonly
   */
  delimiter: string; // Разделитель целой и дробной части

}

/**
 * Интерфейс для словаря языков.
 * @property {string} [key] - Ключ языка.
 * @property {Lang} [value] - Объект языка.
 */
export interface Langs {
  [key: string]: Lang; 
}
