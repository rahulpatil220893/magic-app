import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../Button";
import Tooltip from "../Tooltip";
import { isAndroid, isSafari, isTablet } from "react-device-detect";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this._notebookBtn = null;
    this._helpBtn = null;
    this._saveBtn = null;
    this._langBtn = null;
    this._scoreBtn = null;
    this.firstTImeOpen = true;
    this.state = {
      skipContentOpecity: false,
      hamburgerMenuOpened: false,
    };
  }

  // toolTipShow = (e) => {
  //   const div = e.currentTarget.nextSibling;
  //   if (div && div.classList != undefined) {
  //     div.classList.add("show");
  //     div.setAttribute("aria-hidden", false);
  //   }
  // };

  // toolTipHide = (e) => {
  //   const div = e.currentTarget.nextSibling;
  //   if (div && div.classList != undefined) {
  //     div.classList.remove("show");
  //     div.setAttribute("aria-hidden", true);
  //   }
  // };

  componentDidMount() {
    document.querySelector("html").lang = this.props.defaultLang;
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.notebookPopupOpened && !newProps.notebookPopupOpened) {
      setTimeout(() => {
        this._notebookBtn.focus();
      }, 100);
    }

    if (this.props.helpPopupOpened && !newProps.helpPopupOpened) {
      if (this.props.isFirstTime) {
        setTimeout(() => {
          this._notebookBtn.focus();
          // if(document.body.className != "no-outline") {
          //   document.querySelector(".skip-to-main").focus()
          // }
        }, 100);
      } else {
        setTimeout(() => {
          this._helpBtn.focus();
        }, 100);
      }
    }

    if (this.props.savePopupOpened && !newProps.savePopupOpened) {
      setTimeout(() => {
        this._saveBtn.focus();
      }, 100);
    }

    if (
      this.props.labSubmitted != newProps.labSubmitted &&
      newProps.labSubmitted
    ) {
      setTimeout(() => {
        this._notebookBtn.focus();
      }, 100);
    }

    if (this.props.defaultLang !== newProps.defaultLang) {
      this.props.i18n.changeLanguage(newProps.defaultLang);
      document.querySelector("html").lang = newProps.defaultLang;
      setTimeout(() => {
        this.props.updateAriaLiveText(this.props.headerData.header.langTitle);
      }, 10);
    }
  }

  changeLangHandler = () => {
    // this.props.togglePopup("10");
    this.props.changeLanguage();
    if (isTablet && isSafari) {
      const div = document.querySelector(".btn-hamburger-menu");
      if (div) {
        setTimeout(() => {
          div.focus();
        });
      }
    }
  };

  handleHamburgerClick = (e) => {
    this.setState({
      hamburgerMenuOpened: !this.state.hamburgerMenuOpened,
    });
    const div = document.querySelector(".language-change-button");
    if (div) {
      setTimeout(() => {
        div.focus();
      });
    }
  };

  hideHamburgerMenu = () => {
    if (this.state.hamburgerMenuOpened) {
      this.setState({
        hamburgerMenuOpened: false,
      });
    }
  };

  skipToMainHandler = (e) => {
    e.preventDefault();
    const tab = document.querySelector(
      '.tab-base ul.vl-tab-list li[role="presentation"] button:not(:disabled)[aria-selected="true"]'
    );
    if (tab) {
      tab.focus();
    }
  };

  onKeyDown = (e, notebookPopupId) => {
    switch (e.which) {
      case 13:
        e.preventDefault();
        e.stopPropagation();
        this.props.updateFocusTooltip();
        this.props.notebookClickHandler(notebookPopupId);
        break;
      default:
        break;
    }
  };

  onFocusFirstElement = () => {
    const menu = document.querySelector(".btn-hamburger-menu");
    if (menu.getAttribute("data-expand") == "true") {
      const buttons = document.querySelector(".language-change-button");
      if (buttons) {
        buttons.focus();
      }
    }
  };

  onFocusLastElement = () => {
    const menu = document.querySelector(".btn-hamburger-menu");
    if (menu.getAttribute("data-expand") == "true") {
      const buttons = document.querySelector(".help-button-menuitem");
      if (buttons) {
        buttons.focus();
      }
    }
  };

  render() {
    const {
      className,
      ariaHidden,
      helpPopupId,
      savePopupId,
      labSubmitted,
      isPopupActive,
      notebookPopupId,
      helpClickHandler,
      saveClickHandler,
      notebookClickHandler,
      headerData: {
        labTitle,
        header: { helpTitle, langTitle, languageSwitcher },
        buttonsLable: { save, help, skipToMain, labNotebook, hamburger },
        help: { hideLanguageSwitch },
      },
    } = this.props;
    const { hamburgerMenuOpened } = this.state;

    const _isPopupActive = isPopupActive ? "-1" : null;
    return (
      <header className={classNames(className, "")} aria-hidden={ariaHidden}>
        <div aria-hidden className="sr-only hidden-bg notebook-bg" />
        <div aria-hidden className="sr-only hidden-bg audio-play" />
        <div aria-hidden className="sr-only hidden-bg audio-play__hover" />
        <div aria-hidden className="sr-only hidden-bg audio-pause" />
        <div aria-hidden className="sr-only hidden-bg audio-pause__hover" />
        <div aria-hidden className="sr-only hidden-bg audio-reset" />
        <div aria-hidden className="sr-only hidden-bg audio-reset__hover" />
        <p aria-hidden className="sr-only font-black">
          Text
        </p>
        <h1
          className="main-title text-node"
          ref={(element) => (this._headingRef = element)}
        >
          {labTitle}
        </h1>
        <a
          className="skip-to-main"
          href="#"
          tabIndex={_isPopupActive}
          onClick={this.skipToMainHandler}
        >
          {skipToMain}
        </a>
        <div className="header-button-holder" role="toolbar">
          <Button
            className={`notebook ${this.props.defaultLang}`}
            onClick={() => notebookClickHandler(notebookPopupId)}
            onKeyDown={(e) => {
              return this.onKeyDown(e, notebookPopupId);
            }}
            ref={(element) => (this._notebookBtn = element)}
            aria-label={labNotebook}
            tabIndex={_isPopupActive}
          >
            <span className="text-node">{labNotebook}</span>
          </Button>
          <Button
            data-toggle="dropdown"
            data-expand={hamburgerMenuOpened}
            onClick={this.handleHamburgerClick}
            className={`btn-hamburger-menu ${
              hamburgerMenuOpened ? "active" : ""
            }`.trim()}
            aria-expanded={hamburgerMenuOpened}
            aria-label={hamburger}
            onFocus={(e) => {
              isTablet && isSafari ? this.hideHamburgerMenu() : null;
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>

          <div className="header-hamburger-menu">
            <div
              tabIndex={hamburgerMenuOpened ? "0" : null}
              aria-hidden="true"
              className="vl-popups-first-element"
              onFocus={this.onFocusFirstElement}
              //  onBlur={this.onBlurFirstElement}
            />
            {!hideLanguageSwitch && (
              <div className="language-switcher">
                <p
                  className={`text-node ${this.props.defaultLang}`}
                  dangerouslySetInnerHTML={{ __html: languageSwitcher?.en }}
                ></p>
                <div>
                  <Button
                    // title={langTitle}
                    aria-label={langTitle}
                    tabIndex={_isPopupActive}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.changeLangHandler();
                      setTimeout(() => {
                        this.hideHamburgerMenu();
                      }, 10);
                    }}
                    data-lab-lang={this.props.defaultLang}
                    className="instructionsIcon right-icon language-change-button"
                    ref={(element) => (this._langBtn = element)}
                    //onMouseOver={(e) => this.toolTipShow(e)}
                    //onMouseLeave={(e) => this.toolTipHide(e)}
                    // onFocus={(e) => this.toolTipShow(e)}
                    //onBlur={(e) => this.toolTipHide(e)}
                  >
                    <span></span>
                  </Button>
                  <Tooltip
                    title={langTitle}
                    classes={langTitle}
                    id={langTitle}
                  />
                </div>
                <p
                  className={`text-node ${this.props.defaultLang}`}
                  dangerouslySetInnerHTML={{ __html: languageSwitcher?.es }}
                ></p>
              </div>
            )}
            <div
              className={`vertical-bar ${
                hideLanguageSwitch ? "langBtnHidden" : ""
              }`}
            ></div>
            <div>
              <Button
                aria-label={save}
                disabled={labSubmitted}
                tabIndex={_isPopupActive}
                className="save-icon right-icon"
                ref={(element) => (this._saveBtn = element)}
                onClick={(e) => {
                  e.stopPropagation();
                  saveClickHandler(savePopupId);
                  setTimeout(() => {
                    this.hideHamburgerMenu();
                  }, 10);
                }}
              >
                <span className="text-node">{save}</span>
              </Button>
            </div>
            <div>
              <Button
                // title={helpTitle}
                aria-label={help}
                tabIndex={_isPopupActive}
                className="instructionsIcon right-icon help-button-menuitem"
                ref={(element) => (this._helpBtn = element)}
                onClick={(e) => {
                  e.stopPropagation();
                  this.hideHamburgerMenu();
                  setTimeout(() => {
                    helpClickHandler(helpPopupId);
                    //this.toolTipHide(e);
                  }, 10);
                }}
              >
                <span className="text-node">{help}</span>
              </Button>
            </div>
            <div
              tabIndex={hamburgerMenuOpened && !isAndroid ? "0" : null}
              className="vl-popups-last-element"
              onFocus={this.onFocusLastElement}
              // onBlur={this.onBlurLastElement}
            />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  isFirstTime: PropTypes.bool,
  labSubmitted: PropTypes.bool,
  helpPopupOpened: PropTypes.bool,
  savePopupOpened: PropTypes.bool,
  title: PropTypes.string.isRequired,
  notebookPopupOpened: PropTypes.any,
  helpPopupId: PropTypes.string.isRequired,
  savePopupId: PropTypes.string.isRequired,
  helpClickHandler: PropTypes.func.isRequired,
  saveClickHandler: PropTypes.func.isRequired,
  notebookPopupId: PropTypes.string.isRequired,
  notebookClickHandler: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: "Lab",
  helpClickHandler: () => {},
  saveClickHandler: () => {},
  notebookClickHandler: () => {},
};

export default Header;
