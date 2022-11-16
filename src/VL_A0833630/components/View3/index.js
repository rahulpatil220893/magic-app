import React from "react";
import DrawingWrapperContainer from "../../containers/DrawingWrapperContainer";
import { print as Print } from "../../../app/helpers";
import ScalableWrapperContainer from "../../containers/ScalableWrapperContainer";
import { Slide } from "../../../app/components/Carousel";
import Activity from "./activity";
import ConcludeTabCarouselContainer from "../../containers/ConcludeTabCarouselContainer";
import Audio from "../../containers/AudioConatiner";
import DiscoverMapPopup from "../popup/discoverMapPopup";
import { activeDrawing } from "../../actions";
import HotspotConatiner from "../../containers/HotspotConatiner";
import MicroscopeActivity from "./MicroscopeActivity";
import WatersampleActivity from "./WatersampleActivity";

class View3 extends React.Component {
  constructor(props) {
    super(props);
    this.subTabIndex = 0;
    this.disableStickynote = false;
    this.state = {
      stickyCount: 0,
      canvasHeight: null,
      hotspotPopup: false,
      textHeight2: "0px",
      shipOnScreen: 0,
      currentSubTab: 0,
      mapPopupHandlerState: false,
      deleteActiveElements: false,
      disableResetBtn: true,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      this.props.currentTab !== this.props.index &&
      newProps.currentTab === this.props.index
    ) {
      this.props.onChangeSubTab(this.subTabIndex);
      this.getTabIndex();
      this.props.onChangeSubTab(this.state.currentSubTab);
    }
    if (this.props.currentSubTab != newProps.currentSubTab) {
      if (newProps.currentTab == 2) {
        this.setState({
          currentSubTab: newProps.currentSubTab,
        });
      }
    }
    if (
      this.props.currentSubTab != 3 &&
      newProps.currentSubTab === 3 &&
      newProps.currentTab == newProps.index
    ) {
      setTimeout(() => {
        this.imageConatnerRef.focus();
      }, 200);
    }

    // @desc restore the discover ship for tincan
    if (
      this.props.markedActivities[2]?.length !==
      newProps.markedActivities[2]?.length
    ) {
      if (newProps.markedActivities[2]?.length == 3) {
        if (this.state.shipOnScreen == 0) {
          this.setState({
            shipOnScreen: 0,
          });
        }
      } else {
        this.setState({
          shipOnScreen: newProps.markedActivities[2]?.length || 0,
        });
      }
    }
    if (
      newProps.widthChange.windowSize !== this.props.widthChange.windowSize ||
      newProps.isPopupActive != this.props.isPopupActive
    ) {
      this.getTabIndex();
    }
    if (
      newProps.currentHotspotPopup.length !==
        this.props.currentHotspotPopup.length ||
      newProps.isPopupActive != this.props.isPopupActive
    ) {
      this.getTabIndex();
    }

    if (this.props.currentSubTab === 1 && this.props.currentTab === 1) {
      this.props.markCompletedActivity(1, 1);
    }
  }
  getTabIndex = () => {
    const div = document.querySelector(".vl-discover-right-text-container");
    const div1 = document.querySelector(".vl-discover-container");
    const responsive = document.querySelector(".vl-responsive-wrapper");
    if (div1) {
      const div2 = div1.querySelector(".vl-scalable-container");
      setTimeout(() => {
        const valueArray = window
          .getComputedStyle(div2)
          .transform.replace("matrix(", "")
          .split(",");
        const canvas = div1
          .querySelectorAll(".vl-canvas-container")[0]
          .querySelector("canvas");
        if (!(isTablet && (isSafari || isAndroid))) {
          if (
            (responsive &&
              responsive.classList[3] == "large" &&
              Number(valueArray[0]) < 1) ||
            (responsive.classList[3] == "medium" && Number(valueArray[0]) < 1)
          ) {
            const scale = Number(valueArray[0]) * 2;
            canvas.style.transform = "scale(" + scale + ")";
          } else {
            canvas.removeAttribute("transform");
          }
        } else {
          if (
            isTablet &&
            isSafari &&
            responsive &&
            responsive.classList[2] == "landscape"
          ) {
            const scale = Number(valueArray[0]) * 1.3;
            canvas.style.transform = "scale(" + scale + ")";
          } else if (isAndroid) {
            const scale = Number(valueArray[0]) * 1.8;
            canvas.style.transform = "scale(" + scale + ")";
          }
        }
      }, 10);
    }
    if (div) {
      return div.scrollHeight > div.clientHeight && !this.props.isPopupActive
        ? "0"
        : "-1";
    } else {
      return "-1";
    }
  };

  alertPopup = (display, message) => {
    this.setState({
      displayAlertPopup: display,
      alert_msg: message,
    });
  };

