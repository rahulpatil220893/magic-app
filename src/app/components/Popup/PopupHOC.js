import React from "react";
import PropTypes from "prop-types";
//import Portal from './Portal';

class PopupHOC extends React.Component {
  constructor(props) {
    super(props);
    this.draggableRef = React.createRef();
  }
  componentDidMount() {
    const { togglePopup } = this.props;

    // eslint-disable-next-line no-undef
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 27) {
        const { currentPopup } = this.props;
        if (currentPopup.length) {
          togglePopup(currentPopup[currentPopup.length - 1]);
        }
      }
    });

    // jQuery((this.draggableRef.current)).draggable({
    //   cancel: ".vl-content-editable, .content-editable, .vl-notebook-toolbar",
    //   cursor: "move"
    // });
  }

  render() {
    const {
      children,
      togglePopup,
      currentPopup,
      onClick,
      onTouchStart,
      t,
      popupData,
    } = this.props;

    const popupCount = currentPopup.length;
    return (
      <React.Fragment>
        <div
          className={`vl vl-popups-container ${
            currentPopup.length ? "vl-popup-show" : ""
          }`}
        >
          {popupCount && (
            <div
              className={`vl-popups-overlay popup-${
                currentPopup[currentPopup.length - 1]
              }`}
              onClick={
                onClick
                  ? () => {
                      togglePopup("-1");
                    }
                  : undefined
              }
              onTouchStart={
                onTouchStart
                  ? () => {
                      togglePopup("-1");
                    }
                  : undefined
              }
              style={{ zIndex: 500 + popupCount * 2 - 1 }}
            />
          )}

          {React.Children.map(children, (popup, i) => {
            return React.cloneElement(popup, {
              key: `popup-${popup.props.popupid}`,
              index: i,
              isSelected: () => currentPopup.includes(popup.props.popupid),
              isActive:
                currentPopup.indexOf(popup.props.popupid) ===
                currentPopup.length - 1,
              closePopup: togglePopup,
              style: { zIndex: 502 + i * 2 },
              t,
              popupData: popupData,
              focusTooltip: this.props.focusTooltip,
              updateFocusTooltip: this.props.updateFocusTooltip,
              widthChange: this.props.widthChange,
              currentPopup: currentPopup,
            });
          })}
        </div>
      </React.Fragment>
    );
  }
}

PopupHOC.propTypes = {
  children: PropTypes.node.isRequired,
  togglePopup: PropTypes.func.isRequired,
  currentPopup: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onTouchStart: PropTypes.func,
};

export default PopupHOC;
