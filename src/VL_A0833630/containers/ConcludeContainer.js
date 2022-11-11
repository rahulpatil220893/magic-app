import { connect } from "react-redux";
import View3 from "../components/View3";
import {
  thunks,
  clearDrawingHandler,
  togglePopup,
  setPopupMessage,
  setAccessible,
  activeDrawing,
  ariaLiveChange,
  toggleHotspotPopup,
  updateFocusTooltip,
  mapShow,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    isAccessible: state.isAccessible,
    selectedDraggable: state.selectedDraggable,
    checkedDrop: state.checkedDrop,
    setDropped: state.setDropped,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    data: state.concludeConfig,
    currentHotspotPopup: state.currentHotspotPopup,
    clearDrawing: state.clearDrawing,
    defaultLang: state.defaultLang,
    widthChange: state.widthChange,
    markedActivities: state.markedActivities,
    resetAllActivities: state.resetAllActivities,
    ...ownProps,
    scale: state.scale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSubTab: (id) => {
      dispatch(thunks.onChangeSubTab(id));
    },
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
    toggleHotspotPopup: (data) => {
      dispatch(toggleHotspotPopup(data));
    },
    setVisitedSubIndex: (id) => {
      dispatch(thunks.setVisitedSubIndex(id));
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(true));
    },
    setPopupMessage: (val) => {
      dispatch(setPopupMessage(val));
      dispatch(ariaLiveChange(val));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 100);
    },
    clearDrawingHandler: () => {
      dispatch(clearDrawingHandler());
      dispatch(activeDrawing(false));
    },

    setAccessible: (a) => {
      dispatch(setAccessible(a));
    },
    dropItem: (item) => {
      dispatch(thunks.checkDrop(item));
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
    mapShown: (value) => {
      dispatch(mapShow(value));
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

const ConcludeContainer = connect(mapStateToProps, mapDispatchToProps)(View3);

export default ConcludeContainer;
