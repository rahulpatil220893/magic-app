import { connect } from "react-redux";
import { TabCarousel } from "../../app/components/Carousel";
import { thunks, ariaLiveChange } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    tabsWithDisabledSubtabs: [0],
    visitedSubtabs: state.visitedSubIndex,
    tabIndice: state.isMapShow,
    markedActivities: state.markedActivities,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length || state.isMapShow,
    markedActivities: state.markedActivities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSubTab: (id) => {
      dispatch(thunks.onChangeSubTab(id));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const ConcludeTabCarouselContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabCarousel);

export default ConcludeTabCarouselContainer;
