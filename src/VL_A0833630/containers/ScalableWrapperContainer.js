import { connect } from "react-redux";
import ScalableWrapper from "../../app/components/ScalableWrapper";

import { scaleChange } from "../actions";

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab,
    widthChange: state.widthChange,
    currentSubTab: state.currentSubTab,
    ariaHidden: !!state.currentPopup.length,
    isPopupActive: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    scaleChange: (scale) => {
      dispatch(scaleChange(scale));
    },
  };
};

const ScalableWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScalableWrapper);

export default ScalableWrapperContainer;
