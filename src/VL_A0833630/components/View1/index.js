import React from "react";
import { withTranslation } from "react-i18next";
import ScalableWrapperContainer from "../../containers/ScalableWrapperContainer";
import DrawingWrapperContainer from "../../containers/DrawingWrapperContainer";
import AudioContainer from "../../containers/AudioConatiner";
import HotspotConatiner from "../../containers/HotspotConatiner";
import ExploreTabCarouselContainer from "../../containers/ExploreTabCarouselContainer";
import { Slide } from "../../../app/components/Carousel";
import Activity from "./activity";

class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.subTabIndex = 0;
    this.state = {
      hotspotPopup: false,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      this.props.currentTab !== this.props.index &&
      newProps.currentTab === this.props.index
    ) {
      this.props.onChangeSubTab(this.subTabIndex);
      const tabpanel = document.getElementById("tabPanels");
      tabpanel.style.height = null;
    }
    if (newProps.currentHotspotPopup.length > 0) {
      this.setState({ hotspotPopup: true });
    } else if (this.subTabIndex == newProps.currentSubTab) {
      this.setState({ hotspotPopup: false });
    }
    if (newProps.currentTab === this.props.index) {
      if (this.subTabIndex !== newProps.currentSubTab) {
        this.subTabIndex = newProps.currentSubTab;
      }
    }
    if (newProps.widthChange.windowSize !== this.props.widthChange.windowSize) {
      this.getTabIndex();
    }
    if (
      this.props.subScreenIndex !== this.props.currentSubTab &&
      newProps.currentSubTab === this.props.subScreenIndex &&
      newProps.currentTab == newProps.screenIndex
    ) {
      let audioElement = document.querySelectorAll(
        ".tab-panels .active .vl-carousel-slide-container.active .vl-audio-play-icon"
      )[0];
      setTimeout(() => {
        if (this.imageContainerRef) {
          let label = this.imageContainerRef.getAttribute("aria-label");
          if (label && label != "") {
            this.imageContainerRef.focus();
          } else if (audioElement) {
            audioElement.focus();
          }
        }
      }, 200);
    }
  }

  getTabIndex = () => {
    const div = document.querySelector(".text-container");
    if (div) {
      return div.scrollHeight > div.clientHeight && !this.props.isPopupActive
        ? "0"
        : "-1";
    } else {
      return "-1";
    }
  };

  render() {
    const {
      index,
      labelHtml,
      currentTab,
      currentSubTab,
      isPopupActive,
      ariaHidden,
      currentLangData,
      currentLangData: { tab1 },
      t,
      markedActivities,
      currentHotspotPopup,
      toggleHotspotPopup,
      updateFocusTooltip,
      isAccessible,
      setAccessible,
      updateAriaLiveText,
      markCompletedActivity,
      pauseActivity,
    } = this.props;
    const ariaLabel = tab1.slide1.imgAlt;
    const completed = markedActivities?.[currentTab];
    return (
      <div className="vl-introduce-container">
        <ExploreTabCarouselContainer currentLangData={currentLangData}>
          <Slide completed={completed?.includes(0) ? "true" : null}>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={0}
                orientation="landscape"
              />
            </div>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={0}
                orientation="portrait"
              />
            </div>
            <div className="vl-introduce">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={0}>
                <div className="vl-introduce-left tab1">
                  <div
                    className="image-container"
                    ref={(div) => {
                      this.imageContainerRef = div;
                    }}
                    role="img"
                    aria-hidden={!ariaLabel ? "true" : null}
                    tabIndex={ariaLabel ? "-1" : null}
                    aria-label={ariaLabel ? ariaLabel : null}
                  >
                    {labelHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: labelHtml }} />
                    ) : null}
                  </div>
                </div>
                <div className="vl-introduce-right">
                  {tab1.slide1.audio && (
                    <div className="vl-audio-container">
                      <AudioContainer
                        audiosrc={tab1.slide1.audio}
                        currentTab={currentTab}
                        currentSubTab={currentSubTab}
                        isPopupActive={isPopupActive}
                        ariaHidden={ariaHidden}
                        tabIndex={this.getTabIndex()}
                      />
                    </div>
                  )}
                  <div className="text-container" tabIndex={this.getTabIndex()}>
                    {tab1.slide1.heading && (
                      <h2 className="boldText">{tab1.slide1.heading}</h2>
                    )}
                    <div
                      dangerouslySetInnerHTML={{ __html: tab1.slide1.body }}
                    />
                    {labelHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: labelHtml }} />
                    ) : null}
                  </div>
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
          <Slide completed={completed?.includes(1) ? "true" : null}>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={0}
                orientation="landscape"
              />
            </div>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={0}
                orientation="portrait"
              />
            </div>
            <div className="vl-explore">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={1}>
                <div className="vl-explore-left">
                  {currentLangData.hotSpotDataIntroduce
                    .filter((val) => val.type.includes("left"))
                    .map((hotSpot, index) => {
                      return (
                        <HotspotConatiner
                          data={hotSpot}
                          currentLangData={currentLangData}
                          key={`hotSpot_${index}`}
                          updateAriaLiveText={updateAriaLiveText}
                        />
                      );
                    })}
                  <Activity
                    //t={this.props.t}
                    markCompletedActivity={markCompletedActivity}
                    pauseActivity={pauseActivity}
                    screenIndex={index}
                    updateAriaLiveText={updateAriaLiveText}
                    isPopupActive={isPopupActive}
                    isAccessible={isAccessible}
                    setAccessible={setAccessible}
                    toggleHotspotPopup={toggleHotspotPopup}
                    currentHotspotPopup={currentHotspotPopup}
                    currentTab={currentTab}
                    currentSubTab={currentSubTab}
                    currentLangData={currentLangData}
                    updateFocusTooltip={updateFocusTooltip}
                  />
                </div>
                <div className="vl-explore-right">
                  {currentLangData.hotSpotDataIntroduce
                    .filter((val) => val.type.includes("right"))
                    .map((hotSpot, index) => {
                      return (
                        <HotspotConatiner
                          data={hotSpot}
                          currentLangData={currentLangData}
                          key={`hotSpot_${index}`}
                          updateAriaLiveText={updateAriaLiveText}
                        />
                      );
                    })}
                  <div
                    className="vl-explore-right-text-parent"
                    aria-hidden={
                      currentHotspotPopup.length &&
                      currentHotspotPopup[0].includes("hotspot0")
                        ? true
                        : null
                    }
                    tabIndex={
                      currentHotspotPopup.length &&
                      currentHotspotPopup[0].includes("hotspot0")
                        ? "-1"
                        : null
                    }
                  >
                    <div className="vl-audio-container">
                      <AudioContainer
                        audiosrc={tab1.slide2.audio}
                        oldProps={this.props}
                        // disabled={
                        //   this.props.currentHotspotPopup.length &&
                        //   this.props.currentHotspotPopup[0].includes("hotspot0")
                        //     ? true
                        //     : false
                        // }
                      />
                    </div>
                    <div
                      className="vl-explore-right-text-container"
                      tabIndex={currentHotspotPopup.length ? "-1" : "0"}
                      dangerouslySetInnerHTML={{
                        __html: tab1.slide2.body,
                      }}
                    />
                  </div>
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
        </ExploreTabCarouselContainer>
        <div className="vl-indroduce-footer"></div>
      </div>
    );
  }
}

export default withTranslation()(View1);
