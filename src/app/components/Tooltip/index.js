import React from "react";
import PropTypes from "prop-types";

const Tooltip = (props, ref) => {
  const { title, classes, position, id } = props;
  const [randomId, setRandomId] = React.useState(
    String(Math.random()).slice(-4)
  );
  return (
    title && (
      <span
        role="tooltip"
        id={`${id}_${randomId}`}
        className={`tooltip ${classes} ${position}`}
      >
        <span aria-label="Tooltip :"> </span>
        {title}
      </span>
    )
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Tooltip;
