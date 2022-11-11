import { connect } from "react-redux";
import View1 from "../components/View5";
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
    subScreenIndex: 0,
    isPopupActive: !!state.currentPopup.length,
    markedActivities: state.markedActivities,
    ariaHidden: !!state.currentPopup.length,
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
    updateAriaLiveText: (text) => {
      setTimeout(() => {
        dispatch(ariaLiveChange(text));
        setTimeout(() => {
          dispatch(ariaLiveChange(""));
        }, 500);
      });
    },
  };
};

const IntroduceContainer = connect(mapStateToProps, mapDispatchToProps)(View1);

export default IntroduceContainer;
