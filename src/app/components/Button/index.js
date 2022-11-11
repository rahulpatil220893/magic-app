import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {

  variant: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  bsPrefix: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit', null])
};

const defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false,
  type: 'button',
};

const Button = React.forwardRef(
  (
    { bsPrefix = 'vl-btn', variant, active, className, type, ...props },
    ref
  ) => {
    const prefix = bsPrefix;

    const classes = classNames(
      className,
      prefix,
      active && 'active',
      `${prefix}-${variant}`
    );

    if (ref) {
      props.ref = ref;
    }

    return <button {...props} className={classes} />;
  }
)

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;