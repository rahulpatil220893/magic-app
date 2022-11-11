import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../Button";
import { clone } from "lodash";
import Tooltip from "../Tooltip";
import { responsiveDrag, responsiveDrop } from "../../helpers/jquery";
//import closeIcon from '../../assets/icons/x.svg';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.button = "";
    this.isSelected = false;
    this.firstElement = "";
    this.lastElement = "";

    this._containmentW = "";
    this._containmentH = "";
    this._objW = "";
    this._objH = "";
    this._objOffSet = "";
    this._scale = 1;
    this.ui = {};

    this.state = {
      popupFirstElementFocus: false,
      popupLastElemetFocus: false,
    };
    this.draggableRef = React.createRef(null);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { isSelected } = newProps;

    if (isSelected() !== this.isSelected) {
      if (isSelected() === true) {
        setTimeout(() => {
          // && !$("body").hasClass("no-outline")
          if (!this.props.autoClose) {
            this.button.focus();
          }
        }, 10);
      }
      this.isSelected = isSelected();
    }
    if (newProps.widthChange.windowSize !== this.props.widthChange.windowSize) {
      if (this.props.drag) {
        setTimeout(() => {
          const container = jQuery("body");
          this._containmentW = container.width();
          this._containmentH = container.height();
          this._objW = jQuery(this.draggableRef.current).outerWidth();
          this._objH = jQuery(this.draggableRef.current).outerHeight();
          const dragOffX = (this._objW * 70) / 100;
          const dragOffY = (this._objH * 70) / 100;

          // bottom bound check
          if (
            Number(this.draggableRef.current.style.top.replace("px", "")) >
            this._containmentH - this._objH + dragOffY
          ) {
            this.draggableRef.current.style.top =
              this._containmentH - this._objH + dragOffY + "px";
          }

          // right bound check
          if (
            Number(this.draggableRef.current.style.left.replace("px", "")) >
            this._containmentW - this._objW + dragOffX / 2
          ) {
            this.draggableRef.current.style.left =
              this._containmentW - this._objW + dragOffX / 2 + "px";
          }
        });
      }
    }
  }

  onFocusFirstElement = () => {
    if (this.lastElement) {
      if (this.lastElement.disabled) {
        this.lastElement.parentNode.previousSibling
          .querySelector("button")
          .focus();
      } else {
        this.lastElement.focus();
      }
    } else if (this.props.currentPopup.includes("5")) {
      document.querySelector(".cta-wrapper").querySelector("button").focus();
    } else {
      if (!this.props.autoClose) {
        this.button.focus();
      }
    }
  };

  onFocusLastElement = () => {
    if (this.firstElement) {
      this.firstElement.focus();
    } else {
      if (!this.props.autoClose) {
        this.button.focus();
      }
    }
  };

  setPopupFirstElement = (element) => {
    this.firstElement = element;
  };

  setPopupLastElement = (element) => {
    this.lastElement = element;
  };
  closepopupmenu = (popupid) => {
    const { closePopup } = this.props;
    closePopup(popupid);
    this.props.updateFocusTooltip();
  };

  dragFix = (event, ui) => {
    let boundReached = false;
    const dragOffX = (this._objW * 70) / 100;
    const dragOffY = (this._objH * 70) / 100;
    let changeLeft = ui.position.left - ui.originalPosition.left;
    let newLeft = ui.originalPosition.left + changeLeft;
    let changeTop = ui.position.top - ui.originalPosition.top;
    let newTop = ui.originalPosition.top + changeTop;
    const classes = document.querySelector(".vl-responsive-wrapper").classList;

    // top bound check
    if (classes[3] == "large") {
      if (newTop < 0) {
        newTop = 0;
        boundReached = true;
      }
    } else {
      if (newTop < -(this._containmentH - this._objH)) {
        newTop = -(this._containmentH - this._objH);
        boundReached = true;
      }
    }

    // bottom bound check
    if (ui.position.top > this._containmentH - this._objH + dragOffY) {
      newTop = this._containmentH - this._objH + dragOffY;
      boundReached = true;
    }

    // left bound check
    if (classes[3] == "large") {
      if (newLeft < -((this._containmentW - this._objW) / 2)) {
        newLeft = -((this._containmentW - this._objW) / 2);
        boundReached = true;
      }
    } else {
      if (newLeft < -((this._containmentW - this._objW) / 2 + dragOffX)) {
        newLeft = -((this._containmentW - this._objW) / 2 + dragOffX);
        boundReached = true;
      }
    }

    // right bound check
    if (ui.position.left > this._containmentW - this._objW + dragOffX / 2) {
      newLeft = this._containmentW - this._objW + dragOffX / 2;
      boundReached = true;
    }

    // fix position
    ui.position.left = newLeft;
    ui.position.top = newTop;

    // inside bounds
    if (!boundReached) {
      // do stuff when element is dragged inside bounds
    }

    // let boundReached = false;
    // let changeLeft = ui.position.left - ui.originalPosition.left,
    //   newLeft = ui.originalPosition.left + changeLeft,
    //   changeTop =
    //     ui.position.top -
    //     ui.originalPosition.top,
    //   newTop = ui.originalPosition.top + changeTop;
    // ui.position.left = newLeft;
    // ui.position.top = newTop;

    // // dragOff percentage for draggable
    // const dragOffX = (this._objW * 70) / 100;
    // const dragOffY = (this._objH * 70) / 100;
    // // right bound check
    // if (ui.position.left > this._containmentW - this._objW) {
    //   newLeft = this._containmentW - this._objW; //this._containmentW - this._objW;
    //   boundReached = true;
    // }

    // // left bound check
    // if (newLeft < -((this._containmentW - this._objW) / 2 + dragOffX)) {
    //   newLeft = -((this._containmentW - this._objW) / 2 + dragOffX);
    //   boundReached = true;
    // }

    // // bottom bound check
    // if (ui.position.top > this._containmentH - this._objH + dragOffY) {
    //   newTop = this._containmentH - this._objH + dragOffY; //this._containmentH - this._objH;
    //   boundReached = true;
    // }

    // // top bound check
    // if (classes[3] == "large") {
    //   if (newTop < 0) {
    //     //-dragOffY
    //     newTop = 0; //-dragOffY
    //     boundReached = true;
    //   }
    // } else {
    //   if (newTop < -dragOffY) {
    //     newTop = -dragOffY;
    //     boundReached = true;
    //   }
    // }

    // // fix position
    // ui.position.left = newLeft;
    // ui.position.top = newTop;

    // // inside bounds
    // if (!boundReached) {
    //   // do stuff when element is dragged inside bounds
    // }
  };

  dragStartFix = (event, ui) => {
    const container = jQuery("body");
    ui.position.left = 0;
    ui.position.top = 0;
    this._containmentW = container.width();
    this._containmentH = container.height();
    this._objW = jQuery(this.draggableRef.current).outerWidth();
    this._objH = jQuery(this.draggableRef.current).outerHeight();
    responsiveDrop(1);
    responsiveDrag(1);
  };
  toolTipShow = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.add("show");
      div.setAttribute("aria-hidden", false);
    }
  };

  toolTipHide = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
  };

  componentDidMount() {
    if (this.props.drag) {
      jQuery(this.draggableRef.current).draggable({
        start: this.dragStartFix,
        drag: this.dragFix,
        ...this.props.dragOptions,
      });
    }
  }

  render() {
    const {
      className,
      children,
      isSelected,
      popupid,
      style,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      isActive,
      role,
      t,
      popupData,
      autoClose,
    } = this.props;

    const classes = classNames(
      "vl-popup-container",
      className,
      isSelected() && "vl-popup-show"
    );
    return (
      <div
        aria-modal="true"
        className={classes}
        style={style}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ? ariaLabelledBy : null}
        aria-describedby={ariaDescribedBy ? ariaDescribedBy : null}
        aria-hidden={!isActive}
        role={role ? role : "dialog"}
        ref={this.draggableRef}
      >
        <div>
          <div
            tabIndex="0"
            className="vl-popups-first-element"
            onFocus={this.onFocusFirstElement}
            onBlur={this.onBlurFirstElement}
          />

          {!autoClose && (
            <>
              <Button
                ref={(button) => {
                  this.button = button;
                }}
                type="button"
                aria-label={popupData.closeButton}
                className="vl-popup-close icon-closenote"
                onClick={() => {
                  this.closepopupmenu(popupid);
                }}
                onMouseOver={(e) => this.toolTipShow(e)}
                onMouseLeave={(e) => this.toolTipHide(e)}
                onFocus={(e) => {
                  document.body.className == "no-outline"
                    ? null
                    : this.toolTipShow(e);
                }}
                onBlur={(e) => this.toolTipHide(e)}
              />
              <Tooltip
                title={popupData.closeButton}
                classes="Close"
                id={popupData.closeButton}
                // position="left"
              />
            </>
          )}

          {React.cloneElement(children, {
            setPopupFirstElement: this.setPopupFirstElement,
            setPopupLastElement: this.setPopupLastElement,
            t,
          })}

          <div
            tabIndex="0"
            className="vl-popups-last-element"
            onFocus={this.onFocusLastElement}
            onBlur={this.onBlurLastElement}
          />
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  closePopup: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  drag: PropTypes.bool,
  dragOptions: PropTypes.object,
};

Popup.defaultProps = {
  className: "",
  ariaLabel: "",
  ariaLabelledBy: "",
  ariaDescribedBy: "",
  closePopup: () => {},
  isSelected: () => {},
  drag: false,
  dragOptions: {},
};

export default Popup;
