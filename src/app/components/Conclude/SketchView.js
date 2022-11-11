import React from "react";
import Audio from "../Audio";
import { DrawingWrapper } from "../DrawingTool";
import StickyNotes from "../StickyNotes";
import BottomPanel from "./BottomPanel";
import { responsiveDrag, responsiveDrop } from "../../helpers/jquery";

class SketchView extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperContainerRef = null;
    this.dndWrapperRef = null;
    this.state = {
      stickyCount: 0,
      wrapperConatinerHeight: 0,
      canvasHeight: null,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.currentTab === this.props.screenIndex) {
      if (this.props.subScreenIndex === newProps.currentSubTab) {
        setTimeout(() => {
          this.containmentHeight();
          responsiveDrag(1);
          responsiveDrop(1);
        }, 100);
      }
    }
    if (
      this.props.subScreenIndex !== this.props.currentSubTab &&
      newProps.currentSubTab === this.props.subScreenIndex &&
      newProps.currentTab == newProps.screenIndex
    ) {
      setTimeout(() => {
        let audioElement = document.querySelectorAll(
          ".tab-panels .active .vl-carousel-slide-container.active .vl-audio-play-icon"
        )[0];
        if (this.wrapperContainerRef) {
          audioElement.focus();
        }
      }, 100);
    }
    if (
      newProps.widthChange.windowSize !== this.props.widthChange.windowSize ||
      newProps.widthChange.windowHeight !== this.props.widthChange.windowHeight
    ) {
      if (
        newProps.currentTab === this.props.screenIndex &&
        this.props.subScreenIndex === newProps.currentSubTab
      ) {
        setTimeout(() => {
          this.containmentHeight();
          this.calculateCanvasDimension();
        });
      }
    }

    // if (this.props.clearDrawing !== newProps.clearDrawing) {
    //   this.setState({ stickyCount: 0 });
    // }
  }

  handleAddnote = () => {
    const { stickyCount } = this.state;
    this.setState({ stickyCount: stickyCount + 1 }, () => {
      this.calculateCanvasDimension();
    });
  };

  containmentHeight = () => {
    const cHeight = Number(this.wrapperContainerRef.children[0].clientHeight);
    const wrapperConatinerHeight = String(cHeight);
    setTimeout(() => {
      this.setState({
        wrapperConatinerHeight,
      });
    });
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
      this.props.clearDrawingHandler();
      setTimeout(() => {
        this.calculateCanvasDimension();
      }, 300);
    });
    const { updateAriaLiveText } = this.props;
    if (this.props.updateAriaLiveText) {
      this.props.updateAriaLiveText(
        this.props.t("conclude.sketchView.resetMsg")
      );
      setTimeout(() => {
        updateAriaLiveText(" ");
      }, 500);
    }
  };

  render() {
    const { audio, heading, body, printHandler, currentLangData, ...rest } =
      this.props;

    const { wrapperConatinerHeight } = this.state;
    const dndContainerHeight = {
      height: `calc(100% - ${wrapperConatinerHeight}px)`,
    };
    return (
      <>
        <div
          className="vl-dnd-conatainer"
          ref={(div) => (this.wrapperContainerRef = div)}
        >
          <div className="text-space">
            <div className="vl-audio-container">
              <Audio
                audiosrc={audio}
                currentTab={this.props.currentTab}
                currentSubTab={this.props.currentSubTab}
              />
            </div>
            <div
              className="text-area"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>

          <div
            className="vl-dnd-wrapper"
            ref={(div) => (this.dndWrapperRef = div)}
            style={dndContainerHeight}
          >
            <div
              style={{ height: this.state.canvasHeight + "px" }}
              className="vl-canvas-container"
            >
              <DrawingWrapper
                {...rest}
                orientation="landscape"
                height={this.state.canvasHeight}
              />
            </div>
            <div className="vl-canvas-container">
              <DrawingWrapper {...rest} orientation="portrait" />
            </div>
            <StickyNotes
              {...rest}
              count={this.state.stickyCount}
              currentLangData={currentLangData}
            />
          </div>
        </div>
        <BottomPanel
          resetHandler={this.resetHandler}
          printHandler={printHandler}
          addnoteHandler={this.handleAddnote}
        />
      </>
    );
  }
}

export default SketchView;
