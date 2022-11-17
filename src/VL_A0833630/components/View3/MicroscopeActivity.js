import React, { useState, createRef, useEffect, useRef } from "react";
import { isTablet } from "react-device-detect";
import AccessibleDnDList from "../../../app/components/AccessibleList";
import Tooltip from "../../../app/components/Tooltip";

const MicroscopeActivity = (props) => {
  const {
    currentTab,
    currentLangData,
    isPopupActive,
    toggleHotspotPopup,
    currentHotspotPopup,
    updateAriaLiveText,
    isAccessible,
    setAccessible,
    selectDraggable,
    selectedDraggable,
    dropzone,
    draggableImg,
    markCompletedActivity,
  } = props;
  const { buttonsLable, tab3, popups } = currentLangData;
  const [selectedSlide, setSelectedSlide] = useState([]);
  const [droppedElements, setDroppedElements] = useState(null);
  const [disableDraggableButton, setDisableDraggableButton] = useState(false);
  const [imageZoomValue, setImageZoomValue] = useState(1);

  let dndRef = createRef(null);
  let activeElement = createRef(null);
  const popButton = useRef(null);
  const imageRef = useRef();

  const showPopup = currentHotspotPopup.length > 0 ? true : false;

  useEffect(() => {
    const newValue = selectedSlide.filter((v, i, a) => a.indexOf(v) === i);
    if (newValue.length >= 2) {
      markCompletedActivity(1, 0);
    }
  }, [selectedSlide]);

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
        if (droppedElements === null) {
          setDroppedElements(activeElement.type || null);
          setDisableDraggableButton(true);
          toggleHotspotPopupHandler("hotspot_" + activeElement.type);
          popButton.current.focus();
          setSelectedSlide((val) => [...val, activeElement.type]);
        }
      },
    });
  };

  useEffect(() => {
    initiateDraggableElements();
    initiateDroppableElements();
  }, []);

  const toggleHotspotPopupHandler = (index) => {
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
  };

  const resetActivity = () => {
    setDroppedElements(null);
    setDisableDraggableButton(false);
    setTimeout(() => {
      document.querySelector(`#tab_${currentTab}`).focus();
    });
    setTimeout(() => {
      updateAriaLiveText(tab3.resetLiveText);
    }, 300);
  };

  const arrowsEnterClick = (event) => {
    setAccessible(true);
    selectDraggable(event.target.dataset);
    activeElement = event.target.dataset;
  };

  const dropOnList = () => {
    if (selectedDraggable.type && droppedElements === null) {
      setDroppedElements(selectedDraggable.type || null);
      setDisableDraggableButton(true);
      toggleHotspotPopupHandler("hotspot_" + selectedDraggable.type);
      popButton.current.focus();
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
    toggleHotspotPopup("hotspot_" + droppedElements, currentTab);
  };

  const zoomInHandler = (event) => {
    setImageZoomValue((val) => (val < 2 ? val + 0.25 : val));
    if (imageZoomValue + 0.25 >= 2) {
      toolTipHide(event);
    }
    updateAriaLiveText(tab3.slide1.zoomInCount.addedZoomInMsg);
  };

  const zoomOutHandler = (event) => {
    setImageZoomValue((val) => (val > 1 ? val - 0.25 : val));
    if (imageZoomValue - 0.25 <= 1) {
      toolTipHide(event);
    }
    updateAriaLiveText(tab3.slide1.zoomInCount.addedZoomOutMsg);
  };

  return (
    <div className="discover-slide1-activity-container" ref={dndRef}>
      <div className="draggingArea">
        <div
          className={`hotspot_microscope`}
          role="img"
          tabIndex="-1"
          aria-hidden={true}
        />
        <AccessibleDnDList
          onClick={dropOnList}
          opened={isAccessible}
          list={dropzone}
          closeList={() => setAccessible(false)}
        />
        {dropzone.map((item) => (
          <div
            className={`${item.class} drop_area ${
              droppedElements !== null ? "slidedrop " + droppedElements : ""
            }`}
            key={`drop_${item.id}`}
          />
        ))}
        {draggableImg.map((val) => (
          <div className={`slide-box ${val.id}`} key={`slide_box_${val.id}`}>
            <div className="highlight_box">
              <div
                className={`slide_place_box ${
                  disableDraggableButton ? "disable" : ""
                }`}
              >
                <div
                  className={`slide_sample ${val.className} draggable ${
                    droppedElements === val.dataType ? "hidden" : ""
                  }`}
                  data-type={val.dataType}
                  tabIndex="-1"
                  aria-hidden="true"
                  onClick={(e) => arrowsEnterClick(e)}
                />
                <button
                  data-type={val.dataType}
                  aria-label={val.labelAlt}
                  tabIndex={isPopupActive || showPopup ? "-1" : null}
                  aria-hidden={isPopupActive || showPopup ? true : false}
                  disabled={disableDraggableButton}
                  onClick={(e) => arrowsEnterClick(e)}
                />
              </div>
            </div>
            <span>{val.text}</span>
          </div>
        ))}
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
      <div
        className={`image-zoom-popup ${
          currentHotspotPopup &&
          (currentHotspotPopup.includes("hotspot_water_sample") ||
            currentHotspotPopup.includes("hotspot_fish_sample"))
            ? ""
            : "hidden"
        }`}
      >
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
                className={`slide_image ${droppedElements}`}
                style={{ transform: `scale(${imageZoomValue})` }}
                tabIndex={isPopupActive ? "-1" : null}
              />
            </div>
            <div className="zoom_btn_box">
              <button
                className="zoomin-button"
                disabled={imageZoomValue >= 2}
                onClick={zoomInHandler}
                aria-label={tab3.slide1.zoomButtonLabels.zoomin}
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
                title={tab3.slide1.zoomButtonLabels.zoomin}
                classes="zoom-in-tooltip"
                id="zoom-in-tooltip"
                position="left"
              />
              <div className="button_divider" />
              <button
                className="zoomout-button"
                disabled={imageZoomValue <= 1}
                onClick={zoomOutHandler}
                aria-label={tab3.slide1.zoomButtonLabels.zoomout}
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
                title={tab3.slide1.zoomButtonLabels.zoomout}
                classes={"zoom-out-tooltip"}
                id={"zoom-out-tooltip"}
                position="left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroscopeActivity;
