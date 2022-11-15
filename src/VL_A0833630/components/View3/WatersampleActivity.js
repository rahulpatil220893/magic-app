import React, { createRef } from "react";
import { useState } from "react";
const WatersampleActivity = (props) => {
  const {
    toggleHotspotPopup,
    currentLangData,
    currentHotspotPopup,
    markCompletedActivity,
    isPopupActive,
  } = props;
  const { hotSpotData33, commonWords, tab3 } = currentLangData;
  const [hotSpotsVisited, setHotSpotsVisited] = useState([]);

  let dndRef = createRef(null);
  let activeElement = createRef(null);

  const toggleHotspotPopupHandler = (index) => {
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
    if (!hotSpotsVisited.includes(index)) {
      setHotSpotsVisited((val) => [...val, index]);
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
      </div>
    </div>
  );
};

export default WatersampleActivity;
