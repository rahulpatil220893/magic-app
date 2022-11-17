import React, { createRef, useState, useEffect, useRef } from "react";
import { isTablet } from "react-device-detect";

import AccessibleDnDList from "../../../app/components/AccessibleList";
import Tooltip from "../../../app/components/Tooltip";
import Audio from "../../containers/AudioConatiner";

const WatersampleActivity = (props) => {
  const {
    toggleHotspotPopup,
    currentLangData,
    currentHotspotPopup,
    markCompletedActivity,
    isPopupActive,
    isAccessible,
    setAccessible,
    selectDraggable,
    currentTab,
    currentSubTab,
  } = props;
  const { hotSpotData33, commonWords, tab3, popups } = currentLangData;
  const [hotSpotsVisited, setHotSpotsVisited] = useState([]);
  const [droppedElements, setDroppedElements] = useState([]);
  const [disableDraggableButton, setDisableDraggableButton] = useState(false);
  const [showPopup, setShowPopup] = useState({
    status: false,
    id: "",
  });
  const [sampleRecords, setSampleRecords] = useState({
    sample1: 0.5,
    sample2: 0.8,
    sample3: 1.8,
  });

  let dndRef = createRef(null);
  let activeElement = createRef(null);
  const popButton = useRef(null);

  const toggleHotspotPopupHandler = (index) => {
    setShowPopup({
      status: true,
      id: index,
    });
    if (!hotSpotsVisited.includes(index)) {
      setHotSpotsVisited((val) => [...val, index]);
    }
    popButton.current.focus();
  };

  const initiateDraggableElements = () => {
    const draggables = dndRef.current.querySelectorAll(".draggable");
    $(draggables).draggable({
      cursor: "grab",
      revert: true,
      revertDuration: 0,
      cancel: false,
      containment: ".draggingArea",
      start: (event, ui) => {
        console.log(event.target.dataset);
        activeElement = event;
      },
    });
  };

  const initiateDroppableElements = () => {
    const droppables = dndRef.current.querySelectorAll(".drop_area");
    $(droppables).droppable({
      tolerance: "pointer",
      drop: (event, ui) => {
        console.log(
          "activeElement.type",
          activeElement.target,
          event.target.dataset
        );
        // if (droppedElements === null) {
        //   setDroppedElements(activeElement.type || null);
        //   setDisableDraggableButton(true);
        //   toggleHotspotPopupHandler("hotspot_" + activeElement.type);
        //   popButton.current.focus();
        //   setSelectedSlide((val) => [...val, activeElement.type]);
        // }
      },
    });
  };

  useEffect(() => {
    initiateDraggableElements();
    initiateDroppableElements();
  }, []);

  const arrowsEnterClick = (event) => {
    setAccessible(true);
    selectDraggable(event);
    activeElement = event;
  };

  const dropOnList = () => {};

  const toolTipShow = (e) => {
    const div = e.currentTarget.previousSibling;
    console.log("div", div);
    if (div && div.classList != undefined) {
      div.classList.add("show");
      div.setAttribute("aria-hidden", false);
    }
  };

  const toolTipHide = (e) => {
    const div = e.currentTarget.previousSibling.children[0];
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
  };

  const closePopup = () => {
    setShowPopup({
      status: false,
      id: "",
    });
  };

  return (
    <div className="discover-slide3-activity-container" ref={dndRef}>
      <div className="draggingArea">
        {hotSpotData33
          .filter((val) => val.type.includes("right"))
          .map((val) => (
            <React.Fragment key={`${val.image}_hotspot`}>
              <div
                className={`hotspot_image ${val.image}`}
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              />
              <button
                className={`hotspot ${val.id} ${
                  hotSpotsVisited.includes(val.id) ? "active" : ""
                }`}
                onClick={() => toggleHotspotPopupHandler(val.id)}
                tabIndex={isPopupActive ? "-1" : null}
                aria-label={`${val.label} ${
                  currentHotspotPopup.includes(val.id)
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes(val.id) ? "visited" : ""}`}
                id={val.id}
              >
                <span>{val.label}</span>
              </button>
            </React.Fragment>
          ))}
        {tab3.slide3.lables.map((val) => (
          <span className={`lable ${val.class}`} key={`lable_${val.class}`}>
            {val.lable}
          </span>
        ))}
        <AccessibleDnDList
          onClick={dropOnList}
          opened={isAccessible}
          list={tab3.slide3.dropzone}
          closeList={() => setAccessible(false)}
        />
        {tab3.slide3.dropzone.map((element) => {
          const droppedItem = droppedElements.find((el) => el.id == element.id);
          return (
            <div
              key={`drop${element.id}`}
              className={`water_bottle ${element.id} drop_area ${
                droppedItem ? droppedItem.type : ""
              }`}
              data-target={`${element.id}`}
            />
          );
        })}
        {tab3.slide3.draggable.map((val) => (
          <div className={`${val.class}`} key={`draggable${val.id}`}>
            <div
              className={`draggable`}
              data-source={val.type}
              data-class={val.class}
              aria-hidden="true"
              onClick={(e) =>
                arrowsEnterClick({
                  source: val.type,
                  class: val.class,
                })
              }
            >
              <Tooltip
                title={val.label}
                classes={`tooltip_${val.class}`}
                position="bottom"
              />
            </div>
            <button
              data-source={val.type}
              data-class={val.class}
              disabled={disableDraggableButton}
              onClick={(e) =>
                arrowsEnterClick({
                  source: val.type,
                  class: val.class,
                })
              }
              tabIndex={isPopupActive ? "-1" : null}
              aria-label={val.label}
              onFocus={(e) => {
                document.body.className == "no-outline" ? null : toolTipShow(e);
              }}
              onBlur={(e) => toolTipHide(e)}
            ></button>
          </div>
        ))}
      </div>
      <div
        className={`discover-alert-popup ${!showPopup.status ? "hidden" : ""}`}
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
            {showPopup.id === "water_level_map" ? (
              <div className="map_image" tabIndex={isPopupActive ? "-1" : null}>
                {sampleRecords.sample1 > 0 ? (
                  <span className="sample1">{sampleRecords.sample1} mg/L</span>
                ) : (
                  ""
                )}
                {sampleRecords.sample2 > 0 ? (
                  <span className="sample2">{sampleRecords.sample2} mg/L</span>
                ) : (
                  ""
                )}
                {sampleRecords.sample3 > 0 ? (
                  <span className="sample3">{sampleRecords.sample3} mg/L</span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {showPopup.id === "invalid_sample_test" ? (
              <div className="popup-text-container">
                <div className="vl-audio-container">
                  <Audio
                    audiosrc={tab3.slide3.invalidWaterSampleAudio}
                    oldProps={props}
                  />
                </div>
                <div
                  className="popup-text"
                  dangerouslySetInnerHTML={{
                    __html: tab3.slide3.invalidWaterSampleText,
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatersampleActivity;
