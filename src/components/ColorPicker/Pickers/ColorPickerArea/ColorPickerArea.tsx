import React from "react";
import cn from "classnames";
import Style from "./style.module.css";
import { ColorPreview } from "../../ColorPreview/ColorPreview";
import {ColorHueRotatePicker} from "../ColorHueRotatePicker/ColorHueRotatePicker";
import {ColorOpacityPicker} from "../ColorOpacityPicker/ColorOpacityPicker";
import {ColorSaturationAndLightnessPicker} from "../ColorSaturationAndLightnessPicker/ColorSaturationAndLightnessPicker";
import { ColorPickerAreaProps } from "../../props.interface";
import { DEFAULT_STYLE } from "../../DEFAULT_STYLE";
import { isEyeDropperSupported } from "../../utils/isEyeDropperSupported";
import { ColorEyeDropper } from "../../ColorEyeDropper/ColorEyeDropper";
import { hexToHsla, hslaToHex, hslaToRgba, hslToHex, rgbaToHsla } from "utils/color/convert";
import { HexColor } from "utils/color/props.interface";
import { Stepper } from "components/Stepper/Stepper";

const ColorPickerArea = React.forwardRef((
  {
    color,
    onChange,
    radius = 6,
    className,
    style,
    width = 300,
    modeCopy = true,
    modeAlpha = true,
    disabled = false,
  }: ColorPickerAreaProps,
  ref?: React.Ref<HTMLDivElement>
) => {
  return (
    <div className={cn(Style.container, className)} style={style} ref={ref}>
      <ColorSaturationAndLightnessPicker
        hsla={color}
        onChange={
          onChange
            ? (h) => {
                onChange((prev) => {
                  return {
                    ...prev,
                    s: h.s,
                    l: h.l,
                  };
                });
              }
            : undefined
        }
        width={width}
        height={180}
        radius={radius}
        pointInnerSize={7}
        pointOuterSize={11}
        pointOuterColor="#fff"
        pointRadius={50}
        disabled={disabled}
        style={DEFAULT_STYLE}
      />
      <div className={Style.pickers}>
        <div className={Style.container}>
          <ColorHueRotatePicker
            hsla={color}
            onChange={
              onChange
                ? (h) => {
                    onChange((prev) => {
                      return {
                        ...prev,
                        h: h.h,
                      };
                    });
                  }
                : undefined
            }
            radius={radius * 2}
            pointInnerSize={7}
            pointOuterSize={11}
            pointOuterColor="#fff"
            pointRadius={50}
            width={width - 38 - 10}
            height={14}
            disabled={disabled}
            style={DEFAULT_STYLE}
          />
          {modeAlpha && (
            <ColorOpacityPicker
              hsla={color}
              onChange={
                onChange
                  ? (h) => {
                      onChange((prev) => {
                        return {
                          ...prev,
                          a: h.a,
                        };
                      });
                    }
                  : undefined
              }
              radius={radius * 2}
              pointInnerSize={7}
              pointOuterSize={11}
              pointOuterColor="#fff"
              pointRadius={50}
              width={width - 38 - 10}
              height={14}
              style={DEFAULT_STYLE}
              gridSize={4.5}
              disabled={disabled}
            />
          )}
        </div>
        <div className={Style.container}>
          <ColorPreview
            hsla={color}
            radius={radius}
            width={38}
            height={38}
            style={DEFAULT_STYLE}
            gridSize={4.5}
            modeCopy={modeCopy}
            modeAlpha={modeAlpha}
          />
        </div>
      </div>
      <div className={Style.containerValue}>
        {isEyeDropperSupported() && onChange && (
          <ColorEyeDropper
            onChange={
              onChange
                ? (color) => {
                    onChange(hexToHsla(color.toUpperCase() as HexColor));
                  }
                : undefined
            }
            disabled={disabled}
            height={30}
            width={30}
            size={14}
            radius={radius > 0 ? 5 : 0}
            style={{
              flexShrink: 0,
              lineHeight: 0,
            }}
          />
        )}
        {/* TODO: Тут будут инпуты для ввода/вывода цвета */}
        <div
          style={{
            width: "100%",
            padding: "5px 10px",
            borderRadius: Math.max(radius, 0),
            backgroundColor: "rgba(0, 0, 0, 0.025)",
            ...DEFAULT_STYLE,
            height: 30,
            boxSizing: "border-box",
            fontSize: "14px",
          }}
        >
          {modeAlpha
            ? hslaToHex(color)
            : hslToHex({
                ...color,
              })}
        </div>
        {modeAlpha && (
          <Stepper
            value={rgbaToHsla(hslaToRgba(color)).a * 100}
            min={0}
            max={100}
            step={1}
            size="xs"
            unit="%"
            accuracy={0}
            unitPosition="right"
            disabled={disabled}
            onChange={
              onChange
                ? (value) => {
                    onChange((prev) => {
                      return {
                        ...prev,
                        a: value / 100,
                      };
                    });
                  }
                : undefined
            }
            radius={radius}
            bar={false}
            className={Style.alphaChange}
            buttonStyle={{
              width: 17,
            }}
          />
        )}
      </div>
    </div>
  );
});

export { ColorPickerArea };
