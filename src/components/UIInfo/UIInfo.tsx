import React from "react";
import { useUI, useUILocale } from "../../context/UIContext";
import styles from "./style.module.css"; // Импорт стилей из CSS-модуля
import { Font } from "../../types/fonts.interface";
import { LangSwitcher } from "../../components/LangSwitcher";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { FontSwitcher } from "../../components/FontSwitcher";

interface FontF extends Font {
  family: string;
}

const UIInfo = () => {
  const { theme, fonts, fontFamily, realTheme } = useUI();

  const { localization, setLocalization, locale, localizationFiles, getLocale } =
    useUILocale();

  // Flatten fonts into a list and sort them by weight and style
  const sortedFonts = Object.entries(fonts)
    .flatMap(([key, fontArray]) =>
      fontArray.map((font) => ({ ...font, family: key }))
    )
    .sort((a: FontF, b: FontF) => {
      if (a.weight === b.weight) {
        return a.style.localeCompare(b.style);
      }
      return a.weight - b.weight;
    });

  // Group fonts by weight
  const groupedFonts = sortedFonts.reduce(
    (acc: { [weight: number]: FontF[] }, font: FontF) => {
      if (!acc[font.weight]) {
        acc[font.weight] = [];
      }
      acc[font.weight].push(font);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.uxInfo}>
      <h2 className={styles.title}>UX Information</h2>
      <div className={`${styles.infoSection} ${styles.themeInfo}`}>
        <h3 className={styles.sectionTitle}>Theme</h3>
        <ThemeSwitcher />
        <br />
        <div className={styles.infoValue}>{theme}</div>
      </div>
      <div className={`${styles.infoSection} ${styles.themeInfo}`}>
        <h3 className={styles.sectionTitle}>Real theme</h3>
        <div className={styles.infoValue}>{realTheme}</div>
      </div>
      <div className={`${styles.infoSection} ${styles.themeInfo}`}>
        <h3 className={styles.sectionTitle}>Select Font</h3>
        <FontSwitcher />
        <br />
        <div className={styles.infoValue}>{getLocale(fontFamily)}</div>
      </div>
      <div className={`${styles.infoSection} ${styles.fontsInfo}`}>
        <h3 className={styles.sectionTitle}>Fonts</h3>
        <table className={styles.fontsTable}>
          <thead>
            <tr>
              <th>Weight</th>
              <th>Style</th>
              <th>Font File</th>
              <th>Family</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedFonts).map(([weight, fontsByWeight]) => (
              <React.Fragment key={weight}>
                {fontsByWeight.map((font, index) => (
                  <tr key={index}>
                    <td>{font.weight}</td>
                    <td>{font.style}</td>
                    <td>{font.fontFile}</td>
                    <td
                      style={{
                        backgroundColor:
                          fontFamily === font.family
                            ? "#8bc34a5e"
                            : "transparent",
                      }}
                    >
                      {font.family}
                    </td>
                  </tr>
                ))}
                {/* Insert a row to separate different weights for clarity */}
                {fontsByWeight.length > 0 && (
                  <tr key={`separator-${weight}`}>
                    <td colSpan={4} className={styles.separator}></td>{" "}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${styles.infoSection} ${styles.localizationInfo}`}>
        <LangSwitcher />
        <h3 className={styles.sectionTitle}>Localization name</h3>
        <div className={styles.infoValue}>{locale.name}</div>
        <h3 className={styles.sectionTitle}>Localization code</h3>
        <div className={styles.infoValue}>{locale.code}</div>
        <h3 className={styles.sectionTitle}>Localization flag</h3>
        <div className={styles.infoValue}>{locale.flag}</div>
        <h3 className={styles.sectionTitle}>Localization object</h3>
        <div className={styles.infoValue}>{JSON.stringify(locale.object)}</div>
      </div>
    </div>
  );
};

export { UIInfo };
