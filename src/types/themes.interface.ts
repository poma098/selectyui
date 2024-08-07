export interface Themes {
  [key: string]: Theme; // Ключ - название темы, значение - данные о теме
}

export interface Theme {
  name: string; // Название темы
  icon?: string | React.ReactNode; // Иконка темы
}