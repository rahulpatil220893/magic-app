import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { findKey } from "lodash";
import { isSafari, isTablet } from "react-device-detect";

class ResponsiveWrapper extends Component {
  constructor(props) {
    super(props);
    this.wrapper_div = null;
    this.state = {
      orientation: "landscape",
      breakpoint: "",
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.onresize = () => {
      this.adjustForContainerSize();
    };
    this.adjustForContainerSize();
  }

  getBreakpoint() {
    const containerSize = this.getContainerSize();
    // const windowSize = this.getWindowSize();
    const breakpoint =
      this.props.breakpoints &&
      findKey(this.props.breakpoints, (ar) => {
        // if (this.state.modalMode === true && this.state.isExpanded) {
        //   const firstPass = windowSize >= ar[0];
        //   return (firstPass && (ar[1] === '~' || windowSize <= ar[1]));
        // }
        const firstPass = containerSize >= ar[0];
        return firstPass && (ar[1] === "~" || containerSize <= ar[1]);
      });
    return breakpoint || "";
  }

  getWindowSize() {
    return window.innerWidth;
  }

  getContainerSize() {
    return this.wrapper_div.clientWidth;
  }

  getWindowHeight() {
    return window.innerHeight;
  }

  getContainerHeight() {
    return this.wrapper_div.clientHeight;
  }

  getOrientation() {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  }

  adjustForContainerSize() {
    const orientation = this.getOrientation();
    const breakpoint = this.getBreakpoint();
    const containerSize = this.getContainerSize();
    const windowSize = this.getWindowSize();
    const containerHeight = this.getContainerHeight();
    const windowHeight = this.getWindowHeight();

    this.props.onResize({
      orientation,
      breakpoint,
      containerSize,
      containerHeight,
      windowSize,
      windowHeight,
    });
    this.setState({
      orientation,
      breakpoint,
    });

    return containerSize;
  }

  render() {
    const appClasses = classnames(
      this.props.name,
      "vl-responsive-wrapper",
      this.state.orientation,
      this.state.breakpoint,
      isSafari && isTablet ? "ipad_class" : ""
    );

    return (
      <div
        className={appClasses}
        ref={(el) => {
          this.wrapper_div = el;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

ResponsiveWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  breakpoints: PropTypes.object,
  onResize: PropTypes.func,
  children: PropTypes.object,
};

ResponsiveWrapper.defaultProps = {
  onResize: () => {},
  breakpoints: {},
  children: {},
};

export default ResponsiveWrapper;