  resetHandler1 = () => {
    $("#drag1, #drag2, #drag3, #drag4, #drag5, #drag6").removeClass(
      "disabledraggable"
    );
    $(
      "#drag1 button, #drag2 button, #drag3 button, #drag4 button, #drag5 button, #drag6 button"
    ).removeAttr("disabled");
    // setTimeout(() => {
    this.setState({
      deleteActiveElements: true,
    });

    // });
  };
  deleteelements1 = () => {
    this.setState({
      deleteActiveElements: false,
    });
  };
  resetHandler2 = () => {
    // slide2
    //buttons
    $(`#drag11`).find("button").attr("disabled", false);
    $(`#drag12`).find("button").attr("disabled", false);
    $(`#drag13`).find("button").attr("disabled", false);
    $(`#drag14`).find("button").attr("disabled", false);
    $(`#drag15`).find("button").attr("disabled", false);
    $(`#drag16`).find("button").attr("disabled", false);
    //images clear
    // $(`div`).remove(".dropped-item");
    $(`#drag11`).removeClass("disabledraggable");
    $(`#drag12`).removeClass("disabledraggable");
    $(`#drag13`).removeClass("disabledraggable");
    $(`#drag14`).removeClass("disabledraggable");
    $(`#drag15`).removeClass("disabledraggable");
    $(`#drag16`).removeClass("disabledraggable");
    // setTimeout(() => {
    this.setState({
      deleteActiveElements: true,
    });
    // });
  };
  resetHandler3 = () => {
    // slide3
    //buttons
    $(`#drag21`).find("button").attr("disabled", false);
    $(`#drag22`).find("button").attr("disabled", false);
    $(`#drag23`).find("button").attr("disabled", false);
    $(`#drag24`).find("button").attr("disabled", false);
    //images clear
    // $(`div`).remove(".dropped-item");
    $(`#drag21`).removeClass("disabledraggable");
    $(`#drag22`).removeClass("disabledraggable");
    $(`#drag23`).removeClass("disabledraggable");
    $(`#drag24`).removeClass("disabledraggable");
    // setTimeout(() => {
    this.setState({
      deleteActiveElements: true,
    });
    // });
  };

  resetDrop = () => {
    // this.props.setDisableRest(false);
  };

