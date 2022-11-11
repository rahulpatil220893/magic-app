import { connect } from "react-redux";
import AppComponent from "../components/AppComponent";
import {
  updateNotebookData,
  thunks,
  labSubmittedHandler,
  togglePopup,
  ariaLiveChange,
} from "../actions";

const mapStateToProps = (state) => {
  return {
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    ariaLiveText: state.ariaLiveText,
    defaultLang: state.defaultLang,
    popupMessage: state.popupMessage,
    currentPopup: state.currentPopup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNotebookData: (data) => {
      dispatch(updateNotebookData(data));
    },
    onChangeTab: (id) => {
      dispatch(thunks.onChangeTab(id));
    },
    labSubmittedHandler: (data) => {
      dispatch(labSubmittedHandler(data));
      TincanManager.data.labSubmitted = data;
    },
    togglePopup: (id) => {
      dispatch(togglePopup(id));
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

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default AppContainer;
