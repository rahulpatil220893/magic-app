import { connect } from "react-redux";
import LabProgress from "../../app/components/LabProgress";
import { togglePopup } from "../actions";

const mapStateToProps = (state) => {
  return {
    progressPopupId: "8",
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
  };
};

const LabProgressPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabProgress);

export default LabProgressPopupContainer;
