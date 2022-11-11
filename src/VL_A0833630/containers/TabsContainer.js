import { connect } from "react-redux";
import Tabs from "../../app/components/Tabs";
import { thunks, ariaLiveChange } from "../actions";

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    markedActivities: state.markedActivities,
    tabValue: state.isMapShow,
    currentSubTab: state.currentSubTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTab: (id) => {
      dispatch(thunks.onChangeTab(id));
    },
    updateAriaLiveText: (text) => {
      dispatch(ariaLiveChange(text));
      setTimeout(() => {
        dispatch(ariaLiveChange(""));
      }, 500);
    },
  };
};

const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);

export default TabsContainer;
