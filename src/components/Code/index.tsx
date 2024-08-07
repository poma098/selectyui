import { useEffect, useState } from "react";
import { FaCheck, FaCode, FaRegCopy } from "react-icons/fa6";
import { CodeProps } from "./props.interface";
import Style from "./style.module.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useUITheme } from "../../context/UIContext";
import {
  MdNightlightRound,
  MdLightMode,
  MdOutlineLineStyle,
} from "react-icons/md";
import hljs from "highlight.js";
import jschardet from "jschardet";
import { FaPython, FaJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { BiLogoPhp, BiLogoTypescript } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import {
  TbCircleLetterAFilled,
  TbLivePhoto,
  TbLivePhotoOff,
} from "react-icons/tb";
import { LuBinary } from "react-icons/lu";
import { RiJavaLine } from "react-icons/ri";
import { HiTerminal } from "react-icons/hi";

function Code({
  code,
  language,
  title = "Пример кода",
  className,
  style,
  theme = "light",
  showLineNumbers = true,
  isLiveVisible,
  editable = false,
}: CodeProps) {
  const { realTheme } = useUITheme();
  const [localTheme, setLocalTheme] = useState<"light" | "dark">(
    theme ? theme : realTheme === "light" ? "light" : "dark"
  );
  const [copied, setCopied] = useState(false);
  const [isLive, setIsLive] = useState(isLiveVisible); // Состояние для live-режима
  const [currentCode, setCurrentCode] = useState(code); // Состояние для редактируемого кода
  const detectedLanguage = hljs.highlightAuto(code).language;
  const [lines, setLines] = useState<number>(0);
  const [chars, setChars] = useState<number>(0);
  const [encoding, setEncoding] = useState<string>("-");
  const [iframeKey, setIframeKey] = useState<number>(0); // Ключ для iframe
  const [widths, setWidths] = useState<{
    codeWidth: number;
    previewWidth: number;
  }>({
    codeWidth: 50,
    previewWidth: 50,
  });

  const lang: string = language ? language : detectedLanguage || "text";
  let iconLang = <FaCode />;

  const languageIcons: { [key: string]: JSX.Element } = {
    python: <FaPython />,
    javascript: <FaJs />,
    java: <RiJavaLine />,
    html: <FaHtml5 />,
    css: <FaCss3Alt />,
    php: <BiLogoPhp />,
    typescript: <BiLogoTypescript />,
    binary: <LuBinary />,
    bash: <HiTerminal />,
  };

  if (lang in languageIcons) {
    iconLang = languageIcons[lang];
  }

  useEffect(() => {
    setLines(currentCode.split("\n").length);
    setChars(
      currentCode.replace(/\s/g, "").replace(/\n/g, "").split("").length
    );

    // Определение кодировки
    const result = jschardet.detect(currentCode);
    setEncoding(result.encoding || "-");
  }, [currentCode, lang]);

  useEffect(() => {
    if (theme) {
      setLocalTheme(theme);
    }
  }, [theme]);

  const handleTheme = () => {
    setLocalTheme(localTheme === "light" ? "dark" : "light");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    if (!copied) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  const handleLiveToggle = () => {
    setIsLive(!isLive);
    setIframeKey((prevKey) => prevKey + 1); // Обновление ключа для перерисовки iframe
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newCodeWidth = (e.clientX / window.innerWidth) * 100;
    const newPreviewWidth = 100 - newCodeWidth;
    setWidths({
      codeWidth: newCodeWidth,
      previewWidth: newPreviewWidth,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const renderIframe = () => {
    if (lang === "html" || lang === "javascript" || lang === "css") {
      return (
        <iframe
          key={iframeKey}
          srcDoc={`<!DOCTYPE html><html><head><style>${
            lang === "css" ? currentCode : ""
          }</style></head><body>${lang === "html" ? currentCode : ""}<script>${
            lang === "javascript" ? currentCode : ""
          }</script></body></html>`}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      );
    }
    return <div>Live preview not available for {lang}</div>;
  };

  let classN = Style.container;
  if (className) {
    classN = `${classN} ${className}`;
  }

  return (
    <div className={classN} style={style}>
      <div className={Style.header}>
        <div className={Style.title}>
          {title && <div className={Style.text}>{title}</div>}
          {lang && (
            <div className={Style.language}>
              <div className={Style.languageIcon}>{iconLang}</div>
              {lang}
            </div>
          )}
          {!title && !lang && <div className={Style.text}>Code</div>}
        </div>
        <div className={Style.buttons}>
          {navigator?.clipboard && currentCode && (
            <button className={Style.button} onClick={handleCopy}>
              <div className={Style.buttonsIcon}>
                {copied ? <FaCheck /> : <FaRegCopy />}
              </div>
              <div className={Style.buttonsText}>
                {copied ? "Скопировано" : "Копировать"}
              </div>
            </button>
          )}

          <button className={Style.button} onClick={handleTheme}>
            <div className={Style.buttonsIcon}>
              {localTheme === "light" ? <MdNightlightRound /> : <MdLightMode />}
            </div>
            <div className={Style.buttonsText}>
              {localTheme === "light" ? "Темная" : "Светлая"} тема
            </div>
          </button>

          {(lang === "html" || lang === "javascript" || lang === "css") && (
            <button className={Style.button} onClick={handleLiveToggle}>
              <div className={Style.buttonsIcon}>
                {isLive ? <TbLivePhoto /> : <TbLivePhotoOff />}
              </div>
              <div className={Style.buttonsText}>
                {isLive ? "Live режим: Включен" : "Live режим: Выключен"}
              </div>
            </button>
          )}
        </div>
      </div>
      <div className={Style.content} data-theme={localTheme}>
        <div className={Style.resizableContainer}>
          <AnimatePresence mode="wait">
            {copied && (
              <motion.div
                className={Style.copied}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <motion.div
                  className={Style.copiedIcon}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaCheck />
                </motion.div>
                <motion.div
                  className={Style.copiedText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  Код скопирован!
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={Style.resizableContent}
            style={{ width: `${widths.codeWidth}%` }}
          >
            {editable ? (
              <textarea
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  resize: "none",
                  fontSize: "14px",
                  padding: "10px",
                  boxSizing: 'border-box',
                  fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
                }}
              />
            ) : (
              <SyntaxHighlighter
                language={lang}
                style={localTheme === "light" ? atomOneLight : atomOneDark}
                showLineNumbers={showLineNumbers}
                wrapLines={false}
                lineNumberStyle={{
                  opacity: 0.5,
                }}
                wrapLongLines={true}
                codeTagProps={{ style: { fontSize: "14px" } }}
                customStyle={{ width: "100%", padding: 0 }}
              >
                {currentCode}
              </SyntaxHighlighter>
            )}
          </div>
          <AnimatePresence mode="wait">
            {isLive &&
              (lang === "html" || lang === "javascript" || lang === "css") && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.85,
                      ease: "easeInOut",
                    }}
                    className={Style.resizer}
                    onMouseDown={handleMouseDown}
                  ></motion.div>
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "100%" }}
                    transition={{
                      duration: 0.85,
                      ease: "easeInOut",
                    }}
                    className={Style.resizablePreview}
                    style={{ width: `${widths.previewWidth}%` }}
                  >
                    {renderIframe()}
                  </motion.div>
                </>
              )}
          </AnimatePresence>
        </div>
        <div className={Style.footer}>
          <div className={Style.footerLeft}>
            <div className={Style.footerItem}>
              <div className={Style.footerIcon}>
                <div className={Style.languageIcon}>{iconLang}</div>
              </div>
              <div className={Style.footerText}>{lang}</div>
            </div>

            <div className={Style.footerItem}>
              <div className={Style.footerIcon}>
                <div className={Style.languageIcon}>
                  <LuBinary />
                </div>
              </div>
              <div className={Style.footerText}>Кодировка: {encoding}</div>
            </div>
          </div>
          <div className={Style.footerRight}>
            <div className={Style.footerItem}>
              <div className={Style.footerIcon}>
                <div className={Style.languageIcon}>
                  <MdOutlineLineStyle />
                </div>
              </div>
              <div className={Style.footerText}>Строк: {lines}</div>
            </div>

            <div className={Style.footerItem}>
              <div className={Style.footerIcon}>
                <div className={Style.languageIcon}>
                  <TbCircleLetterAFilled />
                </div>
              </div>
              <div className={Style.footerText}>Символов: {chars}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Code;
