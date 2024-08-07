import Style from "./style.module.css"
import { AlertButtonsTemplates, AlertProps, AlertTemplate, ButtonPosition, FlexJustifyContent } from "./props.interface"
import Button from "../../components/Button";
import { forwardRef, useEffect, useState } from "react";
import { HexColor } from "../../utils/color/props.interface";
import { alertPositionConvert, alertGetColorForTemplate } from "./utils";
import { ButtonProps } from "../../components/Button/props.interface";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { title, body, icon, children, buttons, style, className, buttonPosition = "right", template = "default" },
    ref
  ) => {

    const [btnPos, setBtnPos] = useState<FlexJustifyContent>(
      alertPositionConvert(buttonPosition)
    );
    const [templateButtons, setTemplateButtons] =
      useState<ButtonProps[]>(buttons || []);

    const [iconStyle, setIconStyle] = useState<HexColor>();
    const [backgroundColorStyle, setBackgroundColorStyle] = useState<HexColor>();
    const [borderStyle, setBorderStyle] = useState<HexColor>();
    const [textStyle, setTextStyle] = useState<HexColor>();

    useEffect(() => {
      if (template !== "default") {
        const colors = alertGetColorForTemplate(template);
        
        if (buttons) {
          const btns: ButtonProps[] = [];

          for (let i = 0; i < buttons.length; i++) {
            let btn = { ...buttons[i] };
            if (i === buttons.length - 1) {
              btn.backgroundColor = colors.btn2.backgroundColor;
              btn.color = colors.btn2.color;
              btn.borderColor = colors.btn2.borderColor;
            } else {
              btn.backgroundColor = colors.btn1.backgroundColor;
              btn.color = colors.btn1.color;
              btn.borderColor = colors.btn1.borderColor;
            }
            btns.push(btn);
          }

          setTemplateButtons(btns);
        }        

        setIconStyle(colors.icon.color);
        setBackgroundColorStyle(colors.background.backgroundColor);
        setBorderStyle(colors.background.borderColor);
        setTextStyle(colors.background.color);
        
      } else {
        setTemplateButtons(buttons || []);
        setIconStyle(undefined);
        setBackgroundColorStyle(undefined);
        setBorderStyle(undefined);
        setTextStyle(undefined);
      }

    }, [template, buttons]);
    

    return (
      <div
        className={[Style.container, className].join(" ")}
        ref={ref}
        style={{
          ...style,
          backgroundColor: backgroundColorStyle,
          color: textStyle,
          borderColor: borderStyle,
        }}
        data-template={template}
      >
        <div
          className={Style.content}
          style={{
            color: textStyle,
          }}
        >
          {!children && (
            <>
              {(icon || title) && <div className={Style.header}>
                {icon && (
                  <div className={Style.icon} style={{ color: iconStyle }}>
                    {icon}
                  </div>
                )}
                {title && (
                  <div
                    className={Style.title}
                    style={{
                      color: textStyle,
                    }}
                  >
                    {title}
                  </div>
                )}
              </div>}
              {body && (
                <div
                  className={Style.body}
                  style={{
                    color: textStyle,
                  }}
                >
                  {body}
                </div>
              )}
            </>
          )}
          {children}
        </div>
        {buttons && (
          <div className={Style.btns} style={{ justifyContent: btnPos }}>
            {templateButtons.map((b, i) => {
              if (b.children) {
                return (
                  <Button {...b} key={i}>
                    {b.children}
                  </Button>
                );
              } else {
                return <Button {...b} key={i} />;
              }
            })}
          </div>
        )}
      </div>
    );
  }
);

export default Alert