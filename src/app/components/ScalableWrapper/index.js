import React, { Component } from "react";
import { isAndroid } from "react-device-detect";
import { responsiveDrag, responsiveDrop } from "../../helpers/jquery";

class ScalableWrapper extends Component {
  constructor(props) {
    super(props);
    this.currentTab = props.currentTab;
    this.currentSubTab = props.currentSubTab;
    this.clearOutTimeOut = null;
    this.state = {
      opacity: 0,
      scale: null,
      leftWidth: null,
      leftHeight: null,
      rightWidth: null,
      rightHeight: null,
    };
  }

  componentDidMount() {
    if (
      this.props.currentTab === this.props.screenIndex &&
      this.props.currentSubTab === this.props.subScreenIndex
    ) {
      const screen = this.props.widthChange;
      this.setState(
        {
          opacity: 0,
        },
        () => {
          this.calculateScale(screen);
        }
      );
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.currentTab != this.currentTab ||
      newProps.currentSubTab != this.currentSubTab ||
      newProps.widthChange.orientation !== this.props.widthChange.orientation
    ) {
      if (
        newProps.currentTab === this.props.screenIndex &&
        newProps.currentSubTab === this.props.subScreenIndex
      ) {
        const screen = newProps.widthChange;
        if (
          newProps.widthChange.windowSize !==
            this.props.widthChange.windowSize ||
          newProps.widthChange.windowHeight !==
            this.props.widthChange.windowHeight
        ) {
          this.updateState(screen);
        } else {
          this.updateState(screen);
        }
      }
      this.currentTab = newProps.currentTab;
      this.currentSubTab = newProps.currentSubTab;
    }
    if (newProps.widthChange.windowSize !== this.props.widthChange.windowSize) {
      this.updateState(newProps.widthChange);
    }
    if (
      newProps.currentTab === this.props.screenIndex &&
      newProps.currentSubTab === this.props.subScreenIndex &&
      isAndroid
    ) {
      const screen = newProps.widthChange;
      if (
        newProps.widthChange.windowSize !== this.props.widthChange.windowSize ||
        newProps.widthChange.windowHeight !==
          this.props.widthChange.windowHeight
      ) {
        this.updateState(screen);
      }
    }
  }

  updateState = (screen) => {
    if (this.clearOutTimeOut) clearTimeout(this.clearOutTimeOut);
    this.setState(
      {
        opacity: 0,
      },
      () => {
        this.clearOutTimeOut = setTimeout(() => {
          this.calculateScale(screen);
        });
      }
    );
  };

  calculateScale = (screen) => {
    const padding = 40;
    const parentWidth = this.scaleWrapperContainerRef.clientWidth - 10;
    let parentHeight =
      this.scaleWrapperContainerRef.clientHeight - padding - 10;
    if (this.props.parentheight) {
      parentHeight = this.scaleWrapperContainerRef.clientHeight - padding - 20;
    }
    const childWidth = this.scalableContainerRef.children[0].clientWidth;
    const childHeight = this.scalableContainerRef.children[0].clientHeight;
    let wScale = parentWidth / childWidth;
    let hScale = parentHeight / childHeight;
    let scale = Math.min(wScale, hScale);

    let leftWidth = childWidth * scale;
    let leftHeight = childHeight * scale;
    let rightWidth = parentWidth - leftWidth;
    let rightHeight = leftHeight;

    const minRightWidth = 290;
    if (
      rightWidth < minRightWidth &&
      screen.orientation === "landscape" &&
      screen.breakpoint === "large"
    ) {
      rightWidth = minRightWidth;
      wScale = (parentWidth - rightWidth) / childWidth;
      scale = Math.min(wScale, hScale);
      leftWidth = childWidth * scale;
      leftHeight = childHeight * scale;
      rightHeight = "100%";
    }
    if (screen.orientation === "landscape" && screen.breakpoint === "large") {
      scale = Math.min(wScale, hScale) + 0.1;
      leftWidth = childWidth * scale;
      leftHeight = childHeight * scale;
      rightWidth = parentWidth - leftWidth;
      rightHeight = leftHeight;
    }
    if (screen.orientation === "portrait" || screen.breakpoint !== "large") {
      if (this.props.portraitScale) {
        rightWidth = "100%";
        rightHeight = parentHeight - leftHeight + padding / 2 + "px";
      } else {
        scale = 1;
        rightWidth = "100%";
        leftWidth = `${childWidth}px`;
        leftHeight = `${childHeight}px`;
        rightHeight = parentHeight - childHeight + padding / 2 + "px";
      }
    } else {
      rightWidth = `${rightWidth}px`;
      rightHeight = `100%`;
    }
    if (childWidth !== 0) {
      this.setState(
        {
          scale,
          leftHeight,
          leftWidth,
          rightWidth,
          rightHeight,
          opacity: 1,
          childWidth,
          childHeight,
        },
        () => {
          responsiveDrag(this.state.scale);
          responsiveDrop(this.state.scale);
          if (this.props.scaleChange) {
            this.props.scaleChange(this.state.scale);
          }
        }
      );
    }
  };

  render() {
    const {
      leftWidth,
      leftHeight,
      rightWidth,
      rightHeight,
      childWidth,
      childHeight,
      scale,
      opacity,
    } = this.state;

    const { children } = this.props;
    let childrenArray = React.Children.toArray(children);
    const leftChild = childrenArray.shift();
    const rightChild = childrenArray.shift();

    const scalableStyle = {
      transform: `scale(${scale})`,
      transformOrigin: "left top",
      width: `${childWidth}px`,
      height: `${childHeight}px`,
    };

    const leftStyle = {
      width: leftWidth,
      height: leftHeight,
      opacity: opacity,
    };

    let rightStyle;
    if (this.props.widthChange.orientation == "landscape") {
      rightStyle = {
        width: rightWidth,
        //height: rightHeight,
        opacity: opacity,
      };
    } else {
      rightStyle = {
        width: rightWidth,
        height: rightHeight,
        opacity: opacity,
      };
    }

    return (
      <div
        className="vl-scalable-wrapper-container"
        ref={(div) => {
          this.scaleWrapperContainerRef = div;
        }}
      >
        <div className="vl-scalable-wrapper-left" style={leftStyle}>
          <div
            className="vl-scalable-container"
            ref={(div) => {
              this.scalableContainerRef = div;
            }}
            style={scalableStyle}
          >
            {leftChild}
          </div>
        </div>
        <div
          className="vl-scalable-wrapper-right"
          ref={(div) => {
            this.scaleWrapperRightRef = div;
          }}
          style={rightStyle}
        >
          {rightChild}
        </div>
        {childrenArray}
      </div>
    );
  }
}

ScalableWrapper.defaultProps = {
  portraitScale: true,
};

export default ScalableWrapper;
