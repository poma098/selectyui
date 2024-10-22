// App.tsx
import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
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
import { Calendar } from "./components/Calendar";
import { GooeyText } from "components/GooeyText";
import { Button, ContainerBlur, LinearBlur } from "./index";
import { Avatar } from "components/Avatar"

function App() {

  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [visibleEvents, setVisibleEvents] = useState<boolean>(true);
  const [visibleHolidays, setVisibleHolidays] = useState<boolean>(true);

  useEffect(() => {
    console.log("update selected", selectedDates);
  }, [selectedDates]);

  useEffect(() => {
    console.log("update calendar", activeDate);
  }, [activeDate]);
  
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
      <Avatar path="./assets/images/"/>
      {/* <GooeyText
        textAlign="center"
        // radius={10}
        // paddingY={"5px"}
        // paddingX={"10px"}
        maxWidth={300}
        // textColor="#fff"
        backgroundColor="#534d7a"
        style={{
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        This is an example 1 of a simple headline or text with rounded corners
        using a gooey SVG filter
      </GooeyText> */}
      {/* <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Button
          label="Сбросить выделение"
          onClick={() => setSelectedDates([])}
          disabled={selectedDates.length === 0}
        />
        <Button
          label="Выделить даты"
          onClick={() =>
            setSelectedDates([new Date(2024, 1, 1), new Date(2024, 1, 2)])
          }
        />
        <Button
          label={visibleHolidays ? "Скрыть праздники" : "Показать праздники"}
          onClick={() => setVisibleHolidays(!visibleHolidays)}
        />
        <Button
          label={visibleEvents ? "Скрыть события" : "Показать события"}
          onClick={() => setVisibleEvents(!visibleEvents)}
        />
      </div> */}
      <Calendar
        size="medium"
        format="year"
        setActiveDate={setActiveDate}
        startWeek={1}
        visibleWeekend={true}
        visibleToday={true}
        visiblePrevNext={true}
        visibleWeekNumbers={true}
        holidaysVisible={visibleHolidays}
        visibleEvents={visibleEvents}
        onChange={setSelectedDates}
        selectedMode="mooving"
        selected={true}
        colums={4}
        onMouseEnterItem={(value, item) => console.log("onMouseEnterItem", value, item)}
        onMouseLeaveItem={(value, item) => console.log("onMouseLeaveItem", value, item)}
        onClickItem={(value, item) => console.log("onClickItem", value, item)}
        customItem={(value, item) => {
          return (
            <>
              <div>{value.toISOString()}</div>
              <div>{JSON.stringify(item)}</div>
            </>
          );
        }}
        value={selectedDates}
        events={[
          {
            formula: {
              startDate: new Date("2024-08-18T10:00:00Z"),
              repeatInterval: "DAYS",
              frequency: 8,
            },
            name: "Утренний кофе!",
            durationDays: 4,
            description: "Замечательный день, чтобы выпить кофе",
            icon: "☕️",
            color: "#c0392b", // Коричневый
          },
          {
            formula: {
              repeatInterval: "WEEKS",
              frequency: 2,
              specificDateTime: {
                dayOfWeek: 5,
              },
            },
            name: "Ретроспектива",
            description: "Ретроспектива по предыдущим двум неделям",
            icon: "🗞️",
            color: "#28a745", // Зеленый
          },
          {
            formula: {
              repeatInterval: "WEEKS",
              frequency: 1, // Повторяется каждую неделю
              specificDateTime: {
                dayOfWeek: 1,
              },
            },
            name: "Планирование скрама",
            description: "Планирование скрама на рабочую неделю",
            icon: "📅",
            color: "#007bff", // Синий
          },
          {
            formula: {
              repeatInterval: "WEEKS",
              frequency: 1, // Повторяется каждую неделю
              specificDateTime: {
                dayOfWeek: 2,
              },
            },
            durationDays: 4,
            name: "Ежедневный скрам",
            description: "Обсуждение задач и планирование ежедневного скрама",
            icon: "📅",
            color: "#00ffff", // Голубой
          },
          {
            formula: {
              repeatInterval: "YEARS",
              frequency: 1,
              specificDateTime: {
                dayOfMonth: 22,
                hours: 0,
                minutes: 0,
                month: 10,
              },
            },
            name: "День Рождение Ромы!",
            icon: "🎉",
            color: "#ffd700", // Золотой
          },
          {
            date: new Date(2024, 9, 4),
            name: "День Рождение Миши!",
            icon: "🎉",
            color: "#fba700", // Золотой
            durationDays: 1,
          },
        ]}
        activeDate={activeDate}
        // activeDate={new Date(2005, 1, 1)}
        minDate={new Date(2009, 1, 10)}
        maxDate={new Date(2025, 10, 19)}
        style={{
          width: "min-content",
          minWidth: "591px",
        }}
      />
      {/* <div>
        <div>Выбранные даты:</div>
        <div>
          {selectedDates.map((d, i) => {
            return (
              <>
                {i + 1}. {d.toISOString()}
                <br />
              </>
            );
          })}
        </div>
      </div> */}
    </UIProvider>
  );
}

export default App;
