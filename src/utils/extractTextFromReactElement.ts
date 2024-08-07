import React from "react";

// Функция для извлечения текста из React-элемента
const extractTextFromReactElement = (element: React.ReactNode): string => {
  try {
    if (typeof element === "string" || typeof element === "number") {
      return element.toString();
    }
    if (React.isValidElement(element)) {
      return (
        React.Children.map(element.props.children, (child) =>
          extractTextFromReactElement(child)
        ).join("") || ""
      );
    }
    return "";
  } catch (error) {
    return "";
  }
};

export default extractTextFromReactElement;
