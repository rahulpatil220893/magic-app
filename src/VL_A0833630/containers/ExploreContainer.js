import { connect } from "react-redux";
import View2 from "../components/View2";
import {
  thunks,
  setDropped,
  ariaLiveChange,
  setAccessible,
  toggleHotspotPopup,
  updateFocusTooltip,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    isAccessible: state.isAccessible,
    currentSubTab: state.currentSubTab,
    selectedDraggable: state.selectedDraggable,
    checkedDrop: state.checkedDrop,
    setDropped: state.setDropped,
    currentHotspotPopup: state.currentHotspotPopup,
    widthChange: state.widthChange,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    markedActivities: state.markedActivities,
    resetAllActivities: state.resetAllActivities,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSubTab: (id) => {
      dispatch(thunks.onChangeSubTab(id));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
    toggleHotspotPopup: (data) => {
      dispatch(toggleHotspotPopup(data));
    },
    setAccessible: (a) => {
      dispatch(setAccessible(a));
    },
    dropItem: (item) => {
      dispatch(thunks.checkDrop(item));
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(true));
    },
    resetDropperValue: () => {
      dispatch(thunks.resetValues());
    },
    selectDraggable: (draggable) => {
      if (draggable) {
        dispatch(thunks.selectDraggable(draggable));
      } else {
        dispatch(thunks.selectDraggable(null));
      }
    },
    markCompletedActivity: (currentTab, currentSubTab) => {
      dispatch(thunks.markCompletedActivity(currentTab, currentSubTab));
    },
  };
};

const ExploreContainer = connect(mapStateToProps, mapDispatchToProps)(View2);

export default ExploreContainer;
