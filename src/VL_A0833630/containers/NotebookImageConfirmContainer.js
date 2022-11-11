import { connect } from "react-redux";
import { NotebookConfirmPopup } from "../../app/components/Notebook";
import { togglePopup, notebookDeleteClickHandler } from "../actions";

const mapStateToProps = (state) => {
  return {
    // body: "Are you sure you want to delete the screenshot page",
    notebookConfirmId: "3",
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: (popupId) => {
      dispatch(togglePopup(popupId));
    },
    onConfirm: (popupId) => {
      dispatch(notebookDeleteClickHandler());
      dispatch(togglePopup(popupId));
    },
  };
};

const NotebookConfirmContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotebookConfirmPopup);

export default NotebookConfirmContainer;
