import { connect } from "react-redux";
import SubmitPopup from "../../app/components/SubmitPopup";
import { togglePopup, labSubmittedHandler, ariaLiveChange } from "../actions";
import { submitTincanData } from "../../app/tincan";

const mapStateToProps = (state) => {
  return {
    submitPopupId: "6",
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    isAllActivitiesCompleted: state.isAllActivitiesCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
    labSubmittedHandler: (data) => {
      dispatch(labSubmittedHandler(data));
      TincanManager.data.labSubmitted = data;
      submitTincanData();
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const SubmitPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitPopup);

export default SubmitPopupContainer;
