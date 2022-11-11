import { connect } from "react-redux";
import TextEditor from "../../app/components/TextEditor";
import {
  setActiveEditor,
  setFocusedEditor,
  notebookEmphasisStateChange,
  ariaLiveChange,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    focusedEditor: state.focusedEditor,
    activeEditor: state.activeEditor,
    boldClick: state.notebookBoldClick,
    italicClick: state.notebookItalicClick,
    underlineClick: state.notebookUnderlineClick,
    unorderListClick: state.notebookUnorderListClick,
    fontSizeClick: state.notebookFontSizeClick,
    symbolClick: state.notebookSymbolClick,
    onChange: ownProps.onChange,
    defaultLang: state.defaultLang,
    notebookData: state.notebookData,
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
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const NotebookTextEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor);

export default NotebookTextEditorContainer;
