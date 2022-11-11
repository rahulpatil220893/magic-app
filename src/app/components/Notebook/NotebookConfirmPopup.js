import React, { useRef, useEffect } from "react";
import Button from "../Button";
import PropTypes from "prop-types";

function NotebookConfirmPopup({
  noteBookData,
  notebookConfirmId: popupId,
  onConfirm,
  onCancel,
  body,
  ...props
}) {
  const okPageButtonRef = useRef(null);

  useEffect(() => {
    props.setPopupLastElement(okPageButtonRef.current);
  });

  const handleConfirm = () => {
    onConfirm(popupId);
  };

  const handleCancel = () => {
    onCancel(popupId);
  };

  return (
    <div className="vl-notebook-confirm-box">
      <div className="vl-notebook-confirm-content">{body}</div>
      <div className="vl-notebook-confirm-controls">
        <Button
          className="vl-button-cancel"
          aria-label={noteBookData.cancel}
          onClick={handleCancel}
        >
          {noteBookData.cancel}
        </Button>
        <Button
          ref={okPageButtonRef}
          className="vl-button-prime"
          aria-label={noteBookData.ok}
          onClick={handleConfirm}
        >
          {noteBookData.ok}
        </Button>
      </div>
    </div>
  );
}
NotebookConfirmPopup.propTypes = {
  notebookConfirmId: PropTypes.any,
  body: PropTypes.any,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  setPopupLastElement: PropTypes.func,
};
export default NotebookConfirmPopup;
