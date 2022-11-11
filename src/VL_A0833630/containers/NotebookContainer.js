import { connect } from "react-redux";
import Notebook from "../../app/components/Notebook";
import {
  updateNotebookData,
  togglePopup,
  notebookGoToSlide,
  thunks,
  setFocusedEditor,
  setActiveEditor,
  setEditorActiveTool,
  notebookBoldClickHandler,
  notebookItalicClickHandler,
  notebookUnderlineClickHandler,
  notebookUnorderListClickHandler,
  notebookFontSizeClickHandler,
  ariaLiveChange,
  notebookSymbolClickHandler,
} from "../actions";

import * as templates from "../components/Notebook";

const mapStateToProps = (state) => {
  return {
    activeTabIndex: state.currentTab,
    activeSubTabIndex: state.currentSubTab,
    activeSlideIndex: state.activeNotebookSlide,
    notebookData: state.notebookData,
    notebookOpened: state.currentPopup.includes("0"),
    notebookTextDeletePopupOpened: state.currentPopup.includes("2"),
    notebookImageDeletePopupOpened: state.currentPopup.includes("3"),
    screenShotClick: state.screenShotClick,
    notebookPopupId: "0",
    pageDeletePopupId: "2",
    imageDeletePopupId: "3",
    imageAlertPopupId: "4",
    notebookConfirmClick: state.notebookConfirmClick,
    templates,
    focusedEditor: state.focusedEditor,
    activeEditor: state.activeEditor,
    activeTools: state.activeEditorTool,
    notebookEmphasisState: state.notebookEmphasisState,
    notebookSymbolClick: state.notebookSymbolClick,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    markedNotebooks: state.markedNotebooks,
    markedNotebooksValidation: state.markedNotebooksValidation,
    scale: state.scale,
    NumberOfTabs: 5,
    NumberOfSubTabs: 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNotebookData: (data) => {
      dispatch(updateNotebookData(data));
    },
    updateNotebookModelsData: (data) => {
      dispatch(thunks.updateNotebookModelsData(data));
    },
    gotoSlide: (index) => {
      dispatch(thunks.notebookGoToSlide(index));
    },
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
    openNotebook: (id) => {
      dispatch(thunks.openNoteBook(id));
    },
    setFocusedEditor: (editor) => {
      dispatch(setFocusedEditor(editor));
    },
    setActiveEditor: (editor) => {
      dispatch(setActiveEditor(editor));
    },
    setActiveTool: (tool) => {
      dispatch(setEditorActiveTool(tool));
    },
    notebookBoldClickHandler: () => {
      dispatch(notebookBoldClickHandler());
    },
    notebookItalicClickHandler: () => {
      dispatch(notebookItalicClickHandler());
    },
    notebookUnderlineClickHandler: () => {
      dispatch(notebookUnderlineClickHandler());
    },
    notebookUnorderListClickHandler: () => {
      dispatch(notebookUnorderListClickHandler());
    },
    notebookFontSizeClickHandler: (size) => {
      dispatch(notebookFontSizeClickHandler(size));
    },
    notebookSymbolClickHandler: (data) => {
      dispatch(notebookSymbolClickHandler(data));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
    markCompletedActivity: (currentTab) => {
      dispatch(thunks.markCompletedActivity(currentTab));
    },
    markCompletedNoteBook: (data, operation) => {
      dispatch(thunks.markCompletedNoteBook(data, operation));
    },
    completedActivity: (value) => {
      setTimeout(() => {
        dispatch(ariaLiveChange(value));
      }, 100);
    },
  };
};

const NotebookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook);

export default NotebookContainer;
