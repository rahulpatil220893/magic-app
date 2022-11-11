import React, { useState, createRef, useEffect, useRef } from "react";
import { isTablet } from "react-device-detect";
import Tooltip from "../../../app/components/Tooltip";
const MicroscopeActivity = (props) => {
  const {
    currentTab,
    currentLangData,
    isPopupActive,
    toggleHotspotPopup,
    currentHotspotPopup,
    updateAriaLiveText,
  } = props;
  const { buttonsLable, tab3, popups } = currentLangData;
  const [selectedDraggable, setSelectedDraggable] = useState(null);
  const [disableDraggableButton, setDisableDraggableButton] = useState(false);
  const [imageZoomValue, setImageZoomValue] = useState(1);

  let dndRef = createRef(null);
  let activeElement = createRef(null);
  let popButton = createRef(null);
  const zoomInRef = useRef();
  const zoomOutRef = useRef();
  const imageRef = useRef();

  const showPopup = currentHotspotPopup.length > 0 ? true : false;

  const initiateDraggableElements = () => {
    const draggables = dndRef.current.querySelectorAll(".draggable");
    $(draggables).draggable({
      cursor: "grab",
      revert: true,
      revertDuration: 0,
      cancel: false,
      containment: ".draggingArea",
      start: (event, ui) => {
        activeElement = event.target.dataset;
      },
    });
  };

  const initiateDroppableElements = () => {
    const droppables = dndRef.current.querySelectorAll(".drop_area");
    $(droppables).droppable({
      tolerance: "pointer",
      drop: (event, ui) => {
        if (selectedDraggable === null) {
          setSelectedDraggable(activeElement.type || null);
          setDisableDraggableButton(true);
          toggleHotspotPopupHandler("hotspot_" + activeElement.type);
          popButton.current.focus();
        }
      },
    });
  };

  useEffect(() => {
    initiateDraggableElements();
    initiateDroppableElements();
  }, []);

  // useEffect(() => {
  //   if (selectedDraggable !== null) {
  //     if (!currentHotspotPopup.length) {
  //       console.log("colse", currentHotspotPopup);
  //       setTimeout(() => {
  //         document.querySelector(".reset-btton").focus();
  //       });
  //     }
  //   }
  // }, [currentHotspotPopup, selectedDraggable]);

  const toggleHotspotPopupHandler = (index) => {
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
  };

  const resetActivity = () => {
    setSelectedDraggable(null);
    setDisableDraggableButton(false);
    setTimeout(() => {
      document.querySelector(`#tab_${currentTab}`).focus();
    });
    setTimeout(() => {
      updateAriaLiveText(tab3.resetLiveText);
    }, 300);
  };

  const slideEnterClick = (e, type) => {
    if (selectedDraggable === null) {
      setSelectedDraggable(type || null);
      setDisableDraggableButton(true);
      toggleHotspotPopupHandler("hotspot_" + type);
    }
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

  const closePopup = () => {
    document.querySelector(".reset-btton").focus();
    toggleHotspotPopup("hotspot_" + selectedDraggable, currentTab);
  };

  const zoomInHandler = (event) => {};
  const zoomOutHandler = (event) => {};

  return (
    <div className="discover-slide1-activity-container" ref={dndRef}>
      <div className="draggingArea">
        <div
          className={`hotspot_microscope`}
          role="img"
          tabIndex="-1"
          aria-hidden={true}
        />
        <div
          className={`slide_place drop_area ${
            selectedDraggable !== null ? "slidedrop" : ""
          }`}
        ></div>
        <div className="slide-box water_slide">
          <div className="highlight_box">
            <div className="slide_place_box">
              <button
                className={`water_slide draggable ${
                  selectedDraggable === "water_sample" ? "hidden" : ""
                }`}
                data-type="water_sample"
                aria-label="water sample slide draggable"
                tabIndex={showPopup ? "-1" : null}
                aria-hidden={showPopup ? true : false}
                disabled={disableDraggableButton}
                onClick={(e) => slideEnterClick(e, "water_sample")}
              />
            </div>
          </div>
          <span>Water sample</span>
        </div>
        <div className="slide-box fish_slide">
          <div className="highlight_box">
            <div className="slide_place_box">
              <button
                className={`fish_sample draggable ${
                  selectedDraggable === "fish_sample" ? "hidden" : ""
                }`}
                data-type="fish_sample"
                aria-label="fish sample slide draggable"
                tabIndex={showPopup ? "-1" : null}
                aria-hidden={showPopup ? true : false}
                disabled={disableDraggableButton}
                onClick={(e) => slideEnterClick(e, "fish_sample")}
              />
            </div>
          </div>
          <span>Fish sample</span>
        </div>
        <div className="actions">
          <button
            className="reset-btton"
            onClick={resetActivity}
            disabled={!disableDraggableButton}
            tabIndex={showPopup ? "-1" : "0"}
            aria-hidden={showPopup ? true : false}
          >
            {buttonsLable.reset}
          </button>
        </div>
      </div>
      {/* {currentHotspotPopup &&
      (currentHotspotPopup.includes("hotspot_water_sample") ||
        currentHotspotPopup.includes("hotspot_fish_sample")) ? ( */}
      <div className="image-zoom-popup">
        <div className="popup-container">
          <div className="header">
            <div className="close_action">
              <button
                type="button"
                aria-label={popups.closeButton}
                className="vl-hotspot-closeButton icon-closenote"
                onClick={closePopup}
                tabIndex={isPopupActive ? "-1" : null}
                ref={popButton}
                onMouseOver={(e) => {
                  isTablet ? null : toolTipShow(e);
                }}
                onMouseLeave={(e) => toolTipHide(e)}
                onFocus={(e) => {
                  document.body.className == "no-outline"
                    ? null
                    : toolTipShow(e);
                }}
                onBlur={(e) => toolTipHide(e)}
              />
              <Tooltip
                title={popups.closeButton}
                classes="Close"
                id={popups.closeButton}
                position="left"
              />
            </div>
          </div>
          <div className="body">
            <div className="image_box">
              <div
                ref={imageRef}
                className={`slide_image ${selectedDraggable}`}
                style={{ transform: `scale(${imageZoomValue})` }}
                tabIndex={isPopupActive ? "-1" : null}
              />
            </div>
            <div className="zoom_btn_box">
              <button
                ref={zoomInRef}
                className="zoomin-button"
                disabled={imageZoomValue > 1}
                onClick={zoomInHandler}
                aria-label={"Zoom In"}
                onMouseOver={(e) => {
                  isTablet ? null : toolTipShow(e);
                }}
                onMouseLeave={(e) => toolTipHide(e)}
                onFocus={(e) => {
                  document.body.className == "no-outline"
                    ? null
                    : toolTipShow(e);
                }}
                onBlur={(e) => toolTipHide(e)}
              >
                +
              </button>
              <Tooltip
                title={"Zoom In"}
                classes="zoom-in-tooltip"
                id="zoom-in-tooltip"
                position="left"
              />
              <div className="button_divider" />
              <button
                ref={zoomOutRef}
                className="zoomout-button"
                disabled={imageZoomValue <= 1}
                onClick={zoomOutHandler}
                aria-label={"Zoom Out"}
                onMouseOver={(e) => {
                  isTablet ? null : toolTipShow(e);
                }}
                onMouseLeave={(e) => toolTipHide(e)}
                onFocus={(e) => {
                  document.body.className == "no-outline"
                    ? null
                    : toolTipShow(e);
                }}
                onBlur={(e) => toolTipHide(e)}
              >
                -
              </button>
              <Tooltip
                title={"Zoom Out"}
                classes={"zoom-out-tooltip"}
                id={"zoom-out-tooltip"}
                position="left"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default MicroscopeActivity;
