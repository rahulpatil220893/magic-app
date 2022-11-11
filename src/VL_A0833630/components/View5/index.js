import React from "react";
import { withTranslation } from "react-i18next";
import IntroduceDefaultViewContainer from "../../containers/IntroduceDefaultViewContainer";
import ScalableWrapperContainer from "../../containers/ScalableWrapperContainer";
import DrawingWrapperContainer from "../../containers/DrawingWrapperContainer";
import AudioContainer from "../../containers/AudioConatiner";
import ConcludeTextEditorContainer from "../../containers/ConcludeTextEditorContainer";
import { print } from "../../../app/helpers";
import StickyNotes from "../../containers/StickyNotesContainer";

class View5 extends React.Component {
  constructor(props) {
    super(props);
    this.subTabIndex = 0;
    this.sticky_count = 0;
    this.disableStickynote = false;
    this.disableResetBtn = true;
    this.dndWrapperRef = null;
    this.state = {
      currentSubTab: 0,
      hotspotPopup: false,
      stickyCount: 0,
      wrapperConatinerHeight: 0,
      canvasHeight: null,
      activatefunction: 0,
    };

    window.addEventListener("resize", this.handlesize());
  }
  // markactivity = () => {
  //   this.props.markCompletedActivity(4, 0);
  // };

