import { connect } from "react-redux";
import { t } from "i18next";
import IntroduceDefaultView from "../../app/components/Introduce";
import {
  enableClearDrawingHandler,
  showDrawingOptionsHandler,
  thunks,
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    widthChange: state.widthChange,
    currentTab: state.currentTab,
    currentSubTab: state.currentSubTab,
    activeDrawing: state.activeDrawing,
    screenIndex: ownProps.screenIndex,
    drawingToolOptions: state.drawingToolOptions,
    clearDrawing: state.clearDrawing,
    isPopupActive: !!state.currentPopup.length,
    ariaHidden: !!state.currentPopup.length,
    ariaLabel: t("images.Introduction"),
  };
};

const mapDispatchToProps = (dispatch) => {
  {
    return {
      enableClearDrawingHandler: (data) => {
        dispatch(enableClearDrawingHandler(data));
      },
      showDrawingOptionsHandler: (data) => {
        dispatch(showDrawingOptionsHandler(data));
      },
    };
  }
};

const IntroduceDefaultViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroduceDefaultView);

export default IntroduceDefaultViewContainer;
