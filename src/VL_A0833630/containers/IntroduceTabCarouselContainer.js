import { connect } from "react-redux";
import { TabCarousel } from "../../app/components/Carousel";
import { thunks } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    setVisitedSubIndex: state.setVisitedSubIndex,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSubTab: (id) => {
      dispatch(thunks.onChangeSubTab(id));
    },
  };
};

const IntroduceTabCarouselContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabCarousel);

export default IntroduceTabCarouselContainer;
