import { connect } from "react-redux";
import HotSpotPanel from "../../app/components/HotSpotPopupOverlay";
import { toggleHotspotPopup, updateFocusTooltip } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    currentHotspotPopup: state.currentHotspotPopup,
    ...ownProps,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    widthChange: state.widthChange,
    focusTooltip: state.focusTooltip,
    defaultLang: state.defaultLang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHotspotPopup: (id) => {
      // console.log(id);
      setTimeout(() => {
        const selectedHostspot = document.getElementsByClassName(id);
        $(selectedHostspot).focus();
      });
      dispatch(toggleHotspotPopup(id));
    },
    updateFocusTooltip: () => {
      dispatch(updateFocusTooltip(false));
    },
  };
};

const HotspotConatiner = connect(
  mapStateToProps,
  mapDispatchToProps
)(HotSpotPanel);

export default HotspotConatiner;
