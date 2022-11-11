import React from "react";
import PropTypes from "prop-types";
import { responsiveDrag, responsiveDrop } from "../../helpers/jquery";

class StickNote extends React.Component {
  constructor(props) {
    super(props);
    this._stickyNote = null;
    this._stickyNoteWrapper = null;

    this._containmentW = "";
    this._containmentH = "";
    this._objW = "";
    this._objH = "";
    this._scale = 1;
  }

  dragFix = (event, ui) => {
    let boundReached = false;
    let changeLeft = ui.position.left - ui.originalPosition.left,
      newLeft = ui.originalPosition.left + changeLeft / this._scale,
      changeTop = ui.position.top - ui.originalPosition.top,
      newTop = ui.originalPosition.top + changeTop / this._scale;
    ui.position.left = newLeft;
    ui.position.top = newTop;

    if (ui.position.left > this._containmentW - this._objW) {
      newLeft = this._containmentW - this._objW;
      boundReached = true;
    }

    // left bound check
    if (newLeft < 0) {
      newLeft = 0;
      boundReached = true;
    }

    // bottom bound check
    if (ui.position.top > this._containmentH - this._objH) {
      newTop = this._containmentH - this._objH;
      boundReached = true;
    }

    // top bound check
    if (newTop < 0) {
      newTop = 0;
      boundReached = true;
    }

    // fix position
    ui.position.left = newLeft;
    ui.position.top = newTop;

    // inside bounds
    if (!boundReached) {
      // do stuff when element is dragged inside bounds
    }
  };

  startFixDroppableContainer = (event, ui) => {
    const depth = this.props.getDepth();
    const container = jQuery(this.props.droppableConatiner());
    ui.position.left = 0;
    ui.position.top = 0;
    ui.helper.css("z-index", depth + 1);
    this.props.setDepth(depth + 1);

    const imagineDrag = container;
    imagineDrag.unbind("mousedown mousemove mouseleave");
    imagineDrag.off("touchstart touchmove touchend");
    this._containmentW = container.width();
    this._containmentH = container.height();
    this._objW = jQuery(this._stickyNoteWrapper).outerWidth();
    this._objH = jQuery(this._stickyNoteWrapper).outerHeight();
  };

  componentDidMount() {
    const {
      maxChar,
      currentTab,
      markCompletedActivity,
      currentSubTab,
      responsive,
    } = this.props;
    const stickyWrapper = jQuery(this._stickyNoteWrapper);
    const stickyNote = jQuery(this._stickyNote);
    stickyWrapper.draggable({
      cancel: ".stick-notes",
      containment: stickyNote.parent().parent(),
      // start: this.startFixDroppableContainer,
      // drag: this.dragFix,
      start: (e, ui) => {
        if (!responsive) {
          responsiveDrop(1);
          responsiveDrag(1);
        }
      },
    });
    let clicks = 0;
    stickyNote
      .on("click", function () {
        if (clicks == 0) {
          jQuery(this)[0].focus();
          var range = document.createRange();
          range.selectNodeContents(jQuery(this)[0]);
          range.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          jQuery(this).focus();
        }
        ++clicks;
        //stickyWrapper.draggable({ disabled: true });
      })
      .on("blur", function () {
        //stickyWrapper.draggable({ disabled: false });
      })
      .on("keydown", function (event) {
        if (
          event.keyCode === 8 ||
          event.keyCode === 46 ||
          event.keyCode === 37 ||
          event.keyCode === 38 ||
          event.keyCode === 39 ||
          event.keyCode === 40
        )
          return true;
        if (
          event.target.innerText.trim().length >= maxChar ||
          event.keyCode === 13
        ) {
          event.preventDefault();
          return false;
        }
        markCompletedActivity(currentTab, currentSubTab);
      })
      .on("paste", function (e) {
        e.preventDefault();
        return;
      })
      .focus(function (event) {
        var input = jQuery(this);
        if (input.text() === "") {
          input.empty();
        }
        if (input.text() === input.attr("placeholder")) {
          input.text("");
          input.removeClass("placeholder");
        }
      })
      .blur(function () {
        var input = jQuery(this);
        clicks = 0;
        if (input.text() === "") {
          input.empty();
        }
        if (input.text() === "" || input.text() === input.attr("placeholder")) {
          // input.addClass("placeholder");
          // input.val(input.attr("placeholder")).text(input.attr("placeholder"));
        }
      });
    // .blur();

    stickyNote.focus();
  }

  componentWillUnmount() {
    jQuery(this._stickyNoteWrapper).draggable("destroy");
  }

  render() {
    const { wrapperStyle, currentLangData, index } = this.props;
    return (
      <div
        className="vl-sticky-wrapper"
        ref={(el) => (this._stickyNoteWrapper = el)}
        style={wrapperStyle}
      >
        <div
          ref={(el) => (this._stickyNote = el)}
          className="vl-stick-notes"
          placeholder={currentLangData.conclude.bottomPanel.placeHolderData}
          role="textbox"
          aria-label={currentLangData.conclude.bottomPanel[index + 1]}
          contentEditable
          spellCheck={false}
        />
      </div>
    );
  }
}

StickNote.propTypes = {
  maxChar: PropTypes.number.isRequired,
  droppableConatiner: PropTypes.func,
  wrapperStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

StickNote.defaultProps = {
  maxChar: 45,
  wrapperStyle: {},
  currentTab: 0,
  responsive: false,
};

export default StickNote;
