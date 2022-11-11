import { combineReducers } from "redux";
import * as data from "../data/config";
import { xor } from "lodash";

import {
  WIDTH_CHANGE,
  ON_CHANGE_TAB,
  ON_CHANGE_SUB_TAB,
  TOGGLE_POPUP,
  ACTIVE_DRAWING,
  UPDATE_DRAWING_OPTIONS,
  SHOW_DRAWING_OPTIONS,
  NOTEBOOK_DATA,
  NOTEBOOK_GOTO_SLIDE,
  CLEAR_DRAWING,
  ENABLE_CLEAR_DRAWING,
  SCREEN_SHOT_CLICK,
  NOTEBOOK_CONFIRM_CLICK,
  FOCUSED_EDITOR,
  ACTIVE_EDITOR,
  TOGGLE_HOTSPOT_POPUP,
  VISITED_SUB_INDEX,
  TABS_WITH_DISABLED_SUBTABS,
  ACTIVE_EDITOR_TOOL,
  NOTEBOOK_BOLD_CLICK,
  NOTEBOOK_ITALIC_CLICK,
  NOTEBOOK_UNDERLINE_CLICK,
  NOTEBOOK_UNORDERLIST_CLICK,
  NOTEBOOK_FONT_SIZE_CLICK,
  NOTEBOOK_EMPHASIS_STATE_CHANGE,
  LAB_SUBMITTED,
  ARIA_LIVE_CHANGE,
  SET_LANGUAGE,
  SHOW_MAP_POPUP,
  SET_POPUP_MESSAGE,
  IS_ACCESSIBLE,
  SELECT_DRAGGABLE,
  NOTEBOOK_SYMBOL_CLICK,
  DROPPED_ELEMENT,
  SET_DROPPED,
  MARK_ACTIVITY,
  ALL_ACTIVITY_COMPLETED,
  MARK_NOTEBOOK,
  RESET_ALL_ACTIVITY,
  SCALE_CHANGE,
  FOCUS_TOOLTIP,
  MARK_NOTEBOOK_VALIDATION,
  MAP_SHOW,
} from "../actions";

import { drawingToolOptionsInitial } from "../data";

const activeEditorToolsInit = {
  bold: false,
  italic: false,
  underline: false,
  unorderlist: false,
};

const notebookEmphasisStateInit = {
  bold: false,
  italic: false,
  underline: false,
  unOrderedList: false,
};

function appConfig(state = data.config) {
  return state;
}

function concludeConfig(state = data.concludeData) {
  return state;
}

function widthChange(state = {}, action) {
  switch (action.type) {
    case WIDTH_CHANGE:
      return { ...action.data };
    default:
      return state;
  }
}

function currentTab(state = 0, action) {
  switch (action.type) {
    case ON_CHANGE_TAB:
      return action.id;
    default:
      return state;
  }
}

function currentSubTab(state = 0, action) {
  switch (action.type) {
    case ON_CHANGE_SUB_TAB:
      return action.id;
    default:
      return state;
  }
}

function popupMessage(state = "", action) {
  switch (action.type) {
    case SET_POPUP_MESSAGE:
      return action.value;
    default:
      return state;
  }
}
function currentPopup(state = [], action) {
  switch (action.type) {
    case TOGGLE_POPUP:
      return xor(state, [].concat(action.ids));
    default:
      return state;
  }
}

function activeDrawing(state = false, action) {
  switch (action.type) {
    case ACTIVE_DRAWING:
      return action.data;
    default:
      return state;
  }
}

