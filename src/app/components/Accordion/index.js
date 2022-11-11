import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Audio from "../Audio";

const Accordion = (props) => {
  const {
    data,
    currentTab,
    currentSubTab,
    audioOverlap,
    upadateAudioOverLap,
    defaultLang,
  } = props;

  const [audioStop, setAudioStop] = useState(false);

  const accordionClickHandler = (num) => {
    setAudioStop(true);
    data.map((element, index) => {
      if (index == num) {
        let expandedValue =
          $(`#accordion-btn${index}`).attr("aria-expanded") === "true";
        $(`#sect${index}`).toggleClass("show-accordion-body");
        $(`#sect${index}`).parent().toggleClass("active");
        $(`#accordion-btn${index}`)
          .toggleClass("btnClicked")
          .attr("aria-expanded", !expandedValue);
      } else {
        $(`#sect${index}`).removeClass("show-accordion-body");
        $(`#accordion-btn${index}`).removeClass("btnClicked");
        $(`#sect${index}`).parent().removeClass("active");
      }
    });
  };

  return (
    <div className="accordion-container">
      {data.map((element, index) => {
        return (
          <div className="accordion-item" key={index}>
            <div className="vl-audio-container">
              <Audio
                audiosrc={element.headingAudio}
                currentTab={currentTab}
                currentSubTab={currentSubTab}
                audioOverlap={audioOverlap}
                upadateAudioOverLap={upadateAudioOverLap}
                defaultLang={defaultLang}
                audioStop={audioStop}
                setAudioStop={setAudioStop}
              />
            </div>
            <h3 className="accordion-header" id={`heading${index}`}>
              <button
                id={`accordion-btn${index}`}
                className="accordion-button vl-globalbutton"
                type="button"
                aria-expanded="false"
                aria-controls={`sect${index}`}
                aria-label={`${element?.label}`}
                onClick={() => accordionClickHandler(index)}
              >
                {element.heading}
              </button>
            </h3>
            <div
              id={`sect${index}`}
              className="accordion-body"
              aria-labelledby={`heading${index}`}
              role="region"
            >
              <div className="vl-audio-container">
                <Audio
                  audiosrc={element.descriptionAudio}
                  currentTab={currentTab}
                  currentSubTab={currentSubTab}
                  audioOverlap={audioOverlap}
                  upadateAudioOverLap={upadateAudioOverLap}
                  defaultLang={defaultLang}
                  audioStop={audioStop}
                  setAudioStop={setAudioStop}
                />
              </div>
              <div
                className="accordion-text"
                dangerouslySetInnerHTML={{ __html: element.description }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  data: PropTypes.array.isRequired,
  currentSubTab: PropTypes.any.isRequired,
  currentTab: PropTypes.any.isRequired,
};

export default Accordion;
