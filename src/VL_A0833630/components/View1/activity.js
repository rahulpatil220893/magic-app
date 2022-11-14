import React from "react";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotSpotsVisited: [],
    };
  }

  toggleHotspotPopupHandler = (index) => {
    const {
      toggleHotspotPopup,
      currentHotspotPopup,
      markCompletedActivity,
      currentLangData: { hotSpotDataIntroduce },
    } = this.props;

    const { hotSpotsVisited } = this.state;
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);

    if (!hotSpotsVisited.includes(index)) {
      this.setState(
        {
          hotSpotsVisited: [...this.state.hotSpotsVisited, index],
        },
        () => {
          if (
            this.state.hotSpotsVisited.length + 1 ===
            hotSpotDataIntroduce.length
          ) {
            markCompletedActivity(0, 1);
          }
        }
      );
    }
  };

  render() {
    const {
      currentSubTab,
      isPopupActive,
      currentLangData: { tab1, commonWords, hotSpotDataIntroduce },
      currentHotspotPopup,
    } = this.props;

    const _currentSubTab = currentSubTab + 1;

    return (
      <>
        <div
          className={`image-container`}
          role="img"
          aria-label={tab1[`slide${_currentSubTab}`]?.imgAlt}
        />
        <div className={`vl-explore-activity-container tab1`}>
          {hotSpotDataIntroduce
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
                    this.state.hotSpotsVisited.includes(val.id) ? "active" : ""
                  }`}
                  onClick={() => this.toggleHotspotPopupHandler(val.id)}
                  tabIndex={isPopupActive ? "-1" : null}
                  aria-label={`${val.label} ${
                    currentHotspotPopup.includes(val.id)
                      ? commonWords.selected
                      : ""
                  } ${
                    this.state.hotSpotsVisited.includes(val.id) ? "visited" : ""
                  }`}
                  id={val.id}
                >
                  <span>{val.label}</span>
                </button>
              </React.Fragment>
            ))}
        </div>
      </>
    );
  }
}

export default Activity;
