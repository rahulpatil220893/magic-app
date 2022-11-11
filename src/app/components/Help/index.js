import React, { useRef, useEffect } from "react";
// import Button from "../Button";
import PropTypes from "prop-types";
import { isSafari, isTablet } from "react-device-detect";

function Help(props) {
  const timeoutRef = useRef(null);
  const gotoLabBtn = useRef(null);
  const { popupId, closePopup, helpPopupOpened, helpData, defaultLang } = props;

  useEffect(() => {
    if (helpPopupOpened) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        gotoLabBtn.current.focus();
      }, 100);
    }
  }, [helpPopupOpened]);

  useEffect(() => {
    if (helpPopupOpened) props.setPopupLastElement(gotoLabBtn.current);
    props.setPopupFirstElement(gotoLabBtn.current);
  }, []);
  const ipadClass = isSafari && isTablet ? "ipad_class" : "";
  return (
    <div className="help-popup-wrapper">
      <div className={`header-help ${defaultLang} ${ipadClass}`}>
        <div
          className={`notebook-help ${
            helpData.hideLanguageSwitch ? "langBtnHidden" : ""
          }`}
        >
          <div className="btn">
            <span className="notebookBtn">{helpData.noteBookButton}</span>
          </div>
          <div className="arrow"></div>
          <div className="text">
            <span>{helpData.noteBookDescription}</span>
          </div>
        </div>
        {!helpData.hideLanguageSwitch && (
          <div className="language-switcher-help">
            <div className="btn">
              <p aria-hidden>Eng</p>
              <p className="sr-only">{helpData.English}</p>
              <span></span>
              <p className="sr-only">{helpData.Spanish}</p>
              <p aria-hidden>Esp</p>
            </div>
            <div className="arrow"></div>
            <div className="text">
              <span>{helpData.languageButtonDesc}</span>
            </div>
          </div>
        )}
        <div className="vertical-dot-help">
          <div className="btn"></div>
          {!helpData.hideLanguageSwitch && (
            <>
              <div className="arrow"></div>
              <div className="text">
                <span>{helpData.languageButtonDesc}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="tools-help">
        <div className="highlighter">
          <div className="highlighter--icon">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="icon-arrow-white icomoon-Select_2"
            ></i>
          </div>
          <div className="highlighter--icon">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="pencil-icon-black icomoon-Pencil_2"
            ></i>
          </div>
          <div className="highlighter--icon">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="eraser-icon-black icomoon-Eraser_2"
            ></i>
          </div>
          <div className="highlighter--icon">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="undo-icon-black icomoon-ClearAll_2"
            ></i>
          </div>
          <div className="highlighter--icon">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="camera-icon-black icomoon-Camera_2"
            ></i>
          </div>
        </div>
        <div className="description">
          <div className="toolbar-icon-details">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="icon-arrow-white icomoon-Select_2"
            ></i>
            <span>{helpData.elementSelection}</span>
          </div>
          <div className="toolbar-icon-details">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="pencil-icon-black icomoon-Pencil_2"
            ></i>
            <span>{helpData.draw}</span>
          </div>
          <div className="toolbar-icon-details">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="eraser-icon-black icomoon-Eraser_2"
            ></i>
            <span>{helpData.erase}</span>
          </div>
          <div className="toolbar-icon-details">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="undo-icon-black icomoon-ClearAll_2"
            ></i>
            <span>{helpData.removeAllDrawing}</span>
          </div>
          <div className="toolbar-icon-details">
            <i
              aria-hidden="true"
              tabIndex="-1"
              className="camera-icon-black icomoon-Camera_2"
            ></i>
            <span>{helpData.screenShot}</span>
          </div>
        </div>
      </div>
      <div className="cta-wrapper btn">
        <button
          type="submit"
          ref={gotoLabBtn}
          onClick={() => closePopup(popupId)}
        >
          {helpData.lab}
        </button>
      </div>
      <div className={`subtab-help  ${defaultLang}`}>
        <div className="carousel-description">
          <div className="arrow"></div>
          <span>{helpData.sliderNavigation}</span>
        </div>
        <div aria-hidden="true" tabIndex="-1" className="subtab-carousels">
          <span className="fa fa-angle-left"></span>
          <div className="carousel-bullets">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="fa fa-angle-right"></span>
        </div>
        <div className="completed-description">
          <div className="arrow"></div>
          <span>{helpData.completedSubtab}</span>
        </div>
      </div>
      <div className={`next-button ${defaultLang} ${ipadClass}`}>
        <span className={`text ${defaultLang}`}>{helpData.nextStage}</span>
        <div className={`arrow ${defaultLang}`}></div>
        <div className="btn">
          <span>{helpData.nextButton}</span>
        </div>
      </div>
    </div>
  );
}
Help.propTypes = {
  popupId: PropTypes.any,
  closePopup: PropTypes.any,
  helpPopupOpened: PropTypes.any,
  setPopupLastElement: PropTypes.func,
  setPopupFirstElement: PropTypes.func,
};

export default Help;
