import { connect } from "react-redux";
import CommonPopup from "../../app/components/CommonPopup";
import { togglePopup, thunks } from "../actions";

const mapStateToProps = (state) => {
  return {
    popupId: "10",
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buttonOneOnClick: (popupId) => {
      dispatch(togglePopup(popupId));
    },
    buttonTwoOnClick: (popupId) => {
      dispatch(thunks.languageChange(popupId));
    },
  };
};

const LanguageSwitchPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonPopup);

export default LanguageSwitchPopupContainer;
