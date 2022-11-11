import React from "react";
import DropDownButton from "../DropdownButton";
import Tooltip from "../Tooltip";
import { isTablet } from "react-device-detect";

class EditorToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      isSymbolOpen: false,
    };
  }

  onMouseDown = (event) => {
    event.persist();
    event.preventDefault();
    return false;
  };

  onClickFontSize = (e, dropdownId) => {
    this.toolTipHide(e);
    this.setState({
      opened: !this.state.opened,
    });

    if (!this.state.opened) {
      setTimeout(() => {
        const div = document.querySelectorAll("." + dropdownId);
        if (this.props.notebookOpend) {
          div[div.length - 1].children[0].querySelector("a").focus();
        } else {
          const div1 = document.querySelectorAll(".tab-panel.active")[0];
          const div2 = div1.querySelectorAll(
            ".vl-carousel-slide-container.active"
          );

          if (div2.length == 1) {
            div2[0]
              .querySelectorAll("." + dropdownId)[0]
              .children[0].querySelector("a")
              .focus();
          } else {
            div1[0]
              .querySelectorAll("." + dropdownId)[0]
              .children[0].querySelector("a")
              .focus();
          }
        }
      }, 100);
    }
  };

  onClickSymbolButton = (e, dropdownId) => {
    this.toolTipHide(e);
    this.setState({
      isSymbolOpen: !this.state.isSymbolOpen,
    });

    if (!this.state.isSymbolOpen) {
      setTimeout(() => {
        const div = document.querySelectorAll("." + dropdownId);
        if (this.props.notebookOpend) {
          div[div.length - 1].children[0].querySelector("a").focus();
        } else {
          const div1 = document.querySelectorAll(".tab-panel.active")[0];
          const div2 = div1.querySelectorAll(
            ".vl-carousel-slide-container.active"
          );
          if (div2.length != 0) {
            div2[0]
              .querySelectorAll("." + dropdownId)[0]
              .children[0].querySelector("a")
              .focus();
          } else {
            div1
              .querySelectorAll("." + dropdownId)[0]
              .children[0].querySelector("a")
              .focus();
          }
        }
      }, 100);
    }
  };

  closeDropDownHandler = (closeUsingEscapeKey, ref, state) => {
    this.setState(
      {
        [state]: false,
      },
      () => {
        if (closeUsingEscapeKey) {
          //ref.focus();
        }
      }
    );
  };

  printHandler = (e) => {
    const { printHandler } = this.props;
    this.toolTipHide(e);
    printHandler();
  };

  boldHandler = (e) => {
    const { boldHandler } = this.props;
    this.toolTipHide(e);
    boldHandler();
  };

  underlineHandler = (e) => {
    const { underlineHandler } = this.props;
    this.toolTipHide(e);
    underlineHandler();
  };

  unOrderedListHandler = (e) => {
    const { unOrderedListHandler } = this.props;
    this.toolTipHide(e);
    unOrderedListHandler();
  };

  italicHandler = (e) => {
    const { italicHandler } = this.props;
    this.toolTipHide(e);
    italicHandler();
  };

  toolTipShow = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.add("show");
      div.setAttribute("aria-hidden", false);
    }
  };

  toolTipHide = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
  };

  render() {
    const {
      isBold,
      isItalic,
      isUnderline,
      isUnOrderedList,
      fontHandler,
      printHandler,
      t,
      symbolHandler,
      disableToolBar,
      isPopupActive,
    } = this.props;

    const { opened, isSymbolOpen } = this.state;

    const fontData = [
      {
        text: "Huge",
        class: "huge-font",
        ariaLabel: "Huge",
        isSymbol: false,
      },
      {
        text: "Large",
        class: "large-font",
        ariaLabel: "Large",
        isSymbol: false,
      },
      {
        text: "Normal",
        class: "normal-font",
        ariaLabel: "Normal",
        isSymbol: false,
      },
      {
        text: "Small",
        class: "small-font",
        ariaLabel: "Small",
        isSymbol: false,
      },
    ];

    const symbolData = [
      {
        text: "&plus;",
        class: "",
        ariaLabel: "&ang;",
        title: "plus",
        isSymbol: true,
      },
      {
        text: "&minus;",
        class: "",
        ariaLabel: "&ang;",
        title: "minus",
        isSymbol: true,
      },
      {
        text: "&times;",
        class: "",
        ariaLabel: "&ang;",
        title: "multiply",
        isSymbol: true,
      },
      {
        text: "&divide;",
        class: "",
        ariaLabel: "&ang;",
        title: "divide",
        isSymbol: true,
      },
      {
        text: "&le;",
        class: "",
        ariaLabel: "&ang;",
        title: "less_equal",
        isSymbol: true,
      },
      {
        text: "&ge;",
        class: "",
        ariaLabel: "&ang;",
        title: "greater_equal",
        isSymbol: true,
      },
      {
        text: "&boxh;",
        isSymbol: true,
        type: "math-div",
        title: "stacked_fraction",
        ariaLabel: "&ang;",
        class: "frac-symbol",
      },
      {
        isSymbol: true,
        text: "&radic;",
        type: "math-root",
        ariaLabel: "&ang;",
        title: "square_root",
        class: "sqrt-symbol",
      },
      {
        text: "&roarr;",
        class: "",
        ariaLabel: "&ang;",
        title: "right_arrow",
        isSymbol: true,
      },
      {
        text: "&loarr;",
        class: "",
        ariaLabel: "&ang;",
        title: "left_arrow",
        isSymbol: true,
      },
      {
        text: "&rlhar;",
        class: "",
        ariaLabel: "&ang;",
        title: "reversible_reaction",
        isSymbol: true,
      },
      {
        text: "&deg",
        html: "a&deg",
        class: "degree",
        ariaLabel: "&ang;",
        isSymbol: true,
        title: "degree_symbol",
      },
      {
        text: "&theta;",
        class: "",
        ariaLabel: "&ang;",
        isSymbol: true,
        title: "theta",
      },
      {
        text: "&gamma;",
        class: "",
        ariaLabel: "&ang;",
        isSymbol: true,
        title: "gamma",
      },
      {
        text: "&mu;",
        class: "",
        ariaLabel: "&ang;",
        isSymbol: true,
        title: "mu",
      },
      {
        text: "&Delta;",
        class: "",
        ariaLabel: "&ang;",
        isSymbol: true,
        title: "delta",
      },
    ];

    return (
      <div className="vl-notebook-toolbar-editor">
        <div className="bold-preload preload" />
        <div className="italic-preload preload" />
        <div className="underline-preload preload" />
        <div className="tool-bar">
          <button
            type="button"
            className={`icon-size icon-fonts ${opened ? "active" : ""}`}
            // title={t("editor.textSize")}
            onClick={(e) => this.onClickFontSize(e, "font-dropdown")}
            aria-label={t("editor.textSize")}
            aria-pressed={opened}
            disabled={disableToolBar}
            unselectable="on"
            onMouseDown={this.onMouseDown}
            onMouseOver={(e) => {
              isTablet ? null : this.toolTipShow(e);
            }}
            onMouseLeave={(e) => this.toolTipHide(e)}
            onFocus={(e) => {
              document.body.className == "no-outline"
                ? null
                : this.toolTipShow(e);
            }}
            onBlur={(e) => this.toolTipHide(e)}
            ref={(button) => {
              this.fontSizeButton = button;
            }}
            tabIndex={isPopupActive ? "-1" : null}
          />
          <Tooltip
            title={t("editor.textSize")}
            classes={t("editor.textSize")}
            position={"top"}
            id={t("editor.textSize") + "-tooltip"}
          />
          <DropDownButton
            onItemClick={fontHandler}
            opened={opened}
            class={"icon-size"}
            closeDropDown={(closeUsingEscapeKey) =>
              this.closeDropDownHandler(
                closeUsingEscapeKey,
                this.fontSizeButton,
                "opened"
              )
            }
            menu={fontData}
            classes="font-dropdown"
            t={t}
          />
        </div>

        <div className="divider"></div>

        <div className="tool-bar">
          <button
            type="button"
            className={`icon-bold icon-fonts ${isTablet ? "isTablet" : ""}
              ${isBold ? "active" : ""}`}
            // title={t("editor.bold")}
            onClick={(e) => this.boldHandler(e)}
            disabled={disableToolBar}
            onMouseOver={(e) => {
              isTablet ? null : this.toolTipShow(e);
            }}
            onMouseLeave={(e) => this.toolTipHide(e)}
            onFocus={(e) => this.toolTipShow(e)}
            onBlur={(e) => this.toolTipHide(e)}
            aria-label={t("editor.bold")}
            aria-pressed={isBold}
            unselectable="on"
            onMouseDown={this.onMouseDown}
            tabIndex={isPopupActive ? "-1" : null}
          />
          <Tooltip
            title={t("editor.bold")}
            classes={t("editor.bold")}
            position={"top"}
            id={t("editor.bold") + "-tooltip"}
          />
        </div>

        <div className="tool-bar">
          <button
            type="button"
            className={`icon-italic icon-fonts ${isTablet ? "isTablet" : ""} ${
              isItalic ? "active" : ""
            }`}
            // title={t("editor.italic")}
            onClick={(e) => this.italicHandler(e)}
            aria-label={t("editor.italic")}
            disabled={disableToolBar}
            aria-pressed={isItalic}
            unselectable="on"
            onMouseDown={this.onMouseDown}
            onMouseOver={(e) => {
              isTablet ? null : this.toolTipShow(e);
            }}
            onMouseLeave={(e) => this.toolTipHide(e)}
            onFocus={(e) => this.toolTipShow(e)}
            onBlur={(e) => this.toolTipHide(e)}
            tabIndex={isPopupActive ? "-1" : null}
          />
          <Tooltip
            title={t("editor.italic")}
            classes={t("editor.italic")}
            position={"top"}
            id={t("editor.italic") + "-tooltip"}
          />
        </div>

        <div className="tool-bar">
          <button
            type="button"
            className={`icon-underline icon-fonts ${
              isUnderline ? "active" : ""
            } ${isTablet ? "isTablet" : ""}`}
            // title={t("editor.underline")}
            onClick={(e) => this.underlineHandler(e)}
            aria-label={t("editor.underline")}
            disabled={disableToolBar}
            aria-pressed={isUnderline}
            unselectable="on"
            onMouseDown={this.onMouseDown}
            onMouseOver={(e) => {
              isTablet ? null : this.toolTipShow(e);
            }}
            onMouseLeave={(e) => this.toolTipHide(e)}
            onFocus={(e) => this.toolTipShow(e)}
            onBlur={(e) => this.toolTipHide(e)}
            tabIndex={isPopupActive ? "-1" : null}
          />
          <Tooltip
            title={t("editor.underline")}
            classes={t("editor.underline")}
            position={"top"}
            id={t("editor.underline") + "-tooltip"}
          />
        </div>

        <div className="divider"></div>

        <div className="tool-bar">
          <button
            type="button"
            className={`icon-bulleted icon-fonts ${
              isUnOrderedList ? "active" : ""
            } ${isTablet ? "isTablet" : ""}`}
            // title={t("editor.bulletList")}
            onClick={(e) => this.unOrderedListHandler(e)}
            aria-label={t("editor.bulletList")}
            aria-pressed={isUnOrderedList}
            disabled={disableToolBar}
            unselectable="on"
            onMouseDown={this.onMouseDown}
            onMouseOver={(e) => {
              isTablet ? null : this.toolTipShow(e);
            }}
            onMouseLeave={(e) => this.toolTipHide(e)}
            onFocus={(e) => this.toolTipShow(e)}
            onBlur={(e) => this.toolTipHide(e)}
            tabIndex={isPopupActive ? "-1" : null}
          />
          <Tooltip
            title={t("editor.bulletList")}
            classes={t("editor.bulletList")}
            position={"top"}
            id={t("editor.bulletList") + "-tooltip"}
          />
        </div>

        <div className="divider"></div>
        <div className="tool-bar">
          <button
            type="button"
            className={`icon-fonts symbol ${isSymbolOpen ? "active" : ""}`}
            // title={t("editor.symbol")}
            onClick={(e) => this.onClickSymbolButton(e, "symbol-dropdown")}
            aria-label={t("editor.symbol")}
            aria-pressed={isSymbolOpen}
            disabled={disableToolBar}
            unselectable="on"
            onMouseDown={this.onMouseDown}
            onMouseOver={(e) => {
              isTablet ? null : this.toolTipShow(e);
            }}
            onMouseLeave={(e) => this.toolTipHide(e)}
            onFocus={(e) => {
              document.body.className == "no-outline"
                ? null
                : this.toolTipShow(e);
            }}
            onBlur={(e) => this.toolTipHide(e)}
            ref={(button) => {
              this.symbolButton = button;
            }}
            tabIndex={isPopupActive ? "-1" : null}
          />
          <Tooltip
            title={t("editor.symbol")}
            classes={t("editor.symbol")}
            position={"top"}
            id={t("editor.symbol") + "-tooltip"}
          />
          <DropDownButton
            onItemClick={symbolHandler}
            opened={isSymbolOpen}
            class={"symbol"}
            closeDropDown={(closeUsingEscapeKey) =>
              this.closeDropDownHandler(
                closeUsingEscapeKey,
                this.symbolButton,
                "isSymbolOpen"
              )
            }
            menu={symbolData}
            classes="symbol-dropdown"
            t={t}
          />
        </div>

        {printHandler && (
          <div className="tool-bar pull-right">
            <button
              className={`print_btn icon-print icon-fonts`}
              aria-label={t("editor.print")}
              // title={t("editor.print")}
              onClick={(e) => this.printHandler(e)}
              onMouseOver={(e) => {
                isTablet ? null : this.toolTipShow(e);
              }}
              onMouseLeave={(e) => this.toolTipHide(e)}
              onFocus={(e) => {
                document.body.className == "no-outline"
                  ? null
                  : this.toolTipShow(e);
              }}
              onBlur={(e) => this.toolTipHide(e)}
              tabIndex={isPopupActive ? "-1" : null}
            />
            <Tooltip
              title={t("editor.print")}
              classes={t("editor.print")}
              position={"top"}
              id={t("editor.print") + "-tooltip"}
            />
          </div>
        )}
      </div>
    );
  }
}

export default EditorToolbar;
