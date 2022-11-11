import React from "react";
import DrawingWrapperContainer from "../../containers/DrawingWrapperContainer";
import { Slide } from "../../../app/components/Carousel";
import ConcludeTabCarouselContainer from "../../containers/ConcludeTabCarouselContainer";

import ConcludeTextEditorContainer from "../../containers/ConcludeTextEditorContainer";
import { print as Print } from "../../../app/helpers";
import AudioContainer from "../../containers/AudioConatiner";
import { saveTincanData } from "../../../app/tincan";
import ScalableWrapperContainer from "../../containers/ScalableWrapperContainer";

class View4 extends React.Component {
  constructor(props) {
    super(props);
    this.subTabIndex = 0;
    this.sticky_count = 0;
    this.disableStickynote = false;
    this.disableResetBtn = true;
    this.dndWrapperRef = null;
    this.state = {
      textHeight2: "0px",
      currentSubTab: 0,
      stickyCount: 0,
      dropdown: TincanManager.data.concludeDropdown || {},
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      this.props.currentTab !== this.props.index &&
      newProps.currentTab === this.props.index
    ) {
      this.props.onChangeSubTab(this.state.currentSubTab);
      const tabpanel = document.getElementById("tabPanels");
      tabpanel.style.height = null;
    }
    if (this.props.currentSubTab != newProps.currentSubTab) {
      if (newProps.currentTab == 3) {
        this.setState({
          currentSubTab: newProps.currentSubTab,
        });
      }
    }
    if (newProps.widthChange.windowSize !== this.props.widthChange.windowSize) {
      this.getTabIndex();
      this.getRightSize();
    }
  }

  handlePrint = () => {
    const {
      currentLangData,
      currentSubTab,
      currentLangData: { tab4 },
    } = this.props;
    const element = document.querySelectorAll(
      ".vl-conclude-container .vl-carousel-slide-container.active"
    )[0];
    const printData = {};
    printData.title = currentLangData.labTitle;
    const _currentSubTab = currentSubTab + 1;
    printData.section =
      tab4[`slide${_currentSubTab}`].sectionNameForPrint || "";
    printData.footer = currentLangData.footer;
    Print(element, printData);
  };

  onchangeHandlerTextEditortab = (data, slildNumber) => {
    this.props.markCompletedActivity(2, slildNumber);
    setTimeout(() => {
      TincanManager.updateSectionTincanData(
        TincanManager.data,
        "section_3",
        `textEditor_${slildNumber + 1}`,
        { score: undefined, data }
      );
      saveTincanData();
    });
  };

  getTabIndex = () => {
    const div = document.querySelector(".container-v7");
    if (div) {
      return div.scrollHeight > div.clientHeight && !this.props.isPopupActive
        ? "0"
        : "-1";
    } else {
      return "-1";
    }
  };

  getRightSize = () => {
    const div = document.querySelector(".vl-conclude-right").parentElement;
    if (
      Number(div.style.width.replace("px", "")) != 0 &&
      Number(div.style.width.replace("px", "")) < 375
    ) {
      this.setState({
        class: "media-query",
      });
    } else {
      this.setState({
        class: "",
      });
    }
    if (
      Number(div.style.width.replace("px", "")) != 0 &&
      Number(div.style.width.replace("px", "")) < 450 &&
      Number(div.style.width.replace("px", "")) > 325
    ) {
      document
        .querySelector(".vl-conclude-right")
        .classList.add("media-symbol");
    } else {
      document
        .querySelector(".vl-conclude-right")
        .classList.remove("media-symbol");
    }
  };

  render() {
    const {
      index,
      t,
      currentTab,
      markedActivities,
      currentLangData,
      labelHtml,
      ariaHidden,
      isPopupActive,
      currentLangData: {
        tab4: { slide1, slide2, slide3, slide4 },
      },
    } = this.props;
    const completed = markedActivities?.[currentTab];
    const ariaLabel = slide1.imgAlt;
    let textEditor4Html;
    textEditor4Html = TincanManager.data.screens[2].elements.textEditor_1
      ? TincanManager.data.screens[2].elements.textEditor_1.data
      : "";
    return (
      <div className="vl-conclude-container">
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
            <div className="vl-conclude">
              <ScalableWrapperContainer screenIndex={index} subScreenIndex={0}>
                <div className="vl-conclude-left tab1">
                  <div
                    className="image-container"
                    ref={(div) => {
                      this.imageContainerRef = div;
                    }}
                    role="img"
                    aria-hidden={!ariaLabel ? "true" : null}
                    // tabIndex={!isPopupActive && ariaLabel ? "-1" : null}
                    aria-label={ariaLabel ? ariaLabel : null}
                  >
                    {labelHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: labelHtml }} />
                    ) : null}
                  </div>
                </div>
                <div className="vl-conclude-right">
                  <div className="vl-audio-container">
                    <AudioContainer audiosrc={slide1.audio} />
                  </div>
                  <div
                    className="text-container container-v7"
                    ref={(div) => (this.textRef2 = div)}
                  >
                    <div
                      className="text-area"
                      dangerouslySetInnerHTML={{
                        __html: slide1.body,
                      }}
                      tabIndex={isPopupActive ? "-1" : 0}
                    />
                    <div className="notebook-textEditor-container">
                      <ConcludeTextEditorContainer
                        toolbar={true}
                        printHandler={this.handlePrint}
                        placeholder={t(`tab4.slide1.placeHolderData`)}
                        onChange={(e) =>
                          this.onchangeHandlerTextEditortab(e, 0)
                        }
                        isPopupActive={isPopupActive}
                        html={textEditor4Html}
                        t={t}
                        // label={slide1.content}
                      />
                    </div>
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
            <div
              className="text-container container-v7"
              ref={(div) => (this.textRef2 = div)}
            >
              <div className="vl-audio-container">
                <AudioContainer audiosrc={slide2.audio} />
              </div>
              <div
                className="text-area"
                dangerouslySetInnerHTML={{
                  __html: slide2.body,
                }}
              />
              <div className="notebook-textEditor-container">
                <ConcludeTextEditorContainer
                  toolbar={true}
                  printHandler={this.handlePrint}
                  placeholder={t(`tab4.slide2.placeHolderData`)}
                  onChange={(e) => this.onchangeHandlerTextEditortab(e, 1)}
                  html={textEditor4Html}
                  t={t}
                  label={slide2.content}
                />
              </div>
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
            <div
              className="text-container container-v7"
              ref={(div) => (this.textRef2 = div)}
            >
              <div className="vl-audio-container">
                <AudioContainer audiosrc={slide3.audio} />
              </div>
              <div
                className="text-area"
                dangerouslySetInnerHTML={{
                  __html: slide3.body,
                }}
              />
              <div className="notebook-textEditor-container">
                <ConcludeTextEditorContainer
                  toolbar={true}
                  printHandler={this.handlePrint}
                  placeholder={t(`tab4.slide2.placeHolderData`)}
                  onChange={(e) => this.onchangeHandlerTextEditortab(e, 2)}
                  html={textEditor4Html}
                  t={t}
                  label={slide3.content}
                />
              </div>
            </div>
          </Slide>
        </ConcludeTabCarouselContainer>
      </div>
    );
  }
}

export default View4;
