import React from 'react';
import Audio from '../Audio';
import ScalableWrapper from '../ScalableWrapper';
import { DrawingWrapper } from '../DrawingTool';
import PropTypes from 'prop-types';

class ExploreDefaultView extends React.Component {
    // function IntroduceDefaultView(props) {
    constructor(props) {
        super(props)
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.subScreenIndex !== this.props.currentSubTab && newProps.currentSubTab === this.props.subScreenIndex && newProps.currentTab == newProps.screenIndex) {
            let audioElement = document.querySelectorAll(".tab-panels .active .vl-carousel-slide-container.active .vl-audio-play-icon")[0];
            setTimeout(() => {
                if (this.imageContainerRef) {
                    let label = this.imageContainerRef.getAttribute("aria-label")
                    if (label && label != "") {
                        this.imageContainerRef.focus()
                    } else if (audioElement) {
                        audioElement.focus()
                    }
                }
            }, 200)
        }
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
            labelHtml
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
                <div className="vl-explore">
                    <ScalableWrapper
                        screenIndex={screenIndex}
                        subScreenIndex={subScreenIndex}
                        portraitScale={portraitScale}
                        widthChange={widthChange}
                        currentTab={currentTab}
                        currentSubTab={currentSubTab}
                    >
                        <div className="vl-explore-left" >
                            <div className="image-container" ref={(div) => { this.imageContainerRef = div }} role="img" aria-hidden={!ariaLabel ? "true" : null} tabIndex={ariaLabel ? "-1" : null} aria-label={ariaLabel ? ariaLabel : null}>
                                {labelHtml ? <div dangerouslySetInnerHTML={{ __html: labelHtml }} /> : null}
                            </div>
                        </div>
                        <div className="vl-explore-right">
                            {
                                audio && (
                                    <div className="vl-audio-container">
                                        <Audio
                                            audiosrc={audio}
                                            currentTab={currentTab}
                                            currentSubTab={currentSubTab}
                                        />
                                    </div>
                                )
                            }
                            <div className="text-container" tabIndex="0">
                                {heading && <h2 className="boldText">{heading}</h2>}
                                <div dangerouslySetInnerHTML={{ __html: body }} />
                            </div>
                        </div>
                    </ScalableWrapper>
                </div>
            </>
        )
    }
}
ExploreDefaultView.propTypes = {
    // popupData: PropTypes.object,
    audio: PropTypes.string,
    heading: PropTypes.string,
    body: PropTypes.any,
    screenIndex: PropTypes.number,
    subScreenIndex: PropTypes.number,
    portraitScale: PropTypes.any,
    widthChange: PropTypes.any,
    currentTab: PropTypes.any,
    currentSubTab: PropTypes.any,
    activeDrawing: PropTypes.bool,
    drawingToolOptions: PropTypes.object,
    clearDrawing: PropTypes.bool,
    enableClearDrawingHandler: PropTypes.func,
    showDrawingOptionsHandler: PropTypes.func,
    ariaLabel: PropTypes.string,
    labelHtml: PropTypes.string,
}
export default ExploreDefaultView;