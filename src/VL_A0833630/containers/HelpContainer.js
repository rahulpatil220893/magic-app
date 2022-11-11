import { connect } from "react-redux";
import Help from "../../app/components/Help";
import { togglePopup, thunks } from "../actions";

const mapStateToProps = (state) => {
  return {
    popupId: "5",
    helpPopupOpened: state.currentPopup.includes("5"),
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    defaultLang: state.defaultLang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePopup: (id) => {
      TincanManager.data.isFirstTime = false;
      dispatch(togglePopup(id));
      dispatch(thunks.markCompletedActivity(0, 0));
    },
  };
};

const HelpContainer = connect(mapStateToProps, mapDispatchToProps)(Help);

export default HelpContainer;
