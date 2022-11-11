import { t } from "i18next";
import React from "react";

class LabProgress extends React.Component {
  constructor(props) {
    super(props);
    this.okPageButtonRef = null;
  }

  handleCancel = () => {
    const { togglePopup, progressPopupId } = this.props;
    togglePopup(progressPopupId);
  };

  componentDidMount() {
    this.props.setPopupLastElement(this.okPageButtonRef);
  }

  render() {
    const { labProgressData } = this.props;
    return (
      <div className="vl-lab-progress-popup-container">
        <h2>{labProgressData.title}</h2>
        <p>{labProgressData.description}</p>
        <div className="vl-lab-progress-popup-controls">
          <button
            className="vl-button-cancel vl-btn vl-btn-primary"
            aria-label={labProgressData.cancel}
            onClick={this.handleCancel}
          >
            {labProgressData.close}
          </button>
        </div>
      </div>
    );
  }
}

export default LabProgress;
