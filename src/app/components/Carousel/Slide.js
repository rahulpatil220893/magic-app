import React from "react";
import PropTypes from "prop-types";

class Slide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { index, slide } = this.props;
    let classes = `vl-carousel-slide-container slide-${index}`;
    classes = `${classes} ${index == slide ? "active" : ""}`.trim();
    return (
      <div className={classes} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
Slide.propTypes = {
  isActive: PropTypes.func,
  index: PropTypes.number,
  children: PropTypes.any,
};
export default Slide;
