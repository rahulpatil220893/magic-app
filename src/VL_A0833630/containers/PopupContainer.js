import { connect } from "react-redux";
import PopupHOC from "../../app/components/Popup";
import { togglePopup, updateFocusTooltip } from "../actions";

const mapStateToProps = (state) => {
  return {
    currentPopup: state.currentPopup,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    focusTooltip: state.focusTooltip,
    widthChange: state.widthChange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(false));
    },
  };
};

const PopupContainer = connect(mapStateToProps, mapDispatchToProps)(PopupHOC);

export default PopupContainer;
