import React from "react";

class SubmitPopup extends React.Component {
  constructor(props) {
    super(props);
    this.okPageButtonRef = null;
  }

  handleConfirm = () => {
    const {
      togglePopup,
      submitPopupId,
      submitPopupData,
      updateAriaLiveText,
      labSubmittedHandler,
    } = this.props;

    labSubmittedHandler(true);
    togglePopup(submitPopupId);

    if (updateAriaLiveText) {
      setTimeout(() => {
        updateAriaLiveText(submitPopupData.labSubmitted);
        setTimeout(() => {
          updateAriaLiveText(" ");
        }, 1000);
      }, 500);
    }
  };

  handleCancel = () => {
    const { togglePopup, submitPopupId, t } = this.props;
    togglePopup(submitPopupId);
  };

  componentDidMount() {
    this.props.setPopupLastElement(this.okPageButtonRef);
  }

  render() {
    const { submitPopupData, isAllActivitiesCompleted } = this.props;
    const _isAllActivitiesCompleted = isAllActivitiesCompleted
      ? "completed"
      : "notCompleted";
    return (
      <div className="vl-popup-content-container">
        <p>{submitPopupData.description[_isAllActivitiesCompleted]}</p>
        <div className="vl-submit-popup-controls">
          <button
            ref={(div) => {
              this.okPageButtonRef = div;
            }}
            className="vl-button-ok vl-btn vl-btn-primary"
            aria-label={submitPopupData.yes}
            onClick={this.handleConfirm}
          >
            {submitPopupData.yes}
          </button>
          <button
            className="vl-button-cancel vl-btn vl-btn-primary"
            aria-label={submitPopupData.return}
            onClick={this.handleCancel}
          >
            {submitPopupData.return}
          </button>
        </div>
      </div>
    );
  }
}

export default SubmitPopup;
