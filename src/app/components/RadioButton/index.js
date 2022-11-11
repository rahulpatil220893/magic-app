import React from "react";
import PropTypes from "prop-types";

import RadioButton from "./RadioButton";

// groupIdentifier should be passed as props when using multiple radiogroups in a single view.

const RadioButtonGroup = (props) => {
  const {
    disabled,
    onChange,
    labelledby,
    radiobuttons,
    isPopupActive,
    selectedOption,
    groupIdentifier,
  } = props;

  const group = `${groupIdentifier ? groupIdentifier : ""}radiobuttons`;

  return (
    <ul
      role="radiogroup"
      className={`radiobuttons`}
      aria-labelledby={labelledby || null}
    >
      {radiobuttons && radiobuttons.length
        ? radiobuttons.map((r) => {
            const checked = selectedOption == r.id;
            return (
              <li key={r.id} role="none" className="radiobutton">
                <RadioButton
                  id={r.id}
                  name={group}
                  rtext={r.text}
                  rlabel={r.label}
                  rhtml={r.html}
                  checked={checked}
                  aria-hidden={false}
                  onChange={() => onChange(r.id)}
                  disabled={r.disabled || disabled}
                  ispopupactive={
                    isPopupActive ? isPopupActive.toString() : undefined
                  }
                />
              </li>
            );
          })
        : null}
    </ul>
  );
};

RadioButtonGroup.propTypes = {
  isPopupActive: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  radiobuttons: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

RadioButtonGroup.defaultProps = {
  disable: "",
};

export default RadioButtonGroup;
export { RadioButton };
