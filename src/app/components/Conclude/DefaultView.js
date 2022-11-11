import React from "react";
import Audio from "../Audio";
import ScalableWrapper from "../ScalableWrapper";
import TextEditor from "../TextEditor";
import { DrawingWrapper } from "../DrawingTool";
import PropTypes from "prop-types";
class DefaultView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // if(this.props.screenIndex !== this.props.currentTab && newProps.currentTab === this.props.screenIndex) {
    if (
      this.props.subScreenIndex !== this.props.currentSubTab &&
      newProps.currentSubTab === this.props.subScreenIndex &&
      newProps.currentTab == newProps.screenIndex &&
      this.props.currentTab === newProps.currentTab
    ) {
      let audioElement = document.querySelectorAll(
        ".tab-panels .active .vl-carousel-slide-container.active .vl-audio-play-icon"
      )[0];
      setTimeout(() => {
        if (this.imageContainerRef) {
          let label = this.imageContainerRef.getAttribute("aria-label");
          if (label) {
            this.imageContainerRef.focus();
          } else {
            if (audioElement) {
              audioElement.focus();
            }
          }
        }
      }, 200);
    }
    // }
  }

  render() {
    const {
      audio,
      heading,
      body,
      screenIndex,
      subScreenIndex,
      portraitScale,
      widthChange,
      currentTab,
      currentSubTab,
      activeDrawing,
      drawingToolOptions,
      clearDrawing,
      enableClearDrawingHandler,
      showDrawingOptionsHandler,
      ariaLabel,
      Component,
      t,
      notebookData,
      // ...rest
    } = this.props;

    return (
      <>
        <div className="vl-canvas-container">
          <DrawingWrapper
            screenIndex={screenIndex}
            subScreenIndex={subScreenIndex}
            currentTab={currentTab}
            currentSubTab={currentSubTab}
            widthChange={widthChange}
            activeDrawing={activeDrawing}
            drawingToolOptions={drawingToolOptions}
            clearDrawing={clearDrawing}
            enableClearDrawingHandler={enableClearDrawingHandler}
            showDrawingOptionsHandler={showDrawingOptionsHandler}
            orientation="landscape"
          />
        </div>
        <div className="vl-canvas-container">
          <DrawingWrapper
            screenIndex={screenIndex}
            subScreenIndex={subScreenIndex}
            currentTab={currentTab}
            currentSubTab={currentSubTab}
            widthChange={widthChange}
            activeDrawing={activeDrawing}
            drawingToolOptions={drawingToolOptions}
            clearDrawing={clearDrawing}
            enableClearDrawingHandler={enableClearDrawingHandler}
            showDrawingOptionsHandler={showDrawingOptionsHandler}
            orientation="portrait"
          />
        </div>
        <div className="vl-conclude">
          <ScalableWrapper
            screenIndex={screenIndex}
            subScreenIndex={subScreenIndex}
            portraitScale={portraitScale}
            widthChange={widthChange}
            currentTab={currentTab}
            currentSubTab={currentSubTab}
          >
            <div className="left">
              <div
                className="image-container"
                ref={(div) => {
                  this.imageContainerRef = div;
                }}
                tabIndex={ariaLabel ? "-1" : null}
                role="img"
                aria-label={ariaLabel ? ariaLabel : null}
                aria-hidden={!ariaLabel ? "true" : null}
              >
                {Component ? <Component /> : null}
                {this.props.labelHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: this.props.labelHtml }}
                  />
                ) : null}
              </div>
            </div>

            <div className="right">
              {audio && (
                <div className="vl-audio-container">
                  <Audio
                    audiosrc={audio}
                    currentTab={currentTab}
                    currentSubTab={currentSubTab}
                  />
                </div>
              )}
              <div className="text-container" tabIndex="0">
                <div className="text-area">
                  {heading && <h2 className="boldText">{heading}</h2>}
                  <div dangerouslySetInnerHTML={{ __html: body }} />
                </div>
                <div className="notebook-textEditor-container">
                  <TextEditor
                    setActiveEditor={this.props.setActiveEditor}
                    onChange={this.props.onChange}
                    activeEditor={this.props.activeEditor}
                    updateAriaLiveText={this.props.updateAriaLiveText}
                    html={this.props.html}
                    placeholder={this.props.placeholder}
                    toolbar={this.props.toolbar}
                    printHandler={this.props.printHandler}
                    t={t}
                    notebookData={notebookData}
                  />
                </div>
              </div>
            </div>
          </ScalableWrapper>
        </div>
      </>
    );
  }
}
DefaultView.propTypes = {
  audio: PropTypes.string,
  heading: PropTypes.string,
  body: PropTypes.string,
  screenIndex: PropTypes.number,
  subScreenIndex: PropTypes.number,
  portraitScale: PropTypes.any,
  widthChange: PropTypes.any,
  currentTab: PropTypes.number,
  currentSubTab: PropTypes.number,
  activeDrawing: PropTypes.bool,
  drawingToolOptions: PropTypes.object,
  clearDrawing: PropTypes.bool,
  enableClearDrawingHandler: PropTypes.func,
  showDrawingOptionsHandler: PropTypes.func,
  ariaLabel: PropTypes.string,
  Component: PropTypes.element,
  labelHtml: PropTypes.string,
  setActiveEditor: PropTypes.func,
  onChange: PropTypes.func,
  activeEditor: PropTypes.string,
  updateAriaLiveText: PropTypes.func,
  html: PropTypes.any,
  placeholder: PropTypes.string,
  toolbar: PropTypes.bool,
  printHandler: PropTypes.func,
};
export default DefaultView;
