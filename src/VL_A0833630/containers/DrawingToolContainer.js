import { connect } from "react-redux";
import DrawingTool from "../../app/components/DrawingTool";
import {
  activeDrawing,
  updateDrawingOptions,
  screenShotClickHandler,
  clearDrawingHandler,
  enableClearDrawingHandler,
  showDrawingOptionsHandler,
  ariaLiveChange,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    activeDrawing: state.activeDrawing,
    enableClearDrawing: state.enableClearDrawing,
    showDrawingOptions: state.showDrawingOptions,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeDrawingHandler: (data) => {
      dispatch(activeDrawing(data));
    },
    updateDrawingOptions: (data) => {
      dispatch(updateDrawingOptions(data));
    },
    screenShot: (value) => {
      dispatch(ariaLiveChange(value.screenCapturedNotification));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 100);
      dispatch(screenShotClickHandler());
    },
    clearDrawingHandler: () => {
      dispatch(clearDrawingHandler());
    },
    enableClearDrawingHandler: (data) => {
      dispatch(enableClearDrawingHandler(data));
    },
    showDrawingOptionsHandler: (data) => {
      dispatch(showDrawingOptionsHandler(data));
    },
  };
};

const DrawingToolContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingTool);

export default DrawingToolContainer;