  calculateCanvasDimension = () => {
    const hasHorizontalScrollbar =
      this.dndWrapperRef.scrollWidth > this.dndWrapperRef.clientWidth;
    const hasVerticalScrollbar =
      this.dndWrapperRef.scrollHeight > this.dndWrapperRef.clientHeight;

    if (hasVerticalScrollbar) {
      this.setState({
        canvasHeight: this.dndWrapperRef.scrollHeight,
      });
    } else {
      this.setState({
        canvasHeight: null,
      });
    }
  };
  getTabIndex = () => {
    setTimeout(() => {
      const divs = document.querySelectorAll(
        ".vl-discover-right-text-container"
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
      scale,
      index,
      t,
      updateAriaLiveText,
      currentSubTab,
      togglePopup,
      setPopupMessage,
      checkedDrop,
      resetDropperValue,
      setDropped,
      dropItem,
      setAccessible,
      isAccessible,
      selectDraggable,
      selectedDraggable,
      markedActivities,
      markCompletedActivity,
      currentTab,
      currentLangData: { tab3 },
      currentLangData,
      resetAllActivities,
      defaultLang,
      isPopupActive,
      currentHotspotPopup,
      toggleHotspotPopup,
      updateFocusTooltip,
    } = this.props;
    const completed = markedActivities?.[currentTab];
    return (
      <div className="vl-discover-container">
        {this.state.mapPopupHandlerState ? (
          <DiscoverMapPopup
            closeHandler={this.showMapHandler}
            currentLangData={currentLangData}
            currentSubTab={currentSubTab}
            currentTab={currentTab}
            defaultLang={defaultLang}
            isPopupActive={isPopupActive}
          />
        ) : (
          ""
        )}
        <ConcludeTabCarouselContainer currentLangData={currentLangData}>
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
            <div className="vl-discover">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={0}>
                <div className="vl-discover-left">
                  <MicroscopeActivity
                    markCompletedActivity={markCompletedActivity}
                    updateAriaLiveText={updateAriaLiveText}
                    currentSubTab={currentSubTab}
                    currentTab={currentTab}
                    tab={0}
                    currentLangData={currentLangData}
                    resetAllActivities={resetAllActivities}
                    isPopupActive={isPopupActive}
                    screenIndex={index}
                    subTabIndex={this.subTabIndex}
                    toggleHotspotPopup={toggleHotspotPopup}
                    currentHotspotPopup={currentHotspotPopup}
                    selectedDraggable={selectedDraggable}
                    selectDraggable={selectDraggable}
                    setAccessible={setAccessible}
                    isAccessible={isAccessible}
                    dropzone={tab3.slide1.dropzone}
                    draggableImg={tab3.slide1.draggableImg}
                  />
                </div>
                <div className="vl-discover-right">
                  {currentLangData.hotSpotData31
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
                  <div className="vl-audio-container">
                    <Audio
                      audiosrc={currentLangData.tab3.slide1.audio}
                      oldProps={this.props}
                      t={t}
                    />
                  </div>
                  <div
                    className="text-container vl-discover-right-text-container"
                    aria-hidden={this.state.mapPopupHandlerState}
                    tabIndex={this.state.mapPopupHandlerState ? "-1" : "0"}
                    dangerouslySetInnerHTML={{
                      __html: currentLangData.tab3.slide1.body,
                    }}
                  />
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
          <Slide completed={completed?.includes(1) ? "true" : null}>
            <div className="vl-canvas-container">
              <DrawingWrapperContainer
                screenIndex={2}
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
            <div className="vl-discover">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={1}>
                <div className="vl-discover-left">
                  <div
                    className="image-container"
                    role="img"
                    aria-hidden={
                      !currentLangData.tab3.slide2.imgAlt ? "true" : null
                    }
                    tabIndex={currentLangData.tab3.slide2.imgAlt ? "-1" : null}
                    aria-label={
                      currentLangData.tab3.slide2.imgAlt
                        ? currentLangData.tab3.slide2.imgAlt
                        : null
                    }
                  />
                </div>
                <div className="vl-discover-right">
                  <div className="vl-audio-container">
                    <Audio
                      audiosrc={currentLangData.tab3.slide2.audio}
                      oldProps={this.props}
                    />
                  </div>
                  <div
                    className="text-container vl-discover-right-text-container"
                    dangerouslySetInnerHTML={{
                      __html: currentLangData.tab3.slide2.body,
                    }}
                  />
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
            <div className="vl-discover">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={2}>
                <div className="vl-discover-left">
                  {/* <Activity
                    deleteelements1={this.deleteelements1}
                    resetHandler3={this.resetHandler3}
                    updateFocusTooltip={updateFocusTooltip}
                    toggleHotspotPopup={toggleHotspotPopup}
                    currentHotspotPopup={currentHotspotPopup}
                    thisback={tab3.slide3.thisback}
                    scale={scale}
                    draggableImg={tab3.slide3.draggableImg}
                    dropzone={tab3.slide3.dropzone}
                    imgAlt={tab3.slide3.imgAlt}
                    deleteActiveElements={this.state.deleteActiveElements}
                    resetDrop={this.resetDrop}
                    buttontext={tab3.slide3}
                    commonDropZone={tab3.slide3.commonDropZone}
                    updateAriaLiveText={updateAriaLiveText}
                    markCompletedActivity={markCompletedActivity}
                    imgAlt2={tab3.slide3.imgAlt}
                    defaultImg={tab3.slide3.defaultImg}
                    t={this.props.t}
                    screenIndex={index}
                    arrowTopBottom={false}
                    arrowLeftRight={true}
                    bottomArrow={false}
                    currentSubTab={currentSubTab}
                    currentTab={currentTab}
                    dropItem={dropItem}
                    togglePopup={togglePopup}
                    setPopupMessage={setPopupMessage}
                    checkedDrop={checkedDrop}
                    setDropped={setDropped}
                    resetDropperValue={resetDropperValue}
                    selectedDraggable={selectedDraggable}
                    selectDraggable={selectDraggable}
                    setAccessible={setAccessible}
                    isAccessible={isAccessible}
                    shipOnScreen={this.state.shipOnScreen}
                    setShipposition={this.setShipposition}
                    tab={2}
                    showMapHandler={this.showMapHandler}
                    currentLangData={currentLangData}
                    resetAllActivities={resetAllActivities}
                    mapShow={this.state.mapPopupHandlerState}
                    defaultLang={defaultLang}
                    isPopupActive={isPopupActive}
                  /> */}
                  <WatersampleActivity
                    tab={2}
                    toggleHotspotPopup={toggleHotspotPopup}
                    currentHotspotPopup={currentHotspotPopup}
                    updateAriaLiveText={updateAriaLiveText}
                    markCompletedActivity={markCompletedActivity}
                    t={this.props.t}
                    selectedDraggable={selectedDraggable}
                    selectDraggable={selectDraggable}
                    setAccessible={setAccessible}
                    isAccessible={isAccessible}
                    currentLangData={currentLangData}
                    isPopupActive={isPopupActive}
                  />
                </div>
                <div className="vl-discover-right">
                  <div className="vl-audio-container">
                    <Audio
                      audiosrc={currentLangData.tab3.slide3.audio}
                      oldProps={this.props}
                    />
                  </div>
                  <div
                    className="text-container vl-discover-right-text-container"
                    dangerouslySetInnerHTML={{
                      __html: currentLangData.tab3.slide3.body,
                    }}
                  />
                </div>
              </ScalableWrapperContainer>
            </div>
          </Slide>
        </ConcludeTabCarouselContainer>
      </div>
    );
  }
}

export default View3;
