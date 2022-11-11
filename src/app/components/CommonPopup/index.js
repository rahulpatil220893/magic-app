import React from "react";

const CommonPopup = ({
  message,
  popupId,
  buttonOneOnClick,
  buttonTwoOnClick,
  hideButton,
}) => {
  return (
    <div className={`popup-content ${!hideButton ? "" : "hideButton"}`}>
      <p className="popup-content-message">
        Are you sure you want to change the language? Clicking OK will reset the
        activity.
      </p>

      {!hideButton && (
        <div className="popup-content-cta">
          <button onClick={() => buttonOneOnClick(popupId)}>No</button>
          <button onClick={() => buttonTwoOnClick(popupId)}>OK</button>
        </div>
      )}
    </div>
  );
};

export default CommonPopup;
