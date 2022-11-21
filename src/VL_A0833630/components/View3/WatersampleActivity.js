import React, { createRef, useState, useEffect, useRef } from "react";
import { isTablet } from "react-device-detect";

import AccessibleDnDList from "../../../app/components/AccessibleList";
import Tooltip from "../../../app/components/Tooltip";
import Audio from "../../containers/AudioConatiner";
import Video from "../../../app/components/Video";
import videoUrl from "../../assets/videos/activity_anim.mp4";

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
    selectedDraggable,
    updateAriaLiveText,
  } = props;
  const { hotSpotData33, commonWords, tab3, popups } = currentLangData;
  const [showVideo, setShowVideo] = useState(false);
  const [hotSpotsVisited, setHotSpotsVisited] = useState([]);
  const [droppedElements, setDroppedElements] = useState([]);
  const [disableDraggableButton, setDisableDraggableButton] = useState({
    pipette: false,
    cuvette: true,
    open: true,
    close: true,
    start: true,
    blank: true,
  });
  const [openCloseBtn, setOpenCloseBtn] = useState("close");
  const [showPopup, setShowPopup] = useState({
    status: false,
    id: "",
  });
  const [sampleRecords, setSampleRecords] = useState({
    sample1: 0.5,
    sample2: 0.8,
    sample3: 1.8,
  });

  const validWaterSample = ["water_sample2", "water_sample4", "water_sample5"];

  let dndRef = createRef(null);
  let activeElement = createRef(null);
  const popButton = useRef(null);
  const animationContainerRef = useRef(null);

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
        activeElement = event;
      },
    });
  };

  const initiateDroppableElements = () => {
    const droppables = dndRef.current.querySelectorAll(".drop_area");
    $(droppables).droppable({
      tolerance: "pointer",
      drop: (event, ui) => {
        const { source, sourceclass } = activeElement?.target?.dataset;
        const { target } = event?.target?.dataset;
        if (source === "pipette") {
          if (!validWaterSample.includes(target)) {
            toggleHotspotPopupHandler("invalid_sample_test");
          } else {
            // setShowVideo(true);
            setDroppedElements((val) => [
              ...val,
              {
                type: source,
                id: target,
                class: sourceclass,
              },
            ]);
          }
        }
      },
    });
  };

  useEffect(() => {
    initiateDraggableElements();
    initiateDroppableElements();
  }, []);

  useEffect(() => {
    console.log("droppedElements", droppedElements);
    const selectedWaterSample = droppedElements.filter(
      (val) => val.type === "pipette"
    );
    if (selectedWaterSample.length >= 3) {
      setDisableDraggableButton({
        pipette: true,
        cuvette: false,
        open: false,
        close: false,
        start: true,
        blank: true,
      });
    }
  }, [droppedElements]);

  const arrowsEnterClick = (event) => {
    setAccessible(true);
    selectDraggable(event);
    activeElement = event;
  };

  const dropOnList = (item) => {
    if (selectedDraggable.source === "pipette") {
      if (!validWaterSample.includes(item.id)) {
        toggleHotspotPopupHandler("invalid_sample_test");
      } else {
        setDroppedElements((val) => [
          ...val,
          {
            type: selectedDraggable.source,
            id: item.id,
            class: selectedDraggable.sourceclass,
          },
        ]);
      }
    }
  };

  const toolTipShow = (e) => {
    const div = e.currentTarget.previousSibling.children[0];
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

  const videoEnded = () => {
    setTimeout(() => {
      setShowVideo(false);
    });
  };

  const clickActionBtn = (id) => {
    if (id === "open") {
      openSpectrophotometer();
    } else if (id === "close") {
      closeSpectrophotometer();
    } else if (id === "start") {
      setTimeout(() => {
        toggleHotspotPopupHandler("water_level_map");
      }, 2000);
      setDisableDraggableButton((val) => ({
        ...val,
        start: true,
      }));
    }
  };

  const openSpectrophotometer = () => {
    animationContainerRef.current.classList.remove("hide");
    animationContainerRef.current.classList.add("open", "start");
    addEventListener();
  };

  const closeSpectrophotometer = () => {
    animationContainerRef.current.classList.remove("hide");
    animationContainerRef.current.classList.add("close", "start");
    addEventListener();
  };

  const addEventListener = () => {
    if (animationContainerRef && animationContainerRef.current) {
      animationContainerRef.current.addEventListener("animationend", (e) => {
        const classList = animationContainerRef.current.classList;
        if (classList.contains("open")) {
          setOpenCloseBtn("open");
        } else if (classList.contains("close")) {
          setOpenCloseBtn("close");
          setDisableDraggableButton((val) => ({
            ...val,
            start: false,
          }));
        }
        animationContainerRef.current.classList.remove(
          "open",
          "close",
          "start"
        );
        animationContainerRef.current.classList.add("hide");
        animationContainerRef.current.removeEventListener(
          "animationend",
          () => {}
        );
      });
    }
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
        {showVideo ? (
          <Video
            src={videoUrl}
            autoplay={true}
            hidePlayBtn={true}
            videoEnded={videoEnded}
            updateAriaLiveText={updateAriaLiveText}
            muted={true}
            ariaLabel="The micropipette moves to pick up a pipette tip. It takes solution from the first test tube and then drops the solution on one spectrometer filament. The micropipette then drops the pipette tip in a cup. A new pipette tip is placed on the micropipette. The micropipette picks up solution from the second test tube and drops it on the other spectrometer filament. The tip is then dropped in a cup."
          />
        ) : (
          ""
        )}
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
          <div
            className={`${val.class} ${
              disableDraggableButton[val.type] ? "hidden" : ""
            }`}
            key={`draggable${val.id}`}
          >
            <div
              className={`draggable`}
              data-source={val.type}
              data-sourceclass={val.class}
              aria-hidden="true"
              onClick={(e) =>
                arrowsEnterClick({
                  source: val.type,
                  sourceclass: val.class,
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
              className="dragingbtn12"
              data-source={val.type}
              data-sourceclass={val.class}
              disabled={disableDraggableButton[val.type]}
              onClick={(e) =>
                arrowsEnterClick({
                  source: val.type,
                  sourceclass: val.class,
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
        <div
          ref={animationContainerRef}
          className="spectrophotometer_animation"
        />
        {tab3.slide3.actionBtns.map((val) => (
          <button
            key={`action_btn_${val.id}`}
            className={`action_btn ${val.class} ${
              val.id === "open" || val.id === "close"
                ? openCloseBtn === val.id
                  ? "hide"
                  : ""
                : ""
            }`}
            disabled={disableDraggableButton[val.id]}
            onClick={(e) => clickActionBtn(val.id)}
            tabIndex={isPopupActive ? "-1" : null}
            aria-label={val.label}
          >
            {val.lable}
          </button>
        ))}
      </div>
      <div
        className={`discover-alert-popup ${!showPopup.status ? "hidden" : ""}`}
      >
        <div className="popup-container">
          <div className="header">
            <div className="close_action">
              <div>
                <Tooltip
                  title={popups.closeButton}
                  classes="Close"
                  id={popups.closeButton}
                  position="left"
                />
              </div>
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
