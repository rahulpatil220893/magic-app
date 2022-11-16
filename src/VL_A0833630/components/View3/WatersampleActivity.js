import React, { createRef, useState, useEffect } from "react";
import AccessibleDnDList from "../../../app/components/AccessibleList";
import Tooltip from "../../../app/components/Tooltip";
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
  } = props;
  const { hotSpotData33, commonWords, tab3 } = currentLangData;
  const [hotSpotsVisited, setHotSpotsVisited] = useState([]);
  const [droppedElements, setDroppedElements] = useState([]);
  const [disableDraggableButton, setDisableDraggableButton] = useState(false);

  let dndRef = createRef(null);
  let activeElement = createRef(null);

  const toggleHotspotPopupHandler = (index) => {
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
    if (!hotSpotsVisited.includes(index)) {
      setHotSpotsVisited((val) => [...val, index]);
    }
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
          <div key={`draggable${val.id}`}>
            <div
              className={`div_${val.class} draggable`}
              data-source={val.type}
              data-class={val.class}
              aria-hidden="true"
              onClick={(e) =>
                this.arrowsEnterClick({
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
              className={`draggableBtn btn_${val.class}`}
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
        <div />
      </div>
    </div>
  );
};

export default WatersampleActivity;
