import React from "react";

const RadioButton = (props) => {
  const { id, rlabel, rtext, rhtml, ispopupactive } = props;
  return (
    <div className={"radiobutton-inner-wrapper"}>
      <input
        {...props}
        type="radio"
        aria-label={rlabel}
        tabIndex={ispopupactive == "true" ? "-1" : "0"}
      />
      <div>
        <span></span>
      </div>
      <label
        htmlFor={id}
        dangerouslySetInnerHTML={{ __html: rhtml || rtext }}
      ></label>
    </div>
  );
};

export default RadioButton;
