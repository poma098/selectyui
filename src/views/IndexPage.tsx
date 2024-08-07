import Accordion from "../components/Accordion";
import { AccordionItem } from "../components/Accordion/props.interface";
import Style from "../views/style.module.css";
import { FaArrowAltCircleRight, FaCheck, FaInfoCircle, FaRegFile, FaRegUserCircle, FaTimes } from "react-icons/fa";
import ThemeSwitcher from "../components/ThemeSwitcher";
import FontSwitcher from "../components/FontSwitcher";
import LangSwitcher from "../components/LangSwitcher";
import Code from "../components/Code";
import { useShortcuts, useUITheme } from "context/UIContext";
import DropDownMenu from "../components/DropDownMenu";
import { DropDownMenuItem } from "../components/DropDownMenu/props.interface";
import { useEffect, useRef, useState } from "react";
import { HiOutlineInformationCircle, HiTerminal } from "react-icons/hi";
import Select from "../components/Select";
import { definitionCoords } from "../utils/definitionCoords";
import {
  OptionGroupProps,
  OptionProps,
  Checked,
} from "../components/Select/props.interface";
import ScrollingText from "../components/ScrollingText";
import ShortcutComponent from "../components/Shortcuts/shortcut";
import Menubar from "../components/Menubar";
import { MenuBarItem } from "../components/Menubar/props.interface";
import { MdOutlineEditNote } from "react-icons/md";
import { RiCalendarView } from "react-icons/ri";
import { PiAddressBookTabsBold } from "react-icons/pi";
import { HexColor, RgbaColor, RgbaString, RgbString } from "utils/color/props.interface";
import { hexToRgba, rgbaToHex, rgbStringToRgbaColor } from "utils/color/convert";
import { checkContrastBlindness } from "utils/color/check";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { AlertTemplate } from "../components/Alert/props.interface";
import Tooltip from "../components/Tooltip";
import TooltipIcon from "../components/TooltipIcon";
import ContainerBlur from "../components/ContainerBlur";
import Switch from "../components/Switch";
import Checkbox from "../components/Checkbox";
import Calendar from "../components/Calendar";

