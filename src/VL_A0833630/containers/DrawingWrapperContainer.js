import { connect } from "react-redux";
import { DrawingWrapper } from "../../app/components/DrawingTool";
import {
  enableClearDrawingHandler,
  showDrawingOptionsHandler,
  thunks,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    widthChange: state.widthChange,
    activeDrawing: state.activeDrawing,
    screenIndex: ownProps.screenIndex,
    drawingToolOptions: state.drawingToolOptions,
    clearDrawing: state.clearDrawing,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enableClearDrawingHandler: (data) => {
      dispatch(enableClearDrawingHandler(data));
    },
    showDrawingOptionsHandler: (data, currentTab) => {
      dispatch(showDrawingOptionsHandler(data));
      if (currentTab === 4) {
        dispatch(thunks.markCompletedActivity(4));
      }
    },
  };
};

const DrawingWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingWrapper);

export default DrawingWrapperContainer;
