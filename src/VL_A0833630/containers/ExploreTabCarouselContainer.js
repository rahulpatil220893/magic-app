import { connect } from "react-redux";
import { TabCarousel } from "../../app/components/Carousel";
import { thunks, ariaLiveChange } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    markedActivities: state.markedActivities,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
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

const ExploreTabCarouselContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabCarousel);

export default ExploreTabCarouselContainer;
