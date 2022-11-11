import { connect } from "react-redux";
import { DefaultView } from "../../app/components/Conclude";
import {
  setActiveEditor,
  setFocusedEditor,
  notebookEmphasisStateChange,
  enableClearDrawingHandler,
  showDrawingOptionsHandler,
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
    toolbar: true,
    placeholder: "Type your answer here...",
    focusedEditor: state.focusedEditor,
    activeEditor: state.activeEditor,
    boldClick: state.notebookBoldClick,
    italicClick: state.notebookItalicClick,
    underlineClick: state.notebookUnderlineClick,
    unorderListClick: state.notebookUnorderListClick,
    fontSizeClick: state.notebookFontSizeClick,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveEditor: (editor) => {
      dispatch(setActiveEditor(editor));
    },
    setFocusedEditor: (editor) => {
      dispatch(setFocusedEditor(editor));
    },
    emphasisStateChange: (data) => {
      dispatch(notebookEmphasisStateChange(data));
    },
    enableClearDrawingHandler: (data) => {
      dispatch(enableClearDrawingHandler(data));
    },
    showDrawingOptionsHandler: (data) => {
      dispatch(showDrawingOptionsHandler(data));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const ConcludeDefaultViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultView);

export default ConcludeDefaultViewContainer;
