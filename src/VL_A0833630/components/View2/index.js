import React from "react";
import DrawingWrapperContainer from "../../containers/DrawingWrapperContainer";
import { Slide } from "../../../app/components/Carousel";
import ExploreTabCarouselContainer from "../../containers/ExploreTabCarouselContainer";
import ScalableWrapperContainer from "../../containers/ScalableWrapperContainer";
import Activity from "./activity";
import AudioContainer from "../../containers/AudioConatiner";
import HotspotConatiner from "../../containers/HotspotConatiner";
import { withTranslation } from "react-i18next";
class View2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pauseActivity: false,
      currentSubTab: 0,
    };
    window.addEventListener("resize", this.getTabIndex());
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      this.props.currentTab !== this.props.index &&
      newProps.currentTab === this.props.index
    ) {
      this.getTabIndex();
      this.props.onChangeSubTab(this.state.currentSubTab);
      const tabpanel = document.getElementById("tabPanels");
      tabpanel.style.height = null;
    }
    if (this.props.currentSubTab != newProps.currentSubTab) {
      if (newProps.currentTab == 1) {
        this.setState({
          currentSubTab: newProps.currentSubTab,
        });
      }
    }
    if (
      this.props.currentTab === this.props.index &&
      newProps.currentTab !== this.props.index
    ) {
      this.setState({ pauseActivity: true });
    }
    if (newProps.widthChange.windowSize !== this.props.widthChange.windowSize) {
      this.getTabIndex();
    }
  }

  getTabIndex = () => {
    setTimeout(() => {
      const divs = document.querySelectorAll(
        ".vl-explore-right-text-container"
      );
      divs.forEach((div) => {
        if (div) {
          div.setAttribute(
            "tabIndex",
            div.scrollHeight > div.clientHeight &&
              !this.props.isPopupActive &&
              this.props.currentHotspotPopup.length == 0
              ? "0"
              : "-1"
          );
        }
      });
    });
  };

  render() {
    const {
      index,
      isPopupActive,
      ariaHidden,
      updateAriaLiveText,
      t,
      currentTab,
      currentSubTab,
      markCompletedActivity,
      markedActivities,
      currentLangData,
      isAccessible,
      setAccessible,
      updateFocusTooltip,
    } = this.props;
    const { pauseActivity } = this.state;
    const _isPopupActive = isPopupActive ? "-1" : "0";
    const completed = markedActivities?.[currentTab];
    return (
      <div className="vl-explore-container" aria-hidden={ariaHidden}>
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
            <div className="vl-explore">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={0}>
                <div className="vl-explore-left">
                  <Activity
                    //t={this.props.t}
                    markCompletedActivity={markCompletedActivity}
                    pauseActivity={pauseActivity}
                    screenIndex={index}
                    updateAriaLiveText={updateAriaLiveText}
                    isPopupActive={isPopupActive}
                    isAccessible={isAccessible}
                    setAccessible={setAccessible}
                    tab={1}
                    toggleHotspotPopup={this.props.toggleHotspotPopup}
                    currentHotspotPopup={this.props.currentHotspotPopup}
                    currentTab={currentTab}
                    currentSubTab={currentSubTab}
                    currentLangData={currentLangData}
                    updateFocusTooltip={updateFocusTooltip}
                  />
                </div>
                <div className="vl-explore-right">
                  {currentLangData.hotSpotData.map((hotSpot, index) => {
                    return (
                      <HotspotConatiner
                        data={hotSpot}
                        currentLangData={currentLangData}
                        key={`hotSpot_${index}`}
                      />
                    );
                  })}
                  <div
                    className="vl-explore-right-text-parent"
                    aria-hidden={
                      this.props.currentHotspotPopup.length &&
                      this.props.currentHotspotPopup[0].includes("hotspot0")
                        ? true
                        : null
                    }
                    tabIndex={
                      this.props.currentHotspotPopup.length &&
                      this.props.currentHotspotPopup[0].includes("hotspot0")
                        ? "-1"
                        : null
                    }
                  >
                    <div className="vl-audio-container">
                      <AudioContainer
                        audiosrc={currentLangData.tab2.slide1.audio}
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
                      tabIndex={
                        this.props.currentHotspotPopup.length ? "-1" : "0"
                      }
                      dangerouslySetInnerHTML={{
                        __html: currentLangData.tab2.slide1.body,
                      }}
                    />
                  </div>
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
          <Slide completed={completed?.includes(1) ? "true" : null}>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={1}
                orientation="landscape"
              />
            </div>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={1}
                orientation="portrait"
              />
            </div>
            <div className="vl-explore">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={1}>
                <div className="vl-explore-left">
                  <Activity
                    //t={this.props.t}
                    markCompletedActivity={markCompletedActivity}
                    pauseActivity={pauseActivity}
                    screenIndex={index}
                    updateAriaLiveText={updateAriaLiveText}
                    isPopupActive={isPopupActive}
                    isAccessible={isAccessible}
                    setAccessible={setAccessible}
                    tab={2}
                    toggleHotspotPopup={this.props.toggleHotspotPopup}
                    currentHotspotPopup={this.props.currentHotspotPopup}
                    currentTab={currentTab}
                    currentSubTab={currentSubTab}
                    currentLangData={currentLangData}
                    updateFocusTooltip={updateFocusTooltip}
                  />
                </div>
                <div className="vl-explore-right">
                  {currentLangData.hotSpotData1.map((hotSpot, index) => {
                    return (
                      <HotspotConatiner
                        data={hotSpot}
                        currentLangData={currentLangData}
                        key={`hotSpot_${index}`}
                      />
                    );
                  })}
                  <div
                    className="vl-explore-right-text-parent"
                    aria-hidden={
                      this.props.currentHotspotPopup.length &&
                      this.props.currentHotspotPopup[0].includes("hotspot0")
                        ? true
                        : null
                    }
                    tabIndex={
                      this.props.currentHotspotPopup.length &&
                      this.props.currentHotspotPopup[0].includes("hotspot0")
                        ? "-1"
                        : null
                    }
                  >
                    <div className="vl-audio-container">
                      <AudioContainer
                        audiosrc={currentLangData.tab2.slide2.audio}
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
                      tabIndex={
                        this.props.currentHotspotPopup.length ? "-1" : "0"
                      }
                      dangerouslySetInnerHTML={{
                        __html: currentLangData.tab2.slide2.body,
                      }}
                    />
                  </div>
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
          <Slide completed={completed?.includes(2) ? "true" : null}>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={2}
                orientation="landscape"
              />
            </div>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={index}
                subScreenIndex={2}
                orientation="portrait"
              />
            </div>
            <div className="vl-explore">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={2}>
                <div className="vl-explore-left">
                  <Activity
                    //t={this.props.t}
                    markCompletedActivity={markCompletedActivity}
                    pauseActivity={pauseActivity}
                    screenIndex={index}
                    updateAriaLiveText={updateAriaLiveText}
                    isPopupActive={isPopupActive}
                    isAccessible={isAccessible}
                    setAccessible={setAccessible}
                    tab={3}
                    toggleHotspotPopup={this.props.toggleHotspotPopup}
                    currentHotspotPopup={this.props.currentHotspotPopup}
                    currentTab={currentTab}
                    currentSubTab={currentSubTab}
                    currentLangData={currentLangData}
                    updateFocusTooltip={updateFocusTooltip}
                  />
                </div>
                <div className="vl-explore-right">
                  {currentLangData.hotSpotData2.map((hotSpot, index) => {
                    return (
                      <HotspotConatiner
                        data={hotSpot}
                        currentLangData={currentLangData}
                        key={`hotSpot_${index}`}
                      />
                    );
                  })}
                  <div
                    className="vl-explore-right-text-parent"
                    aria-hidden={
                      this.props.currentHotspotPopup.length &&
                      this.props.currentHotspotPopup[0].includes("hotspot0")
                        ? true
                        : null
                    }
                    tabIndex={
                      this.props.currentHotspotPopup.length &&
                      this.props.currentHotspotPopup[0].includes("hotspot0")
                        ? "-1"
                        : null
                    }
                  >
                    <div className="vl-audio-container">
                      <AudioContainer
                        audiosrc={currentLangData.tab2.slide3.audio}
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
                      tabIndex={
                        this.props.currentHotspotPopup.length ? "-1" : "0"
                      }
                      dangerouslySetInnerHTML={{
                        __html: currentLangData.tab2.slide3.body,
                      }}
                    />
                  </div>
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
        </ExploreTabCarouselContainer>
      </div>
    );
  }
}
export default withTranslation()(View2);