function drawingToolOptions(state = drawingToolOptionsInitial, action) {
  switch (action.type) {
    case UPDATE_DRAWING_OPTIONS:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

function showDrawingOptions(state = false, action) {
  switch (action.type) {
    case SHOW_DRAWING_OPTIONS:
      return action.data;
    default:
      return state;
  }
}

function notebookData(state = data.notebookData, action) {
  switch (action.type) {
    case NOTEBOOK_DATA:
      return { ...action.data };
    default:
      return state;
  }
}

function activeNotebookSlide(state = 0, action) {
  switch (action.type) {
    case NOTEBOOK_GOTO_SLIDE:
      return action.index;
    default:
      return state;
  }
}

function clearDrawing(state = false, action) {
  switch (action.type) {
    case CLEAR_DRAWING:
      return !state;
    default:
      return state;
  }
}

function enableClearDrawing(state = false, action) {
  switch (action.type) {
    case ENABLE_CLEAR_DRAWING:
      return action.data;
    default:
      return state;
  }
}

function screenShotClick(state = false, action) {
  switch (action.type) {
    case SCREEN_SHOT_CLICK:
      return !state;
    default:
      return state;
  }
}

const checkedDrop = (state = null, action) => {
  switch (action.type) {
    case DROPPED_ELEMENT:
      return action.value;
    default:
      return state;
  }
};

const setDropped = (state = false, action) => {
  switch (action.type) {
    case SET_DROPPED:
      return action.val;
    default:
      return state;
  }
};

const isAccessible = (state = false, action) => {
  switch (action.type) {
    case IS_ACCESSIBLE:
      return action.accessible;
    default:
      return state;
  }
};
const selectedDraggable = (state = {}, action) => {
  switch (action.type) {
    case SELECT_DRAGGABLE:
      return action.data;
    default:
      return state;
  }
};

const isMapShow = (state = false, action) => {
  switch (action.type) {
    case MAP_SHOW:
      return action.id;
    default:
      return state;
  }
};

function notebookConfirmClick(state = false, action) {
  switch (action.type) {
    case NOTEBOOK_CONFIRM_CLICK:
      return !state;
    default:
      return state;
  }
}
function currentHotspotPopup(state = [], action) {
  switch (action.type) {
    case TOGGLE_HOTSPOT_POPUP:
      return xor(state, [].concat(action.id));
    default:
      return state;
  }
}

function visitedSubIndex(state, action) {
  switch (action.type) {
    case VISITED_SUB_INDEX:
      return action.array;
    default:
      return (state = TincanManager.data.visitedSubIndex || []);
  }
}
function tabsWithDisabledSubtabs(state, action) {
  switch (action.type) {
    case TABS_WITH_DISABLED_SUBTABS:
      return action.array;
    default:
      return (state = TincanManager.data.tabsWithDisabledSubtabs || []);
  }
}

function focusedEditor(state = "", action) {
  switch (action.type) {
    case FOCUSED_EDITOR:
      return action.editor;
    default:
      return state;
  }
}

function activeEditor(state = "", action) {
  switch (action.type) {
    case ACTIVE_EDITOR:
      return action.editor;
    default:
      return state;
  }
}

function toggleHotspotPopup(state = false, action) {
  switch (action.type) {
    case TOGGLE_HOTSPOT_POPUP:
      return !state;
    default:
      return state;
  }
}

function activeEditorTool(state = activeEditorToolsInit, action) {
  switch (action.type) {
    case ACTIVE_EDITOR_TOOL:
      return action.tools;
    default:
      return state;
  }
}

function notebookBoldClick(state = false, action) {
  switch (action.type) {
    case NOTEBOOK_BOLD_CLICK:
      return !state;
    default:
      return state;
  }
}

function notebookItalicClick(state = false, action) {
  switch (action.type) {
    case NOTEBOOK_ITALIC_CLICK:
      return !state;
    default:
      return state;
  }
}

function notebookUnderlineClick(state = false, action) {
  switch (action.type) {
    case NOTEBOOK_UNDERLINE_CLICK:
      return !state;
    default:
      return state;
  }
}

function notebookUnorderListClick(state = false, action) {
  switch (action.type) {
    case NOTEBOOK_UNORDERLIST_CLICK:
      return !state;
    default:
      return state;
  }
}

function notebookFontSizeClick(state = {}, action) {
  switch (action.type) {
    case NOTEBOOK_FONT_SIZE_CLICK:
      return { ...action.size };
    default:
      return state;
  }
}

function notebookSymbolClick(state = {}, { type, data }) {
  switch (type) {
    case NOTEBOOK_SYMBOL_CLICK:
      return data;
    default:
      return state;
  }
}

function notebookEmphasisState(state = notebookEmphasisStateInit, action) {
  switch (action.type) {
    case NOTEBOOK_EMPHASIS_STATE_CHANGE:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

function labSubmitted(state, action) {
  switch (action.type) {
    case LAB_SUBMITTED:
      return action.data;
    default:
      return (state = TincanManager.data.labSubmitted || false);
  }
}

function ariaLiveText(state = "", action) {
  switch (action.type) {
    case ARIA_LIVE_CHANGE:
      return action.data;
    default:
      return state;
  }
}

function defaultLang(state, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.val;
    default:
      return (state = TincanManager.data.defaultLang || "en");
  }
}
function mapPopupHandlerState(state = false, action) {
  switch (action.type) {
    case SHOW_MAP_POPUP:
      return action.data;
    default:
      return state;
  }
}

function markedActivities(state, { type, data }) {
  switch (type) {
    case MARK_ACTIVITY:
      return data;
    default:
      return (state = TincanManager.data.markedActivities || []);
  }
}

function markedNotebooks(state, { type, data }) {
  switch (type) {
    case MARK_NOTEBOOK:
      return data;
    default:
      return (state = TincanManager.data.markedNotebooks || []);
  }
}

function markedNotebooksValidation(state, { type, data }) {
  switch (type) {
    case MARK_NOTEBOOK_VALIDATION:
      return data;
    default:
      return (state = TincanManager.data.markedNotebooksValidation || []);
  }
}

function isAllActivitiesCompleted(state, { type, val }) {
  switch (type) {
    case ALL_ACTIVITY_COMPLETED:
      return val;
    default:
      return (state = TincanManager.data.isAllActivitiesCompleted || false);
  }
}

function resetAllActivities(state = false, { type }) {
  switch (type) {
    case RESET_ALL_ACTIVITY:
      return !state;
    default:
      return state;
  }
}

const scale = (state = 1, { type, scale }) => {
  switch (type) {
    case SCALE_CHANGE:
      return scale;
    default:
      return state;
  }
};

export const focusTooltip = (state = false, { type, value }) => {
  switch (type) {
    case FOCUS_TOOLTIP:
      return value;
    default:
      return state;
  }
};

const appReducers = combineReducers({
  markedActivities,
  appConfig,
  scale,
  concludeConfig,
  widthChange,
  currentTab,
  currentSubTab,
  currentPopup,
  isAccessible,
  selectedDraggable,
  notebookData,
  activeDrawing,
  showDrawingOptions,
  drawingToolOptions,
  activeNotebookSlide,
  clearDrawing,
  enableClearDrawing,
  screenShotClick,
  notebookConfirmClick,
  currentHotspotPopup,
  visitedSubIndex,
  tabsWithDisabledSubtabs,
  focusedEditor,
  activeEditor,
  toggleHotspotPopup,
  activeEditorTool,
  notebookBoldClick,
  notebookItalicClick,
  notebookUnderlineClick,
  notebookUnorderListClick,
  notebookFontSizeClick,
  notebookEmphasisState,
  labSubmitted,
  ariaLiveText,
  defaultLang,
  mapPopupHandlerState,
  popupMessage,
  notebookSymbolClick,
  checkedDrop,
  setDropped,
  isAllActivitiesCompleted,
  markedNotebooks,
  resetAllActivities,
  focusTooltip,
  markedNotebooksValidation,
  isMapShow,
});

export default appReducers;
