import { connect } from "react-redux";
import View1 from "../components/View1";
import {
  activeDrawing,
  toggleHotspotPopup,
  thunks,
  ariaLiveChange,
  setAccessible,
  updateFocusTooltip,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    currentHotspotPopup: state.currentHotspotPopup,
    defaultLang: state.defaultLang,
    subScreenIndex: 0,
    widthChange: state.widthChange,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    markedActivities: state.markedActivities,
    isAccessible: state.isAccessible,
    // ariaLabel: t("images.Introduction"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSubTab: (id) => {
      dispatch(thunks.onChangeSubTab(id));
    },
    activeDrawing: (data) => {
      dispatch(activeDrawing(data));
    },
    toggleHotspotPopup: (data) => {
      dispatch(toggleHotspotPopup(data));
    },
    markCompletedActivity: (currentTab, currentSubTab) => {
      dispatch(thunks.markCompletedActivity(currentTab, currentSubTab));
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(true));
    },
    setAccessible: (a) => {
      dispatch(setAccessible(a));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const IntroduceContainer = connect(mapStateToProps, mapDispatchToProps)(View1);

export default IntroduceContainer;
