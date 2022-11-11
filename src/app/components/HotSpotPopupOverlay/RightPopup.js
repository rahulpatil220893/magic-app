import React, { useRef, useEffect, forwardRef } from "react";
import Audio from "../Audio";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import Accordion from "../Accordion";

import { isTablet } from "react-device-detect";

const RightPopup = (props, ref) => {
  const {
    t,
    popupData,
    toggleHotspotPopup,
    currentTab,
    currentSubTab,
    currentLangData,
    imgSrc,
    widthChange,
    isPopupActive,
    audioOverlap,
    upadateAudioOverLap,
    defaultLang,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      ref?.current.focus();
      getTabIndex();
    }, 200);
  }, [popupData.id]);

  useEffect(() => {
    getTabIndex();
  }, [widthChange, isPopupActive]);

  const getTabIndex = () => {
    setTimeout(() => {
      const divs = document.querySelectorAll(".vl-hotspotpanel-sidePanel");
      divs.forEach((div) => {
        if (div) {
          div.setAttribute(
            "tabIndex",
            div.scrollHeight > div.clientHeight && !isPopupActive ? "0" : null
          );
        }
      });
    });
  };

  const toolTipShow = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.add("show");
      div.setAttribute("aria-hidden", false);
    }
  };

  const toolTipHide = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
  };

  return (
    <div className="vl-hotspotpanel-sidePanel text-section">
      {popupData.showCloseButton && (
        <>
          <button
            type="button"
            aria-label={currentLangData.popups.closeButton}
            // title={currentLangData.popups.closeButton}
            className="vl-hotspot-closeButton icon-closenote"
            onClick={() => {
              toggleHotspotPopup(popupData.id, currentTab);
            }}
            tabIndex={isPopupActive ? "-1" : null}
            ref={ref}
            onMouseOver={(e) => {
              isTablet ? null : toolTipShow(e);
            }}
            onMouseLeave={(e) => toolTipHide(e)}
            onFocus={(e) => {
              document.body.className == "no-outline" ? null : toolTipShow(e);
            }}
            onBlur={(e) => toolTipHide(e)}
          />
          <Tooltip
            title={currentLangData.popups.closeButton}
            classes="Close"
            id={currentLangData.popups.closeButton}
            position="left"
          />
        </>
      )}

      {popupData.figure && popupData.title && popupData.imgSrc ? (
        <figure>
          <img src={popupData.imgSrc} draggable="false" alt={popupData.alt} />
          <figcaption>{popupData.title}</figcaption>
        </figure>
      ) : (
        popupData.imgSrc && (
          <img src={popupData.imgSrc} draggable="false" alt={popupData.alt} />
        )
      )}
      {popupData.imageText && (
        <>
          {popupData.imageText.map((items, index) => {
            return (
              <p
                className={`${items.id} ${defaultLang}`}
                key={`${items.id}${index}`}
                dangerouslySetInnerHTML={{ __html: items.text }}
              ></p>
            );
          })}
        </>
      )}
      {popupData.audio && (
        <div className="audioSection">
          <Audio
            audiosrc={popupData.audio}
            currentTab={currentTab}
            currentSubTab={currentSubTab}
            isPopupActive={isPopupActive}
            audioOverlap={audioOverlap}
            upadateAudioOverLap={upadateAudioOverLap}
            defaultLang={defaultLang}
          />
        </div>
      )}
      {popupData.info.length ? (
        <div className="hotspot-text">
          {popupData.title && <h2>{popupData.title}</h2>}
          {popupData.info.map((text, index) => {
            return (
              <p
                key={`${index}_info`}
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
            );
          })}
        </div>
      ) : null}
      {popupData.accordionData && (
        <Accordion
          data={popupData.accordionData}
          currentTab={currentTab}
          currentSubTab={currentSubTab}
          audioOverlap={audioOverlap}
          upadateAudioOverLap={upadateAudioOverLap}
          defaultLang={defaultLang}
        />
      )}
    </div>
  );
};
// RightPopup.propTypes = {
//   popupData: PropTypes.object,
//   toggleHotspotPopup: PropTypes.func,
//   currentSubTab: PropTypes.any,
//   currentTab: PropTypes.any,
// };

// RightPopup.defaultProps = {
//   t: () => { },
// };

export default forwardRef(RightPopup);
