import React from "react";
import { isTablet } from "react-device-detect";
import Tooltip from "../Tooltip";
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePreviosButton: false,
      hideNextButton: false,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { currentTab } = newProps;
    if (
      this.props.markedActivities !== newProps.markedActivities &&
      newProps.currentTab != 0 &&
      newProps.currentTab != 4
    ) {
      if (newProps.markedActivities?.[currentTab]) {
        this.props.updateAriaLiveText(
          `${this.props.currentLangData.labGloabalData.completed}`
        );
      }
    }
  }
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

  selectSlide = (slideIndex) => {
    const { onChangeSlide, currentSlide } = this.props;

    if (currentSlide !== slideIndex) {
      onChangeSlide(slideIndex);
    }
  };

  previosSlide = (event) => {
    event.preventDefault();
    this.toolTipHide(event);
    const { currentSlide, updateAriaLiveText, currentLangData } = this.props;
    this.selectSlide(currentSlide - 1);
    updateAriaLiveText(
      `${currentLangData.noteBook.carousel.page} ${currentSlide + 1} ${
        currentLangData.noteBook.carousel.selected
      }`
    );
  };

  nextSlide = (event) => {
    event.preventDefault();
    this.toolTipHide(event);
    let { currentSlide, updateAriaLiveText, currentLangData } = this.props;
    this.selectSlide(currentSlide + 1);
    updateAriaLiveText(
      `${currentLangData.noteBook.carousel.page} ${currentSlide + 1} ${
        currentLangData.noteBook.carousel.selected
      }`
    );
  };

  selectSlideIndiactor = (event, index) => {
    event.preventDefault();
    this.toolTipHide(event);
    this.selectSlide(index);
  };

  render() {
    const {
      children,
      data = {},
      currentTab,
      ariaHidden,
      currentSlide,
      isPopupActive,
      visitedSubtabs,
      tabsWithDisabledSubtabs,
      currentLangData: { carousel },
      updateAriaLiveText,
      currentLangData,
    } = this.props;

    const shouldSubtabsDisabled =
      Array.isArray(tabsWithDisabledSubtabs) &&
      tabsWithDisabledSubtabs.indexOf(currentTab) >= 0;

    const nextDisabled =
      currentSlide === children.length - 1 ||
      (shouldSubtabsDisabled &&
        Array.isArray(visitedSubtabs) &&
        visitedSubtabs.length <= currentSlide);

    const _isPopupActive = isPopupActive ? "-1" : null;

    return (
      <div className="vl-carousel-container" aria-hidden={ariaHidden}>
        <div className="vl-carousel-inner-container">
          {children.map((slide, i) => {
            return React.cloneElement(slide, {
              key: i,
              index: i,
              slide: currentSlide,
            });
          })}
        </div>
        <div className="vl-carousel-controls-container">
          <div className="vl-carousel-controls">
            <div>
              <button
                // title={carousel.previousPage}
                tabIndex={_isPopupActive || (this.props.tabIndex ? "-1" : null)}
                aria-hidden={this.props.ariaHidden ? true : null}
                aria-label={carousel.previousPage}
                className={`con-left ${currentSlide === 0 ? "hide" : null}`}
                onClick={(event) => {
                  currentSlide === 0 ? () => false : this.previosSlide(event);
                }}
                onMouseOver={(e) => {
                  isTablet ? null : this.toolTipShow(e);
                }}
                onMouseLeave={(e) => this.toolTipHide(e)}
                onFocus={(e) => {
                  document.body.className == "no-outline"
                    ? null
                    : this.toolTipShow(e);
                }}
                onBlur={(e) => this.toolTipHide(e)}
              >
                <span className="fa fa-angle-left" aria-hidden></span>
                <span className="sr-only" aria-hidden>
                  {carousel.previousPage}
                </span>
              </button>
              <Tooltip
                title={carousel.previousPage}
                classes={carousel.previousPage}
                // position={"bottom"}
                id={carousel.previousPage}
              />
            </div>
            <div className="vl-carousel-indicators">
              {children.map((slide, i) => {
                const active = currentSlide === i ? "active" : "";
                const completed = slide.props.completed ? "completed" : "";
                const classes = `${active} ${completed}`.trim();
                return (
                  <div key={`carousel-indicator${i}`}>
                    <button
                      data-slide-to={i}
                      className={classes}
                      tabIndex={
                        _isPopupActive || (this.props.tabIndex ? "-1" : null)
                      }
                      aria-hidden={this.props.ariaHidden ? true : null}
                      // title={`${carousel.page} ${i + 1}`}
                      onClick={(event) => {
                        this.selectSlideIndiactor(event, i);
                      }}
                      aria-label={`${carousel.page} ${i + 1} ${
                        completed
                          ? currentLangData.labGloabalData.completed
                          : ""
                      } ${currentSlide === i ? carousel.selected : ""}`}
                      disabled={
                        shouldSubtabsDisabled && i > visitedSubtabs.length
                      }
                      onMouseOver={
                        (shouldSubtabsDisabled && i > visitedSubtabs.length) ||
                        isTablet
                          ? null
                          : (e) => this.toolTipShow(e)
                      }
                      onMouseLeave={
                        shouldSubtabsDisabled && i > visitedSubtabs.length
                          ? null
                          : (e) => this.toolTipHide(e)
                      }
                      onFocus={(e) => {
                        document.body.className == "no-outline"
                          ? null
                          : this.toolTipShow(e);
                      }}
                      onBlur={(e) => this.toolTipHide(e)}
                    >
                      <span></span>
                    </button>
                    <Tooltip
                      title={`${carousel.page} ${i + 1}`}
                      classes={`${carousel.page} ${i + 1}`}
                      // position={"top"}
                      id={`${carousel.page} ${i + 1}`}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <button
                // title={carousel.nextPage}
                aria-label={carousel.nextPage}
                className={`con-right ${nextDisabled ? "hide" : ""}`.trim()}
                onClick={(event) => {
                  nextDisabled ? () => false : this.nextSlide(event);
                }}
                tabIndex={_isPopupActive || (this.props.tabIndex ? "-1" : null)}
                aria-hidden={this.props.ariaHidden ? true : null}
                onMouseOver={(e) => {
                  isTablet ? null : this.toolTipShow(e);
                }}
                onMouseLeave={(e) => this.toolTipHide(e)}
                onFocus={(e) => {
                  document.body.className == "no-outline"
                    ? null
                    : this.toolTipShow(e);
                }}
                onBlur={(e) => this.toolTipHide(e)}
              >
                <span className="fa fa-angle-right" aria-hidden></span>
                <span className="sr-only" aria-hidden>
                  {carousel.nextPage}
                </span>
              </button>
              <Tooltip
                title={carousel.nextPage}
                classes={carousel.nextPage}
                // position={"bottom"}
                id={carousel.nextPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;

Carousel.defaultProps = {
  t: () => {},
};
