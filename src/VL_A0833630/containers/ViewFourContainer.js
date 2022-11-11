import { connect } from "react-redux";
import View4 from "../components/View4";
import {
  activeDrawing,
  toggleHotspotPopup,
  thunks,
  ariaLiveChange,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    currentHotspotPopup: state.currentHotspotPopup,
    widthChange: state.widthChange,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    markedActivities: state.markedActivities,
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
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const IntroduceContainer = connect(mapStateToProps, mapDispatchToProps)(View4);

export default IntroduceContainer;
