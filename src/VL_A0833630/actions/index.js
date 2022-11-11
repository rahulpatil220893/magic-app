import { saveTincanData } from "../../app/tincan";
import i18next from "../i18next";
import data from "../i18next/translation";
export const SCALE_CHANGE = "SCALE_CHANGE";
export const WIDTH_CHANGE = "WIDTH_CHANGE";
export const ON_CHANGE_TAB = "ON_CHANGE_TAB";
export const ON_CHANGE_SUB_TAB = "ON_CHANGE_SUB_TAB";
export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const ACTIVE_DRAWING = "ACTIVE_DRAWING";
export const UPDATE_DRAWING_OPTIONS = "UPDATE_DRAWING_OPTIONS";
export const SHOW_DRAWING_OPTIONS = "SHOW_DRAWING_OPTIONS";
export const NOTEBOOK_DATA = "NOTEBOOK_DATA";
export const NOTEBOOK_GOTO_SLIDE = "NOTEBOOK_GOTO_SLIDE";
export const CLEAR_DRAWING = "CLEAR_DRAWING";
export const ENABLE_CLEAR_DRAWING = "ENABLE_CLEAR_DRAWING";
export const SCREEN_SHOT_CLICK = "SCREEN_SHOT_CLICK";
export const NOTEBOOK_CONFIRM_CLICK = "NOTEBOOK_CONFIRM_CLICK";
export const FOCUSED_EDITOR = "FOCUSED_EDITOR";
export const ACTIVE_EDITOR = "ACTIVE_EDITOR";
export const TOGGLE_HOTSPOT_POPUP = "TOGGLE_HOTSPOT_POPUP";
export const ACTIVE_EDITOR_TOOL = "ACTIVE_EDITOR_TOOL";
export const NOTEBOOK_BOLD_CLICK = "NOTEBOOK_BOLD_CLICK";
export const NOTEBOOK_ITALIC_CLICK = "NOTEBOOK_ITALIC_CLICK";
export const NOTEBOOK_UNDERLINE_CLICK = "NOTEBOOK_UNDERLINE_CLICK";
export const NOTEBOOK_UNORDERLIST_CLICK = "NOTEBOOK_UNORDERLIST_CLICK";
export const NOTEBOOK_FONT_SIZE_CLICK = "NOTEBOOK_FONT_SIZE_CLICK";
export const NOTEBOOK_SYMBOL_CLICK = "NOTEBOOK_SYMBOL_CLICK";
export const NOTEBOOK_EMPHASIS_STATE_CHANGE = "NOTEBOOK_EMPHASIS_STATE_CHANGE";
export const ARIA_LIVE_CHANGE = "ARIA_LIVE_CHANGE";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const LAB_SUBMITTED = "LAB_SUBMITTED";
export const SHOW_MAP_POPUP = "SHOW_MAP_POPUP";
export const SET_POPUP_MESSAGE = "SET_POPUP_MESSAGE";
export const VISITED_SUB_INDEX = "VISITED_SUB_INDEX";
export const TABS_WITH_DISABLED_SUBTABS = "TABS_WITH_DISABLED_SUBTABS";
export const IS_ACCESSIBLE = "IS_ACCESSIBLE";
export const SELECT_DRAGGABLE = "SELECT_DRAGGABLE";
export const DROPPED_ELEMENT = "DROPPED_ELEMENT";
export const SET_DROPPED = "SET_DROPPED";
export const MARK_ACTIVITY = "MARK_ACTIVITY";
export const ALL_ACTIVITY_COMPLETED = "ALL_ACTIVITY_COMPLETED";
export const MARK_NOTEBOOK = "MARK_NOTEBOOK";
export const RESET_ALL_ACTIVITY = "RESET_ALL_ACTIVITY";
export const FOCUS_TOOLTIP = "FOCUS_TOOLTIP";
export const MARK_NOTEBOOK_VALIDATION = "MARK_NOTEBOOK_VALIDATION";
export const MAP_SHOW = "MAP_SHOW";
export function setAllActivitiesStatus(val) {
  return { type: ALL_ACTIVITY_COMPLETED, val };
}

export const updateFocusTooltip = (value) => ({
  value,
  type: FOCUS_TOOLTIP,
});

export function setLanguage(val) {
  return { type: SET_LANGUAGE, val };
}

export const scaleChange = (scale) => {
  return { type: SCALE_CHANGE, scale };
};

export const widthChange = (data) => {
  return { type: WIDTH_CHANGE, data };
};

export const onChangeTab = (id) => {
  return { type: ON_CHANGE_TAB, id };
};

export const onChangeSubTab = (id) => {
  return { type: ON_CHANGE_SUB_TAB, id };
};