function IndexPage() {
  const { realTheme } = useUITheme();
  const { registerShortcut, unregisterShortcut, shortcuts } = useShortcuts();

  const shortcutCtrlD = {
    key: ["ctrl+d"],
    callback: () => {
      console.log("hello world");
    },
    name: "Open DropDownMenu",
    icon: "🔽",
    description: "Opens the dropdown menu",
  };

  useEffect(() => {
    registerShortcut(shortcutCtrlD);
    return () => {
      unregisterShortcut(shortcutCtrlD.key);
    };
  }, []);

  const listAccordion: AccordionItem[] = [
    {
      marker: "🔥",
      icon: <FaArrowAltCircleRight />,
      title: "Accordion 1",
      content: (
        <div style={{ opacity: 0.75, fontSize: 14, fontWeight: 400 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          corporis itaque necessitatibus exercitationem eos? In quaerat
          obcaecati incidunt est eveniet, natus tempora fuga ad ducimus pariatur
          cumque consequuntur dignissimos perspiciatis.
        </div>
      ),
    },
    {
      marker: "🔥",
      icon: <FaArrowAltCircleRight />,
      title: <div>123</div>,
      content: (
        <div style={{ opacity: 0.75, fontSize: 14, fontWeight: 400 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          corporis itaque necessitatibus exercitationem eos? In quaerat
          obcaecati incidunt est eveniet, natus tempora fuga ad ducimus pariatur
          cumque consequuntur dignissimos perspiciatis.
        </div>
      ),
    },
  ];

  const listDropDownMenu: DropDownMenuItem[] = [
    {
      label: "DropDownMenu 1 with shortcut key test test",
      description:
        "DropDownMenu 1 description description description description",
      icon: "🔥",
      callback: shortcutCtrlD.callback,
      shortcutKey: shortcutCtrlD.key,
    },
    {
      devider: true,
    },
    {
      label: "DropDownMenu 3",
      icon: <HiTerminal />,
      callback: shortcutCtrlD.callback,
      shortcutKey: shortcutCtrlD.key,
    },
    {
      label: "DropDownMenu 4",
      icon: <FaArrowAltCircleRight />,
      description: "Этот элемент будет скрыт, если указать hidden: true",
      hidden: false,
      list: [
        {
          label: "DropDownMenu 3",
          icon: <FaArrowAltCircleRight />,
          list: [
            {
              label: "DropDownMenu 3",
              icon: <FaArrowAltCircleRight />,
              callback: shortcutCtrlD.callback,
              shortcutKey: shortcutCtrlD.key,
            },
          ],
        },
      ],
    },
    {
      label: "DropDownMenu 5",
      icon: <FaArrowAltCircleRight />,
      description: "Этот элемент отключен",
      disabled: true,
      list: [
        {
          label: "DropDownMenu 3",
          icon: <FaArrowAltCircleRight />,
          callback: () => {},
        },
      ],
    },
  ];
  const [visibleDropDownMenu, setVisibleDropDownMenu] = useState(false);
  const refDropDownMenuButton = useRef<HTMLButtonElement>(null);

  const handleClickDropDownMenu = (
    item: HTMLElement,
    parent: HTMLElement,
    e: React.MouseEvent | undefined
  ) => {
    return definitionCoords(item, parent, "topOrBottom");
  };

  const options: OptionProps[] = [
    {
      id: 1,
      label: (
        <div>
          <span>test123</span>
          <TooltipIcon
            style={{ marginLeft: 5, fontSize: 12, fontWeight: 400 }}
            tooltipProps={{
              body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur laborum a laudantium, explicabo, libero, nesciunt dolore odit quis quos assumenda dolores perspiciatis quibusdam maiores.",
              icon: <FaArrowAltCircleRight />,
              theme: "dark",
              title: "Tooltip title",
              buttons: [
                {
                  label: "Отмена",
                  backgroundColor: "#fff",
                  borderColor: "#00000000",
                  color: "auto",
                  size: "small",
                  onClick: (e: React.MouseEvent) => {
                    console.log("Click", e);
                  },
                },
                {
                  label: "Продолжить",
                  backgroundColor: "#fff",
                  color: "auto",
                  size: "small",
                  icon: <FaArrowAltCircleRight />,
                  onClick: (e: React.MouseEvent) => {
                    console.log("Click", e);
                  },
                },
              ],
            }}
          />
        </div>
      ),
      description:
        "Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet Option 1 description lorem ipsum dolor sit amet",
      icon: "😎",
      disabled: false,
      hidden: false,
    },
    {
      id: 2,
      label: "Очень длинный текст в названии опции этого элемента",
      description: "Option 2 description",
      keywords: ["keyword 1", "keyword 2"],
      disabled: false,
      hidden: false,
    },
    {
      id: 3,
      label: "Option 3",
      description: "Option 3 description",
      icon: <FaArrowAltCircleRight />,
      disabled: true,
      hidden: false,
    },
    {
      id: 4,
      label: "Option 4",
      description: "Option 4 description",
      disabled: false,
      hidden: true,
    },
  ];
  const optionsGroup: OptionGroupProps[] = [
    {
      groupLabel: "Group 1",
      icon: <FaArrowAltCircleRight />,
      options: [
        {
          id: 1,
          label: (
            <div>
              <div>test123</div>
            </div>
          ),
          description: "Option 1 description",
          icon: "😎",
          disabled: false,
          hidden: false,
        },
        {
          id: 2,
          label: "Option 2",
          disabled: false,
          hidden: false,
        },
        {
          id: 3,
          label: "Option 3",
          description: "Option 3 description",
          disabled: true,
          hidden: false,
        },
        {
          id: 4,
          label: "Option 4",
          description: "Option 4 description",
          disabled: false,
          hidden: true,
        },
      ],
    },
    {
      groupLabel: "Group 2",
      icon: "🔥",
      options: [
        {
          id: 5,
          label: "Option 1",
          description: "Option 1 description",
          icon: "😎",
          disabled: false,
          hidden: false,
        },
        {
          id: 6,
          label: "Option 2",
          description: "Option 2 description",
          disabled: false,
          hidden: false,
        },
        {
          id: 7,
          label: "Option 3",
          description: "Option 3 description",
          disabled: true,
          hidden: false,
        },
        {
          id: 8,
          label: "Option 4",
          description: "Option 4 description",
          disabled: false,
          hidden: true,
        },
      ],
    },
    {
      groupLabel: "Group 3",
      icon: "😎",
      options: [
        {
          id: 9,
          label: "Option 1",
          description: "Option 1 description",
          icon: <FaArrowAltCircleRight />,
          disabled: false,
          hidden: false,
        },
        {
          id: 10,
          label: "Option 2",
          description: "Option 2 description",
          disabled: false,
          hidden: false,
        },
        {
          id: 11,
          label: "Option 3",
          description: "Option 3 description",
          disabled: true,
          hidden: false,
        },
        {
          id: 12,
          label: "Option 4",
          description: "Option 4 description",
          disabled: false,
          hidden: true,
        },
      ],
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState<Checked[]>([1]);
  const [selectedOptionsGroup, setSelectedOptionsGroup] = useState<Checked[]>([
    1, 6,
  ]);

  const alertTemplates: OptionProps[] = [
    {
      id: "default",
      label: "Not template",
    },
    {
      id: "success",
      label: "Success",
    },
    {
      id: "success-light",
      label: "Success light",
    },
    {
      id: "success-extra-light",
      label: "Success extra light",
    },
    {
      id: "error",
      label: "Error",
    },
    {
      id: "error-light",
      label: "Error light",
    },
    {
      id: "error-extra-light",
      label: "Error extra light",
    },
    {
      id: "info",
      label: "Info",
    },
    {
      id: "info-light",
      label: "Info light",
    },
    {
      id: "info-extra-light",
      label: "Info extra light",
    },
    {
      id: "warning",
      label: "Warning",
    },
    {
      id: "warning-light",
      label: "Warning light",
    },
    {
      id: "warning-extra-light",
      label: "Warning extra light",
    },
  ];
  const [alertSelectedTemplate, setAlertSelectedTemplate] = useState<Checked[]>(
    ["success-light"]
  );

  const MenuBarItems: MenuBarItem[] = [
    {
      icon: <FaRegUserCircle />,
      label: "Profile",
      // description: "Description 1",
      // list: listDropDownMenu,
      // disabled: true,
      callback: (item: MenuBarItem, index: number) => {
        console.log("Profile", item, index);
      },
    },
    {
      icon: <FaRegFile />,
      label: "File",
      // description: "Description 1",
      list: listDropDownMenu,
    },
    {
      icon: <MdOutlineEditNote />,
      label: "Edit",
      // description: "Description 1",
      list: listDropDownMenu,
    },
    {
      icon: <RiCalendarView />,
      label: "View",
      // description: "Description 2",
      // disabled: true,
      list: listDropDownMenu,
    },
    {
      icon: <PiAddressBookTabsBold />,
      label: "Tabs",
      // description: "Description 3",
      // hidden: true,
      disabled: true,
      list: listDropDownMenu,
    },
  ];

  const refDivTooltip = useRef(null);
  const refDivTooltip2 = useRef(null);
  const refDivTooltip3 = useRef(null);

  const [checked, setChecked] = useState(false);

  return (
    <div className={Style.main}>
      <ContainerBlur
        paddingY={20}
        paddingX={8}
        color={realTheme === "dark" ? "#303036" : "#fff"}
        style={{
          position: "sticky",
          top: 0,
          marginLeft: -8,
          width: "100vw",
          zIndex: 999999,
        }}
        styleContent={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1 className={Style.mainTitle}>UI/UX kit for React</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div>
            <h5 style={{ margin: "0px", marginBottom: "5px" }}>
              Выберите тему:
            </h5>
            <ThemeSwitcher
              placeholder="Выберите тему"
              searchPlaceholder="Поиск по темам"
              maxHeight={200}
              searchNotFoundTitle="Тема не найдена"
              searchNotFoundDescription="Попробуйте изменить запрос!"
              styleSelect={{ width: "250px" }}
            />
          </div>
          <div>
            <h5 style={{ margin: "0px", marginBottom: "5px" }}>
              Выберите шрифт:
            </h5>
            <FontSwitcher
              placeholder="Выберите шрифт"
              searchPlaceholder="Поиск по шрифтам"
              maxHeight={200}
              searchNotFoundTitle="Шрифт не найден"
              searchNotFoundDescription="Попробуйте изменить запрос!"
              styleSelect={{ width: "250px" }}
            />
          </div>
          <div>
            <h5 style={{ margin: "0px", marginBottom: "5px" }}>
              Выберите язык:
            </h5>
            <LangSwitcher
              placeholder="Выберите язык"
              searchPlaceholder="Поиск по языкам"
              maxHeight={200}
              searchNotFoundTitle="Язык не найден"
              searchNotFoundDescription="Попробуйте изменить запрос!"
              styleSelect={{ width: "250px" }}
            />
          </div>
        </div>
      </ContainerBlur>
      <br />
      <br />

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Calendar</h2>
        <div className={Style.content}>
          <Calendar size="small" />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Checkbox</h2>
        <div
          className={Style.content}
          style={{ gap: 15, display: "flex", flexDirection: "column" }}
        >
          <Checkbox
            checked={checked}
            onChange={setChecked}
            size="xsmall"
            label={checked ? "On" : "Off"}
          />
          <Checkbox
            checked={checked}
            onChange={setChecked}
            size="small"
            label={checked ? "On" : "Off"}
          />
          <Checkbox
            checked={checked}
            onChange={setChecked}
            // size="medium"
            label={checked ? "On" : "Off"}
            // checkedColor="#31cd38"
            // uncheckedColor="#f4511e"
            // checkedIcon={<FaCheck />}
            // uncheckedIcon={<FaTimes />}
            // checkedIconColor="#fff"
            // uncheckedIconColor="#fff"
            // checkedIconOpacity={1}
            // uncheckedIconOpacity={0.5}
            // tooltip={true}
          />
          <Checkbox
            checked={checked}
            onChange={setChecked}
            size="large"
            label={checked ? "On" : "Off"}
          />
          <Checkbox
            checked={checked}
            onChange={setChecked}
            size="xlarge"
            label={checked ? "On" : "Off"}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Switch</h2>
        <div
          className={Style.content}
          style={{ gap: 15, display: "flex", flexDirection: "column" }}
        >
          <Switch
            checked={checked}
            onChange={setChecked}
            size="xsmall"
            label={checked ? "On" : "Off"}
          />
          <Switch
            checked={checked}
            onChange={setChecked}
            size="small"
            label={checked ? "On" : "Off"}
          />
          <Switch
            checked={checked}
            onChange={setChecked}
            label={checked ? "On" : "Off"}
            // tooltip={true}
            // tooltipProps={{
            //   theme: "dark",
            //   title: checked ? "On" : "Off",
            // }}
            // sticker={true}
            // loading={false}
            // uncheckedColor="#0000001c"
            // checkedColor="#000"
            // checkedIcon={<FaCheck />}
            // uncheckedIcon={<FaTimes />}
            // checkedIconColor="#000"
            // uncheckedIconColor="#000"
            // checkedIconOpacity={0.5}
            // uncheckedIconOpacity={0.5}
            // inverted={true}
          />
          <Switch
            checked={checked}
            onChange={setChecked}
            size="large"
            label={checked ? "On" : "Off"}
          />
          <Switch
            checked={checked}
            onChange={setChecked}
            size="xlarge"
            label={checked ? "On" : "Off"}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>ScrollingText</h2>
        <div
          className={Style.content}
          style={{ width: "calc(100% + 16px)", marginLeft: "-8px" }}
        >
          <ScrollingText
            text="Распродажа!      🎉      Скидки до 70%!      🚀      Распродажа!      🎉      Скидки до 70%!      🚀      Распродажа!      🎉      Скидки до 70%!      🚀      Распродажа!      🎉      Скидки до 70%!      🚀      Распродажа!      🎉      Скидки до 70%!      🚀      Распродажа!      🎉      Скидки до 70%!      🚀"
            speed={1200}
            gap={25}
            autoDetect={false}
            direction="ltr"
            style={{
              backgroundColor: "#FFC107",
              color: "#303036",
              fontWeight: "700",
              fontSize: "25px",
            }}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>TooltipIcon</h2>
        <div
          className={Style.content}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <TooltipIcon
            tooltipProps={{
              body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur laborum a laudantium, explicabo, libero, nesciunt dolore odit quis quos assumenda dolores perspiciatis quibusdam maiores.",
              icon: <FaArrowAltCircleRight />,
              // children: "Tooltip text",
              title: "Tooltip title",
              buttons: [
                {
                  label: "Отмена",
                  backgroundColor: "#fff",
                  borderColor: "#00000000",
                  color: "auto",
                  size: "small",
                  onClick: (e: React.MouseEvent) => {
                    console.log("Click", e);
                  },
                },
                {
                  label: "Продолжить",
                  backgroundColor: "#fff",
                  color: "auto",
                  size: "small",
                  icon: <FaArrowAltCircleRight />,
                  onClick: (e: React.MouseEvent) => {
                    console.log("Click", e);
                  },
                },
              ],
            }}
          />
          <TooltipIcon
            style={{ color: "#1A75FF" }}
            tooltipProps={{
              icon: <FaArrowAltCircleRight />,
              title: "Tooltip title",
            }}
          />
          <TooltipIcon
            tooltipProps={{
              title: "Tooltip title",
            }}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Tooltip</h2>
        <div
          className={Style.content}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            ref={refDivTooltip}
            style={{
              backgroundColor: "#FFC107",
              padding: "5px",
              textAlign: "center",
            }}
          >
            Всегда темная тема
          </div>
          <div
            ref={refDivTooltip2}
            style={{
              backgroundColor: "#FFC107",
              padding: "5px",
              textAlign: "center",
            }}
          >
            Кастомная подсказка
          </div>
          <div
            ref={refDivTooltip3}
            style={{
              backgroundColor: "#FFC107",
              padding: "5px",
              textAlign: "center",
            }}
          >
            Автоматическая тема
          </div>
          <Tooltip
            observeElement={refDivTooltip}
            // trigger="click"
            theme="dark"
            // visible={false}
            // triangleColor="#fff"
            // triangeVisible={false}
            position="auto"
            body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            consequuntur laborum a laudantium, explicabo, libero, nesciunt
            dolore odit quis quos assumenda dolores perspiciatis quibusdam
            maiores."
            icon={<FaArrowAltCircleRight />}
            title="Tooltip title"
            buttons={[
              {
                label: "Отмена",
                backgroundColor: "#fff",
                borderColor: "#00000000",
                color: "auto",
                size: "small",
                onClick: (e: React.MouseEvent) => {
                  console.log("Click", e);
                },
              },
              {
                label: "Продолжить",
                backgroundColor: "#fff",
                color: "auto",
                size: "small",
                icon: <FaArrowAltCircleRight />,
                onClick: (e: React.MouseEvent) => {
                  console.log("Click", e);
                },
              },
            ]}
          ></Tooltip>
          <Tooltip
            observeElement={refDivTooltip2}
            // trigger="click"
            // visible={true}
            triangleColor="#5190ff"
            // triangeVisible={false}
            position="auto"
          >
            <Alert
              icon={<FaInfoCircle />}
              title="This is smooth dense alert"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            consequuntur laborum a laudantium, explicabo, libero, nesciunt
            dolore odit quis quos assumenda dolores perspiciatis quibusdam
            maiores."
              template={"info"}
              buttons={[
                {
                  label: "Отмена",
                  backgroundColor: "#8d8d8d3d",
                  borderColor: "#00000000",
                  color: "auto",
                  onClick: (e: React.MouseEvent) => {
                    console.log("Click", e);
                  },
                },
                {
                  label: "Продолжить",
                  backgroundColor: "#000",
                  color: "auto",
                  icon: <FaArrowAltCircleRight />,
                  onClick: (e: React.MouseEvent) => {
                    console.log("Click", e);
                  },
                },
              ]}
            />
          </Tooltip>
          <Tooltip
            observeElement={refDivTooltip3}
            // trigger="click"
            theme="automatic"
            // visible={false}
            // triangleColor="#fff"
            // triangeVisible={false}
            position="auto"
            body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            consequuntur laborum a laudantium, explicabo, libero, nesciunt
            dolore odit quis quos assumenda dolores perspiciatis quibusdam
            maiores."
            icon={<FaArrowAltCircleRight />}
            title="Tooltip title"
            buttons={[
              {
                label: "Отмена",
                backgroundColor: "#fff",
                borderColor: "#00000000",
                color: "auto",
                size: "small",
                onClick: (e: React.MouseEvent) => {
                  console.log("Click", e);
                },
              },
              {
                label: "Продолжить",
                backgroundColor: "#fff",
                color: "auto",
                size: "small",
                icon: <FaArrowAltCircleRight />,
                onClick: (e: React.MouseEvent) => {
                  console.log("Click", e);
                },
              },
            ]}
          ></Tooltip>
        </div>
      </div>
      {/* #endregion */}

      {/* #region Accordion */}
      <div className={Style.container}>
        <h2 className={Style.title}>Alert</h2>
        <div
          className={Style.content}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{ fontWeight: "700", fontSize: "14px" }}>
              Выберите вариант отображения
            </div>
            <Select
              options={alertTemplates}
              hiddenOutsideClick={true}
              onChange={setAlertSelectedTemplate}
              placeholder="Выберите вариант отображения"
              value={alertSelectedTemplate}
              search={true}
              searchPlaceholder="Поиск по вариантам"
              searchNotFoundTitle="Ничего не найдено"
              searchNotFoundDescription="Попробуйте изменить запрос!"
              visibleReset={false}
              limit={1}
            />
          </div>
          <Alert
            icon={<FaInfoCircle />}
            title="This is smooth dense alert"
            body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            consequuntur laborum a laudantium, explicabo, libero, nesciunt
            dolore odit quis quos assumenda dolores perspiciatis quibusdam
            maiores."
            template={
              alertSelectedTemplate
                ? (alertSelectedTemplate[0] as AlertTemplate)
                : "default"
            }
            buttons={[
              {
                label: "Отмена",
                backgroundColor: "#8d8d8d3d",
                borderColor: "#00000000",
                color: "auto",
                onClick: (e: React.MouseEvent) => {
                  console.log("Click", e);
                },
              },
              {
                label: "Продолжить",
                backgroundColor: "#000",
                color: "auto",
                icon: <FaArrowAltCircleRight />,
                onClick: (e: React.MouseEvent) => {
                  console.log("Click", e);
                },
              },
            ]}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Button</h2>
        <div
          className={Style.content}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "6px",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            label="Button"
            backgroundColor="#000"
            color="auto"
            icon={<FaArrowAltCircleRight />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="medium"
            label="Button"
            backgroundColor="#000"
            color="auto"
            icon={<FaArrowAltCircleRight />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="large"
            label="Button"
            backgroundColor="#000"
            color="auto"
            icon={<FaArrowAltCircleRight />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="small"
            label="Button"
            icon={<FaArrowAltCircleRight />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="medium"
            label="Button"
            icon={<FaArrowAltCircleRight />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="large"
            label="Button"
            icon={<FaArrowAltCircleRight />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="small"
            icon={<HiOutlineInformationCircle />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="medium"
            icon={<HiOutlineInformationCircle />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="large"
            icon={<HiOutlineInformationCircle />}
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="small"
            label="Text disabled button"
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
            disabled={true}
            position="center"
            style={{
              width: "200px",
            }}
          />
          <Button
            size="medium"
            label="Text button"
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="large"
            label="Text button"
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          />
          <Button
            size="small"
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          >
            Custom child
          </Button>
          <Button
            size="medium"
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          >
            Custom child
          </Button>
          <Button
            size="large"
            onClick={(e: React.MouseEvent) => {
              console.log("Click", e);
            }}
          >
            Custom child
          </Button>
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Menubar</h2>
        <div className={Style.content}>
          <Menubar
            items={MenuBarItems}
            trigger="hover" // click
            style={{
              width: "fit-content",
              // whiteSpace: "nowrap",
            }}
            propsDropDownMenu={
              {
                // formatText: "trim",
                // speedScrolling: 1000,
                // style: {
                //   whiteSpace: "normal",
                // }
              }
            }
            // className={Style.test}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Shortcut</h2>
        <div className={Style.content} style={{ paddingBottom: "3px" }}>
          <ShortcutComponent shortcutKey="Ctrl+Alt+C" size="small" />
          <br />
          <ShortcutComponent shortcutKey="Ctrl+Alt+C" size="medium" />
          <br />
          <ShortcutComponent shortcutKey="Ctrl+Alt+C" size="large" />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>Select</h2>
        <div
          className={Style.content}
          style={{
            width: "700px",
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "calc(50% - 5px) calc(50% - 5px)",
          }}
        >
          <Select
            options={optionsGroup}
            hiddenOutsideClick={true}
            onChange={setSelectedOptionsGroup}
            placeholder="Выберите опцию"
            value={selectedOptionsGroup}
            limit={5}
            search={true}
            searchPlaceholder="Поиск по значениям"
            searchNotFoundTitle="Ничего не найдено"
            searchNotFoundDescription="Попробуйте изменить запрос!"
            autoClose={false}
            maxHeight={500}
            formatText="scrolling"
            speedScrolling={1000}
            // disabled={true}
            // styleList={{ maxHeight: "500px" }}
            // styleSelect={{ width: "50%" }}
          />
          <Select
            options={options}
            value={selectedOptions}
            hiddenOutsideClick={true}
            onChange={setSelectedOptions}
            placeholder="Выберите опцию"
            search={true}
            searchPlaceholder="Поиск по значениям"
            autoClose={true}
            maxHeight={200}
            formatText="trim"
            speedScrolling={1000}
            // styleSelect={{ width: "50%" }}
            // disabled={true}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region DropDownMenu */}
      <div className={Style.container}>
        <h2 className={Style.title}>DropDownMenu</h2>
        <div className={Style.content}>
          <Button
            size="small"
            label="Наведи на меня!"
            backgroundColor="#000"
            color="auto"
            icon={<FaInfoCircle />}
            style={{
              fontWeight: 900,
            }}
            ref={refDropDownMenuButton}
          />
          <DropDownMenu
            list={listDropDownMenu}
            visible={visibleDropDownMenu}
            setVisible={setVisibleDropDownMenu}
            observeElement={refDropDownMenuButton}
            // openCallback={handleClickDropDownMenu}
            // openPosition={"topOrBottom"}
            trigger="hover"
            // xStart={50}
            // yStart={50}
            hiddenOutsideClick={true}
            formatText="scrolling"
            speedScrolling={1000}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region Accordion */}
      <div className={Style.container}>
        <h2 className={Style.title}>Accordion</h2>
        <div className={Style.content} style={{ width: "500px" }}>
          <Accordion
            list={listAccordion}
            className={Style.test}
            style={{
              border: "1px solid #7d7d7d24",
              borderRadius: "10px",
              padding: "10px",
            }}
            format={"marker"}
            type={"single"}
          />
        </div>
      </div>
      {/* #endregion */}

      {/* #region Код */}
      <div className={Style.container}>
        <h2 className={Style.title}>Code</h2>
        <div className={Style.content}>
          <Code
            theme={realTheme === "light" ? "light" : "dark"}
            // showLineNumbers={false}
            // language={"bash"}
            isLiveVisible={true}
            editable={false}
            title={"Пример кода"}
            code={`#!/bin/bash

# Показываем текущие переменные окружения
printenv

# Создаем новый каталог
mkdir new_directory

# Переходим в новый каталог
cd new_directory

# Создаем новый файл и записываем в него текст
echo "Hello, World!" > hello.txt

# Копируем файл в родительский каталог
cp hello.txt ..

# Переходим обратно в родительский каталог
cd ..

# Смотрим содержимое нового файла
cat new_directory/hello.txt

# Печатаем список файлов в текущей директории
ls -l

# Удаляем временные файлы
rm new_directory/hello.txt
rmdir new_directory

# Обновляем пакетный менеджер (для Debian/Ubuntu систем)
sudo apt update`}
          />
        </div>
      </div>
      {/* #endregion */}
    </div>
  );
}

export default IndexPage;
