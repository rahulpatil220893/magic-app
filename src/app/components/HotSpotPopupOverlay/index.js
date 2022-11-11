import React from "react";
import LeftPopup from "./LeftPopup";
import RightPopup from "./RightPopup";
import PropTypes from "prop-types";
import { isAndroid } from "react-device-detect";

class HotSpotPopupOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.button = React.createRef(null);
    this.firstElement = "";
    this.lastElement = "";
    this.state = {
      show: false,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.currentHotspotPopup.includes(this.props.data.id)) {
      this.setState({
        show: true,
      });

      setTimeout(() => {
        // const audioElement = document.querySelectorAll(".tab-panels .active .vl-carousel-slide-container.active .vl-hotspotpanel-sidePanel .vl-audio-play-icon")[0];
        // if (audioElement) {
        //   audioElement.focus()
        // }
      }, 100);
    } else {
      this.setState({
        show: false,
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 27) {
        const { toggleHotspotPopup, data } = this.props;
        // if (this.state.show)
        this.state.show ? toggleHotspotPopup(data.id) : null;
      }
    });
  }
  onFocusFirstElement = () => {
    if (this.lastElement) {
      this.lastElement.focus();
    } else {
      this.button.current.focus();
    }
  };

  onFocusLastElement = () => {
    if (this.firstElement) {
      this.firstElement.focus();
    } else {
      this.button.current.focus();
    }
  };
  render() {
    const {
      toggleHotspotPopup,
      data,
      currentSubTab,
      currentTab,
      updateAriaLiveText,
      currentLangData,
      t,
      widthChange,
      focusTooltip,
      updateFocusTooltip,
      defaultLang,
      isPopupActive,
      audioOverlap,
      upadateAudioOverLap,
      focusOut,
    } = this.props;
    const { show } = this.state;
    const fullScreenPopup =
      data && data.type && data.type.includes("fullscreen");
    return show ? (
      <React.Fragment>
        <div
          tabIndex={isPopupActive || isAndroid || focusOut ? null : "0"}
          className="vl-popups-first-element"
          onFocus={this.onFocusFirstElement}
          onBlur={this.onBlurFirstElement}
        />
        {data.type.includes("left") ? (
          <div
            className={`vl-hotspotpanel-container left ${
              fullScreenPopup ? "boxshadow" : ""
            }`}
          >
            <LeftPopup
              ref={this.button}
              t={t}
              popupData={data}
              toggleHotspotPopup={toggleHotspotPopup}
              updateAriaLiveText={updateAriaLiveText}
              currentLangData={currentLangData}
              fullScreenPopup={fullScreenPopup}
              focusTooltip={focusTooltip}
              updateFocusTooltip={updateFocusTooltip}
              defaultLang={defaultLang}
              currentTab={currentTab}
              isPopupActive={isPopupActive}
            />
          </div>
        ) : null}

        {data.type.includes("right") ? (
          <div
            className={`vl-hotspotpanel-container right ${
              fullScreenPopup ? "boxshadow" : ""
            }`}
          >
            <RightPopup
              ref={this.button}
              t={t}
              popupData={data}
              toggleHotspotPopup={toggleHotspotPopup}
              currentSubTab={currentSubTab}
              currentTab={currentTab}
              currentLangData={currentLangData}
              widthChange={widthChange}
              focusTooltip={focusTooltip}
              updateFocusTooltip={updateFocusTooltip}
              isPopupActive={isPopupActive}
              audioOverlap={audioOverlap}
              upadateAudioOverLap={upadateAudioOverLap}
              defaultLang={defaultLang}
            />
          </div>
        ) : null}
        <div
          tabIndex={isPopupActive || isAndroid || focusOut ? null : "0"}
          className="vl-popups-last-element"
          onFocus={this.onFocusLastElement}
          onBlur={this.onBlurLastElement}
        />
      </React.Fragment>
    ) : null;
  }
}
HotSpotPopupOverlay.propTypes = {
  data: PropTypes.object,
  toggleHotspotPopup: PropTypes.func,
  updateAriaLiveText: PropTypes.func,
  currentSubTab: PropTypes.any,
  currentTab: PropTypes.any,
};

HotSpotPopupOverlay.defaultProps = {
  t: () => {},
};
export default HotSpotPopupOverlay;