export const togglePopup = (ids) => {
  return { type: TOGGLE_POPUP, ids };
};

export const setVisitedSubIndex = (array) => {
  return { type: VISITED_SUB_INDEX, array };
};

export const setTabWithDisabledFunc = (array) => {
  return { type: TABS_WITH_DISABLED_SUBTABS, array };
};

export const activeDrawing = (data) => {
  return { type: ACTIVE_DRAWING, data };
};

export const showDrawingOptionsHandler = (data) => {
  return { type: SHOW_DRAWING_OPTIONS, data };
};

export const updateDrawingOptions = (data) => {
  return { type: UPDATE_DRAWING_OPTIONS, data };
};

export const clearDrawingHandler = () => {
  return { type: CLEAR_DRAWING };
};

export const enableClearDrawingHandler = (data) => {
  return { type: ENABLE_CLEAR_DRAWING, data };
};

export const updateNotebookData = (data) => {
  return { type: NOTEBOOK_DATA, data };
};

export const notebookGoToSlide = (index) => {
  return { type: NOTEBOOK_GOTO_SLIDE, index };
};

export const screenShotClickHandler = () => {
  return { type: SCREEN_SHOT_CLICK };
};

export const notebookDeleteClickHandler = () => {
  return { type: NOTEBOOK_CONFIRM_CLICK };
};

export const setFocusedEditor = (editor) => {
  return { type: FOCUSED_EDITOR, editor };
};

export const setActiveEditor = (editor) => {
  return { type: ACTIVE_EDITOR, editor };
};

export const toggleHotspotPopup = (id) => {
  return { type: TOGGLE_HOTSPOT_POPUP, id };
};
export const mapShow = (id) => {
  return { type: MAP_SHOW, id };
};

export const setEditorActiveTool = (tools) => {
  return { type: ACTIVE_EDITOR_TOOL, tools };
};

export const notebookBoldClickHandler = () => {
  return { type: NOTEBOOK_BOLD_CLICK };
};

export const notebookItalicClickHandler = () => {
  return { type: NOTEBOOK_ITALIC_CLICK };
};

export const notebookUnderlineClickHandler = () => {
  return { type: NOTEBOOK_UNDERLINE_CLICK };
};

export const notebookUnorderListClickHandler = () => {
  return { type: NOTEBOOK_UNORDERLIST_CLICK };
};

export const notebookFontSizeClickHandler = (size) => {
  return { type: NOTEBOOK_FONT_SIZE_CLICK, size };
};

export const notebookSymbolClickHandler = (data) => {
  return { type: NOTEBOOK_SYMBOL_CLICK, data };
};

export const notebookEmphasisStateChange = (data) => {
  return { type: NOTEBOOK_EMPHASIS_STATE_CHANGE, data };
};

export const labSubmittedHandler = (data) => {
  return { type: LAB_SUBMITTED, data };
};
export const mapPopupHandler = (data) => {
  return { type: SHOW_MAP_POPUP, data };
};
export const setPopupMessage = (value) => {
  return { type: SET_POPUP_MESSAGE, value };
};

export const ariaLiveChange = (data) => {
  return { type: ARIA_LIVE_CHANGE, data };
};

export const selectDraggable = (data) => {
  return { type: SELECT_DRAGGABLE, data };
};

export const setAccessible = (accessible) => {
  return { accessible, type: IS_ACCESSIBLE };
};

export const droppedElement = (value) => {
  return { type: DROPPED_ELEMENT, value };
};
export const setDropped = (val) => {
  return { type: SET_DROPPED, val };
};
export const markTabCompletion = (data) => {
  return { type: MARK_ACTIVITY, data };
};
export const markNoteBookCompletion = (data) => {
  return { type: MARK_NOTEBOOK, data };
};
export const markValidationNoteBook = (data) => {
  return { type: MARK_NOTEBOOK_VALIDATION, data };
};
export const resetAllActivities = () => {
  return { type: RESET_ALL_ACTIVITY };
};

