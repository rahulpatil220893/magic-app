import { connect } from "react-redux";
import Header from "../../app/components/Header";
import {
  thunks,
  togglePopup,
  setLanguage,
  updateFocusTooltip,
} from "../actions";
import { saveTincanData } from "../../app/tincan";

const mapStateToProps = (state) => {
  return {
    notebookPopupId: "0",
    helpPopupId: "5",
    savePopupId: "7",
    progressPopupId: "8",
    notebookPopupOpened: state.currentPopup.includes("0"),
    helpPopupOpened: state.currentPopup.includes("5"),
    savePopupOpened: state.currentPopup.includes("7"),
    labSubmitted: state.labSubmitted,
    isFirstTime: TincanManager.data.isFirstTime,
    defaultLang: state.defaultLang,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notebookClickHandler: (id) => {
      dispatch(thunks.openNoteBook(id));
    },
    helpClickHandler: (id) => {
      dispatch(togglePopup(id));
    },
    saveClickHandler: (id) => {
      saveTincanData();
      dispatch(togglePopup(id));
    },
    changeLanguage: () => {
      dispatch(thunks.languageChange());
    },
    scoreClickHandler: (id) => {
      dispatch(togglePopup(id));
    },
    togglePopup: (id) => {
      dispatch(togglePopup(id));
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(true));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
