import { connect } from "react-redux";
import StickyNotes from "../../app/components/StickyNotes";
import { thunks } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.concludeConfig.stickyNotes,
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markCompletedActivity: (currentTab) => {
      dispatch(thunks.markCompletedActivity(currentTab));
    },
  };
};

const StickyNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyNotes);

export default StickyNotesContainer;