export const thunks = {
  onChangeTab: (id) => {
    return (dispatch, getState) => {
      dispatch(onChangeTab(id));
      dispatch(activeDrawing(false));
      dispatch(showDrawingOptionsHandler(false));
      TincanManager.data.selectedTabIndex = id;
      TincanManager.recordElapsedTime(
        TincanManager.data,
        "section_" + id,
        false
      );
    };
  },
  resetValues: () => {
    return (dispatch, getState) => {
      dispatch(setAccessible(false));
      dispatch(setDropped(false));
      dispatch(droppedElement(null));
    };
  },
  onChangeSubTab: (id) => {
    return (dispatch, getState) => {
      dispatch(onChangeSubTab(id));
      dispatch(activeDrawing(false));
      dispatch(showDrawingOptionsHandler(false));
      saveTincanData();
    };
  },
  markCompletedActivity: (currentTab, currentSubTab) => {
    return (dispatch, getState) => {
      const { markedActivities } = getState();
      const _markedActivity = [...markedActivities];
      const _currentSubTab = currentSubTab;
      if (!_markedActivity[currentTab]) _markedActivity[currentTab] = [];
      if (!_markedActivity[currentTab].includes(_currentSubTab)) {
        _markedActivity[currentTab] = [
          ..._markedActivity[currentTab],
          _currentSubTab,
        ];
        dispatch(markTabCompletion(_markedActivity));
        let skipActivitiesForScoreUpdate = [0]; // @add currentTab inside this array to skip scrore
        let isScoreUpdate = !skipActivitiesForScoreUpdate.includes(currentTab)
          ? 1
          : undefined;
        TincanManager.updateSectionTincanData(
          TincanManager.data,
          `section_${currentTab}`,
          `${TincanManager.data.screens[currentTab].screen}_${currentSubTab}`,
          { score: isScoreUpdate }
        );
        TincanManager.data.markedActivities = _markedActivity;
        saveTincanData();
      }
    };
  },

  markCompletedNoteBook: (data, operation) => {
    return (dispatch, getState) => {
      const { markedNotebooks, notebookData, markedNotebooksValidation } =
        getState();
      let _markedActivity = [...markedNotebooks];
      let _markedNotebooksValidation = [...markedNotebooksValidation];
      const _currentSubTab = data.pageDetails;
      if (operation == "delete") {
        for (var nbModeKey in notebookData.model) {
          if (nbModeKey == `not_scorable_model_${data["data"].pageDetails}`) {
            delete notebookData.model[
              `not_scorable_model_${data["data"].pageDetails}`
            ];
          }
          if (nbModeKey == `not_scorable_screen_${data["data"].pageDetails}`) {
            delete notebookData.model[
              `not_scorable_screen_${data["data"].pageDetails}`
            ];
          }
          dispatch(updateNotebookData(notebookData));
          TincanManager.updateNoteBookTincanData(notebookData);
          saveTincanData();
        }
        // const noteBook = notebookData.pages.filter(
        //   (e) => e.index == data["data"].index
        // );
        // if (
        //   _markedActivity[data["data"].index].includes(data["data"].pageDetails)
        // ) {
        //   const index = _markedActivity[data["data"].index].indexOf(
        //     data["data"].pageDetails
        //   );
        //   if (index > -1) {
        //     _markedActivity[data["data"].index].splice(index, 1);
        //   }
        // }
        // dispatch(markNoteBookCompletion(_markedActivity));
        // TincanManager.data.markedNotebooks = _markedActivity;
        //} else if (operation == "remove") {
        // if (_markedActivity[data.index]) {
        //   const noteBook = notebookData.pages.filter(
        //     (e) => e.index == data.index
        //   );
        //   if (_markedActivity[data.index].includes(_currentSubTab)) {
        //     const index = _markedActivity[data.index].indexOf(_currentSubTab);
        //     if (index > -1) {
        //       _markedActivity[data.index].splice(index, 1);
        //     }
        //     if (
        //       data.validation &&
        //       _markedNotebooksValidation.includes(_currentSubTab)
        //     ) {
        //       const index = _markedNotebooksValidation.indexOf(_currentSubTab);
        //       if (index > -1) {
        //         _markedNotebooksValidation.splice(index, 1);
        //       }
        //       dispatch(markValidationNoteBook(_markedNotebooksValidation));
        //       TincanManager.data.markedNotebooksValidation =
        //         _markedNotebooksValidation;
        //     }
        //   }
        //   dispatch(markNoteBookCompletion(_markedActivity));
        //   TincanManager.data.markedNotebooks = _markedActivity;
        // }
      } else {
        if (!_markedActivity[data.index]) _markedActivity[data.index] = [];
        if (!_markedActivity[data.index].includes(_currentSubTab)) {
          _markedActivity[data.index] = [
            ..._markedActivity[data.index],
            _currentSubTab,
          ];
          if (
            data.validation &&
            !_markedNotebooksValidation.includes(_currentSubTab)
          ) {
            _markedNotebooksValidation = [
              ..._markedNotebooksValidation,
              _currentSubTab,
            ];
            dispatch(markValidationNoteBook(_markedNotebooksValidation));
            TincanManager.data.markedNotebooksValidation =
              _markedNotebooksValidation;
            saveTincanData();
          }
          dispatch(markNoteBookCompletion(_markedActivity));
          TincanManager.data.markedNotebooks = _markedActivity;
          saveTincanData();
        }
      }
    };
  },
  isAllLabCompleted: () => {
    return (dispatch, getState) => {
      const {
        markedActivities,
        defaultLang,
        markedNotebooks,
        notebookData,
        markedNotebooksValidation,
      } = getState();

      const noteBookComlete = notebookData.pages.map((page) => {
        if (page.validation) {
          if (markedNotebooksValidation.includes(page.pageDetails)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });
      // const noteBookComlete = data[defaultLang].translation.tabs.every(
      //   (tab, index) => {
      //     const noteBook = notebookData.pages.filter((e) => e.index == index);
      //     return noteBook.length === markedNotebooks[index]?.length;
      //   }
      // );
      const isCompleted = data[defaultLang].translation.tabs.every(
        (tab, index) => {
          return (
            tab.subTabLength === markedActivities[index]?.length &&
            !noteBookComlete.includes(false)
          );
        }
      );

      if (isCompleted) {
        dispatch(setAllActivitiesStatus(true));
        TincanManager.data.isAllActivitiesCompleted = true;
      }
      dispatch(togglePopup("6"));
    };
  },
  openNoteBook: (id) => {
    return (dispatch, getState) => {
      const { notebookData, activeNotebookSlide, currentTab, currentSubTab } =
        getState();
      const activeParentSlideIndex = notebookData.pages.findIndex(
        (slide) =>
          slide.index === currentTab && slide.subIndex === currentSubTab
      );
      const activeSlideIndex = notebookData.pages.findIndex(
        (slide) => slide.index === currentTab
      );
      if (activeParentSlideIndex > -1) {
        if (activeParentSlideIndex !== activeNotebookSlide)
          dispatch(notebookGoToSlide(activeParentSlideIndex));
        dispatch(togglePopup(id));
      } else {
        if (activeSlideIndex !== activeNotebookSlide)
          dispatch(notebookGoToSlide(activeSlideIndex));
        dispatch(togglePopup(id));
      }
    };
  },
  updateNotebookModelsData: (data) => {
    return (dispatch, getState) => {
      let { notebookData, activeNotebookSlide } = getState();
      //const activeNotebookSlideData = notebookData.pages[activeNotebookSlide];

      // if (
      //   activeNotebookSlideData.pageType === "text" ||
      //   activeNotebookSlideData.pageType === "image"
      // ) {
      //   notebookData.pages[activeNotebookSlide].model = data.model;
      // } else {
      const updatedNotebookModelsData = { ...notebookData.model, ...data };
      notebookData.model = updatedNotebookModelsData;
      // }
      dispatch(updateNotebookData(notebookData));
      TincanManager.updateNoteBookTincanData(notebookData);
      saveTincanData();
    };
  },
  notebookGoToSlide: (index) => {
    return (dispatch, getState) => {
      let { notebookData } = getState();
      dispatch(notebookGoToSlide(index));
      TincanManager.updateNoteBookTincanData(notebookData);
      saveTincanData();
    };
  },
  setVisitedSubIndex: (val) => {
    return (dispatch, getState) => {
      let { visitedSubIndex } = getState();
      let _visitedSubIndex = [...visitedSubIndex, val];
      dispatch(setVisitedSubIndex(_visitedSubIndex));
      TincanManager.data.visitedSubIndex = _visitedSubIndex;
      saveTincanData();
    };
  },
  checkDrop: (item) => {
    return (dispatch, getState) => {
      dispatch(setDropped(true));
      dispatch(droppedElement(item));
    };
  },
  selectDraggable: (item) => {
    return (dispatch, getState) => {
      dispatch(selectDraggable(item));
    };
  },
  languageChange: () => {
    return (dispatch, getState) => {
      const lang = getState().defaultLang === "en" ? "es" : "en";
      dispatch(setLanguage(lang));
      TincanManager.data.defaultLang = lang;
      saveTincanData();
      // dispatch(togglePopup(popupId));s
      // dispatch(resetAllActivities());
      // dispatch(markTabCompletion([]));
      // dispatch(setAllActivitiesStatus(false));
      // dispatch(markNoteBookCompletion([]));
      // dispatch(onChangeTab(0));
      // setTimeout(() => {
      //   dispatch(thunks.markCompletedActivity(0, 0));
      // }, 500);
      // dispatch(labSubmittedHandler(false));
      // TincanManager.data.visitedSubIndex = [];
      // TincanManager.data.markedActivities = [];
      // TincanManager.data.isAllActivitiesCompleted = false;
      // TincanManager.data.labSubmitted = false;
    };
  },
};
