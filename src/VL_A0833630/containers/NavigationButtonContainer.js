import { connect } from "react-redux";
import NavigationButton from "../../app/components/NavigationButton";
import { thunks, togglePopup, updateFocusTooltip } from "../actions";

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    labSubmitted: state.labSubmitted,
    submitPopupId: "6",
    disabledTabs: [],
    submitPopupOpened: state.currentPopup.includes("6"),
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length || state.isMapShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTab: (id) => {
      dispatch(thunks.onChangeTab(id));
    },
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
    isAllLabCompleted: () => {
      dispatch(thunks.isAllLabCompleted());
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(true));
    },
  };
};

const NavigationButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationButton);

export default NavigationButtonContainer;