  componentDidUpdate() {
    // const div = document.getElementsByClassName("icomoon-Pencil_2")
    // div[0].addEventListener('click', function () {
    //   console.log('lii')
    //   this.setState({
    //        activatefunction:1
    //   })
    // })
    const tabpanel = document.getElementById("tabPanels");
    setTimeout(() => {
      const portmed = document.getElementsByClassName("portrait");
      if (portmed[0] && this.props.currentTab == 4) {
        tabpanel.style.height = "85%";
      } else {
        if (tabpanel.style.height != null) {
          tabpanel.style.height = null;
        }
      }
    }, 10);

    if (this.props.isPopupActive) {
      const div = document.getElementsByClassName("icondefault");
      div[0].setAttribute("aria-hidden", true);
      div[0].setAttribute("tabindex", -1);
      div[1].setAttribute("aria-hidden", true);
      div[1].setAttribute("tabindex", -1);
      div[2].setAttribute("aria-hidden", true);
      div[2].setAttribute("tabindex", -1);
    }
    if (!this.props.isPopupActive) {
      const div = document.getElementsByClassName("icondefault");
      div[0].setAttribute("aria-hidden", false);
      div[0].setAttribute("tabindex", 0);
      div[1].setAttribute("aria-hidden", false);
      div[1].setAttribute("tabindex", 0);
      div[2].setAttribute("aria-hidden", false);
      div[2].setAttribute("tabindex", 0);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      this.props.currentTab !== this.props.index &&
      newProps.currentTab === this.props.index
    ) {
      this.props.markCompletedActivity(4, 0);
      this.props.onChangeSubTab(this.subTabIndex);
      const tabpanel = document.getElementById("tabPanels");
      setTimeout(() => {
        const portmed = document.getElementsByClassName("portrait");
        if (portmed[0]) {
          console.log(portmed[0]);
          tabpanel.style.height = "85%";
        } else {
          tabpanel.style.height = null;
        }
      }, 10);
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

  handlesize = () => {
    // console.log('lii')
    // const tabpanel = document.getElementById("tabPanels");
    // setTimeout(() => {
    //   const portmed = document.getElementsByClassName("portrait")
    //   if (portmed[0]) {
    //     console.log(portmed[0])
    //     tabpanel.style.height = "85%";
    //   }
    //   else {
    //     tabpanel.style.height = null;
    //   }
    // }, 10)
  };

  handlePrint = () => {
    const {
      currentLangData,
      currentSubTab,
      currentLangData: { tab5 },
    } = this.props;
    setTimeout(() => {
      const _currentSubTab = currentSubTab + 1;
      const element = document.querySelectorAll(".vl-imagine-container")[0];
      const printData = {};
      printData.title = currentLangData.labTitle;
      printData.section =
        tab5[`slide${_currentSubTab}`].sectionNameForPrint || "";
      printData.footer = currentLangData.footer;
      print(element, printData);
    }, 50);
  };

  getTabIndex = () => {
    const div = document.querySelector(".container-v5");
    // console.log("lii");
    if (div) {
      return div.scrollHeight > div.clientHeight && !this.props.isPopupActive
        ? "0"
        : null;
    } else {
      return null;
    }
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
  resetHandler = () => {
    this.setState({ stickyCount: 0 }, () => {
      setTimeout(() => {
        this.calculateCanvasDimension();
      }, 300);
    });
    this.disableStickynote = false;
    this.disableResetBtn = true;
    const { updateAriaLiveText, t } = this.props;
    updateAriaLiveText(t("conclude.sketchView.resetNoteMsg"));
  };

  handleAddnote = () => {
    const { stickyCount } = this.state;
    const { updateAriaLiveText, currentLangData } = this.props;
    setTimeout(() => {
      var stickList = document.getElementsByClassName("vl-sticky-wrapper");
      console.log(stickList[0].children[0]);
    }, 100);
    this.setState({ stickyCount: stickyCount + 1 }, () => {
      this.calculateCanvasDimension();
      updateAriaLiveText(
        `${currentLangData.conclude.sketchView[stickyCount + 1]} ${
          currentLangData.conclude.sketchView.addedNoteMsg
        }`
      );
    });
    this.disableResetBtn = false;
    if (stickyCount >= 2) {
      this.disableStickynote = true;
    }
  };

  render() {
    const {
      index,
      t,
      currentLangData,
      currentLangData: { tab5 },
    } = this.props;

    return (
      <div className="vl-imagine-container">
        {/* <IntroduceDefaultViewContainer
          audio={tab5.slide1.audio}
          heading={tab5.slide1.heading}
          body={tab5.slide1.body}
          screenIndex={index}
          subScreenIndex={0}
          portraitScale={true}
          t={t}
        /> */}
        <div className="vl-imagine">
          {/* <ScalableWrapperContainer screenIndex={index} subScreenIndex={0}> */}
          {/* <div className="vl-canvas-container">
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
            </div> */}
          <div
            className="text-container"
            ref={(div) => (this.textRef2 = div)}
            tabIndex={this.getTabIndex()}
          >
            <div className="vl-audio-container">
              <AudioContainer audiosrc={tab5.slide1.audio} />
            </div>

            <div
              className="text-area"
              dangerouslySetInnerHTML={{
                __html: tab5.slide1.body,
              }}
            />
            <div
              // onClick={(e) => this.markactivity()}
              className="notebook-drawing-container"
            >
              <div
                className="imagine-drop-area spriteClass imagine_container"
                id="imagine_container"
              >
                <div
                  className="imagine-sticky-notes-holder"
                  checkdisable="imagine-sticky-notes-holder"
                  acstouch="true"
                  ref={(div) => (this.dndWrapperRef = div)}
                >
                  <StickyNotes
                    count={this.state.stickyCount}
                    currentLangData={currentLangData}
                    disabled={this.props.isPopupActive ? true : false}
                  />
                </div>
                <div className="tab1">
                  <div
                    className="vl-canvas-container"
                    onClick={(e) => this.markactivity()}
                  >
                    <DrawingWrapperContainer
                      screenIndex={index}
                      subScreenIndex={0}
                      orientation="landscape"
                    />
                  </div>
                  <div
                    className="vl-canvas-container"
                    onClick={(e) => this.markactivity()}
                  >
                    <DrawingWrapperContainer
                      screenIndex={index}
                      subScreenIndex={0}
                      orientation="portrait"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </ScalableWrapperContainer> */}
        </div>
        {/* <div className="vl-imagine-footer"></div> */}
        <div className="vl-indroduce-footer">
          <div className="imagine-footer">
            <div className="imagine-action-btn">
              <button
                className="icondefault sticky ico-but addButtonCont"
                onClick={this.handleAddnote}
                disabled={this.disableStickynote}
                aria-label={tab5.slide1.addNote}
              >
                <span className="icon-add" aria-hidden="true"></span>
                <span className="btn_text btn_add">{tab5.slide1.addNote}</span>
              </button>
              <button
                className="icondefault print ico-but printButtonCont"
                onClick={this.handlePrint}
                acstouch="true"
                originallabel="Print"
                aria-label={tab5.slide1.print}
              >
                <span className="icon-print" aria-hidden="true"></span>
                <span className="btn_text btn_print">{tab5.slide1.print}</span>
              </button>
              <button
                className="icondefault rotate ico-but resetButtonCont"
                onClick={this.resetHandler}
                disabled={this.disableResetBtn}
                aria-label={tab5.slide1.reset}
              >
                <i className="fa fa-rotate-right" aria-hidden="true"></i>
                <span className="btn_text btn_reset">{tab5.slide1.reset}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(View5);
