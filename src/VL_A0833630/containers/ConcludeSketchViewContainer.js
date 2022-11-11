import { connect } from "react-redux";
import { SketchView } from "../../app/components/Conclude";
import {
  enableClearDrawingHandler,
  showDrawingOptionsHandler,
  clearDrawingHandler,
  activeDrawing,
  ariaLiveChange,
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
    ...state.concludeConfig.stickyNotes,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enableClearDrawingHandler: (data) => {
      dispatch(enableClearDrawingHandler(data));
    },
    showDrawingOptionsHandler: (data) => {
      dispatch(showDrawingOptionsHandler(data));
    },
    clearDrawingHandler: () => {
      dispatch(clearDrawingHandler());
      dispatch(activeDrawing(false));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const ConcludeSketchViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SketchView);

export default ConcludeSketchViewContainer;
