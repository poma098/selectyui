import Style from "./style.module.css";
import { PropsStepper } from "./props.interface";
import cn from "classnames";
import { LuMinus, LuPlus } from "react-icons/lu";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useUITheme } from "context/UIContext";

const formatValue = (val: number, acc: number) => {
  const factor = Math.pow(10, acc);
  return (Math.round(val * factor) / factor).toFixed(acc);
};

const getStep = (value: number, factor: "big" | "small" | undefined, enabled = true) => {
  if (!enabled) return value;
  switch (factor) {
    case "big":
      return value * 100;
    case "small":
      return value / 100;
    default:
      return value;
  }
};

// Функция для очистки и преобразования текста
const sanitizeValue = (value: string, accuracy: number, min: number, max: number): number => {
  let sanitized = value.replace(",", ".")
    .replace(/[^0-9.-]/g, "") // Убираем нецифровые символы
    .replace(/^-{2,}/, "") // Убираем лишние минусы
    .replace(/\.{2,}/, ".") // Убираем лишние точки
    .trim() || "0"; // Если строка пустая, устанавливаем "0"

  let newValue = parseFloat(sanitized);
  if (isNaN(newValue)) newValue = 0;

  // Ограничиваем значение min и max
  newValue = Math.max(min, Math.min(newValue, max));

  return Math.round(newValue * Math.pow(10, accuracy)) / Math.pow(10, accuracy);
};

function Stepper({
  unit = "$",
  step = 0.01,
  accuracy = 2,
  min = 0,
  max = 100,
  value,
  onChange,
  style,
  className,
  footer = false,
  header,
  unitPosition = "left",
  disabled = false,
  description,
  size = "m",
  radius,
  bar = true,
  formatter,
  enableScalingWithAltShift = true,
  barStyle,
  barClassName,
}: PropsStepper) {
  const inputRef = useRef<HTMLDivElement | null>(null);
  const width = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  const { realTheme } = useUITheme();

  const handlePlus = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleChangeValue(true, e);
  };

  const handleMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleChangeValue(false, e);
  };

  const handleChangeValue = (
    isIncrease: boolean,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const factor = e.shiftKey ? "big" : e.altKey ? "small" : undefined;
    const localStep = getStep(step, factor, enableScalingWithAltShift);

    // Вычисляем новое значение с учетом шага
    let newValue = isIncrease ? value + localStep : value - localStep;

    // Ограничиваем значение минимумом и максимумом
    newValue = Math.max(min, Math.min(max, newValue));

    // Применяем точность и передаем новое значение через onChange
    onChange?.(parseFloat(formatValue(newValue, accuracy)));
  };

  // Обработка изменений в contentEditable
  const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    if (!inputRef.current) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    // Сохраняем позицию курсора
    const cursorPosition = range ? range.startOffset : 0;

    const newValue = sanitizeValue(
      event.currentTarget.textContent || "",
      accuracy,
      min,
      max
    );

    // Обновляем значение с учетом точности
    onChange?.(newValue);

    inputRef.current.textContent = formatter
      ? formatter(newValue)
      : formatValue(newValue, accuracy);

    setTimeout(() => {
      try {
        if (selection && inputRef.current) {
          const newRange = document.createRange();
          const textNode = inputRef.current.firstChild;

          // Проверка, есть ли текстовый узел для корректного указания позиции
          if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            newRange.setStart(textNode, cursorPosition);
            newRange.setEnd(textNode, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      } catch (error) {}
    }, 0);
  };

  const handlePressArrow = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp") {
      handlePlus(e as any);
    } else if (e.key === "ArrowDown") {
      handleMinus(e as any);
    }
  };

  const RADIUS = {
    content: radius,
    bar: Math.max(radius - 2, 0),
    button: Math.max(radius - 2, 0),
  };

  return (
    <div
      className={cn(Style.container, className)}
      style={{ ...style }}
      data-size={size}
    >
      {header && <div className={Style.header}>{header}</div>}
      <div
        className={Style.content}
        data-visible-bar={!!bar}
        style={{
          borderRadius: RADIUS.content,
        }}
      >
        <div
          className={Style.main}
          style={{
            borderRadius: RADIUS.button,
          }}
        >
          <motion.button
            whileHover={{ scale: 1, opacity: 1, backgroundColor: "#767c9614" }}
            whileTap={{ scale: 0.9, opacity: 1, backgroundColor: "#767c9625" }}
            className={Style.button}
            onClick={handleMinus}
            disabled={value <= min || !onChange || disabled}
            style={{
              borderRadius: RADIUS.button,
            }}
          >
            <LuMinus />
          </motion.button>
          <div className={Style.body}>
            <div
              className={Style.value}
              style={{
                flexDirection: unitPosition === "right" ? "row-reverse" : "row",
              }}
            >
              <div className={Style.unit}>{unit}</div>
              <div
                className={Style.input}
                contentEditable={!!onChange && !disabled}
                ref={inputRef}
                onInput={handleInputChange}
                suppressContentEditableWarning={true}
                onKeyDown={handlePressArrow}
                style={{
                  cursor: onChange && !disabled ? "text" : "default",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {formatter ? formatter(value) : formatValue(value, accuracy)}
              </div>
            </div>
            {description && (
              <div className={Style.description}>
                {description instanceof Function
                  ? description(value, unit)
                  : description}
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1, opacity: 1, backgroundColor: "#767c9614" }}
            whileTap={{ scale: 0.9, opacity: 1, backgroundColor: "#767c9625" }}
            className={Style.button}
            onClick={handlePlus}
            disabled={value >= max || !onChange || disabled}
            style={{
              borderRadius: RADIUS.button,
            }}
          >
            <LuPlus />
          </motion.button>
        </div>
        {bar && (
          <div
            className={Style.barContainer}
            style={{
              borderRadius: RADIUS.bar,
            }}
          >
            <motion.div
              className={cn(Style.bar, barClassName)}
              animate={{
                width: `${width}%`,
                opacity: disabled ? 0.85 : 1,
              }}
              style={{
                backgroundColor: realTheme === "dark" ? "#767c9633" : "#fff",
                borderRadius: RADIUS.bar,
                ...barStyle,
              }}
            ></motion.div>
          </div>
        )}
      </div>
      {footer && (
        <div className={Style.footer}>
          <div className={Style.footerValue}>
            {unitPosition === "left" && unit}
            {formatter ? formatter(min) : formatValue(min, accuracy)}
            {unitPosition === "right" && unit}
          </div>
          <div className={Style.footerValue}>
            {unitPosition === "left" && unit}
            {formatter ? formatter(max) : formatValue(max, accuracy)}
            {unitPosition === "right" && unit}
          </div>
        </div>
      )}
    </div>
  );
}

export { Stepper };
