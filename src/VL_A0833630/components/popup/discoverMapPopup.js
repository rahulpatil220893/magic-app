import React from "react";
import { isSafari, isTablet, isMacOs } from "react-device-detect";

function discoverMapPopup({
  closeHandler,
  currentLangData,
  currentSubTab,
  currentTab,
  defaultLang,
}) {
  const { tab3 } = currentLangData;
  const _currentSubTab = currentSubTab + 1;
  const ipadClass = (isSafari && isTablet) || isMacOs ? "ipad_class" : "";

  return (
    <div className="popupParent">
      <div className="popupContainer">
        <div className="popupHeader">
          <button
            className="closeButton"
            onClick={closeHandler}
            title={currentLangData.popups.closeButton}
          >
            <i className="fa fa-close" aria-hidden="true"></i>
          </button>
        </div>
        <div className="imgContainer">
          <div className="popupImg">
            <div className={`popup-image-text ${defaultLang} ${ipadClass}`}>
              {currentTab === 2 &&
                tab3[`slide${_currentSubTab}`]?.popupImageText?.map(
                  (items, index) => {
                    return (
                      <p
                        className={items.id}
                        key={`${items.id}${index}`}
                        dangerouslySetInnerHTML={{ __html: items.text }}
                      ></p>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default discoverMapPopup;
