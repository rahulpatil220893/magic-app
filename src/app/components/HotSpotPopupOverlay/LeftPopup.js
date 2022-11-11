import React, { useRef, useEffect, forwardRef } from "react";
import Video from "../Video";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import { isTablet } from "react-device-detect";

const LeftPopup = (props, ref) => {
  const {
    t,
    popupData,
    toggleHotspotPopup,
    updateAriaLiveText,
    currentLangData,
    fullScreenPopup,
    defaultLang,
    currentTab,
    isPopupActive,
    // ref,
  } = props;

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

  useEffect(() => {
    setTimeout(() => {
      if (!fullScreenPopup) {
        ref?.current.focus();
      }
    }, 200);
  }, [popupData.id]);
  return (
    <div className="image-section">
      {popupData.showCloseButton && !fullScreenPopup && (
        <>
          <button
            type="button"
            aria-label={currentLangData.popups.closeButton}
            //title={currentLangData.popups.closeButton }
            className={`vl-hotspot-closeButton icon-closenote ${
              isTablet ? "isTablet" : ""
            }`}
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

      {/* <div /> */}
      {/* {popupData.img && !popupData.isVideo && (
        <div
          className={`popupImg ${popupData.img}`}
          aria-label={popupData.ariaLabel ? popupData.ariaLabel : ""}
          role="img"
          tabIndex="-1"
        >
          {popupData.html ? (
            <div dangerouslySetInnerHTML={{ __html: popupData.html }} />
          ) : null}
        </div>
      )} */}
      {popupData.img && (
        <img src={popupData.img} draggable="false" alt={popupData.alt} />
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

      {popupData.isVideo && (
        <div
          className={`popupImg ${popupData.clsName ? popupData.clsName : null}`}
        >
          <Video
            src={popupData.src}
            posterImg={popupData.posterImg ? popupData.posterImg : null}
            updateAriaLiveText={updateAriaLiveText}
            ariaLabel={popupData.ariaLabel ? popupData.ariaLabel : ""}
            altTimeOut={popupData.altTimeOut ? popupData.altTimeOut : 500}
            autoplay={popupData.autoplay}
          />
        </div>
      )}
      {popupData.component && (
        <div className="popupImg">
          {popupData.ariaLabel ? (
            <div className="sr-only" id="graphLiveText" tabIndex="-1">
              {popupData.ariaLabel}
            </div>
          ) : (
            ""
          )}
          <popupData.component />
        </div>
      )}
      {popupData.tableDataTemplate && (
        <p
          dangerouslySetInnerHTML={{ __html: popupData.tableDataTemplate }}
        ></p>
      )}
      {popupData.labels && (
        <p dangerouslySetInnerHTML={{ __html: popupData.labels }}></p>
      )}
      {/* <button
        type="button"
        aria-label={t("hotSpotOverlap.closeAll")}
        className="vl-hotspot-close-all"
        onClick={() => {
          toggleHotspotPopup(popupData.id);
        }}
      >
        <span>{t("hotSpotOverlap.closeAll")}</span>
      </button> */}
    </div>
  );
};
// LeftPopup.propTypes = {
//   popupData: PropTypes.object,
//   toggleHotspotPopup: PropTypes.func,
//   updateAriaLiveText: PropTypes.func,
// };

// LeftPopup.defaultProps = {
//   t: () => {},
// };

export default forwardRef(LeftPopup);
