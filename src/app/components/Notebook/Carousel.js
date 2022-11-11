import React from "react";
import CarouselSlide from "./CarouselSlide";
import Tooltip from "../Tooltip";
import { isTablet } from "react-device-detect";

const toolTipShow = (e) => {
  const div = e.currentTarget.nextSibling;
  if (div && div.classList != undefined) {
    div.classList.add("show");
    div.setAttribute("aria-hidden", false);
  }
};

const toolTipHide = (e) => {
  const div = e.currentTarget.nextSibling;
  if (div && div.classList != undefined) {
    div.classList.remove("show");
    div.setAttribute("aria-hidden", true);
  }
};
function CarouselLeftArrow(props) {
  const { t } = props;

  return (
    <>
      <button
        className="vl-notebook-carousel-arrow vl-notebook-carousel-arrow-left"
        onClick={props.active ? props.onClick : () => false}
        style={!props.active ? { visibility: "hidden" } : {}}
        aria-label={t("noteBook.carousel.previous")}
        // title={t("noteBook.carousel.previous")}
        aria-hidden={!props.active}
        disabled={!props.active}
        id="left-arrow-button"
        onMouseOver={(e) => {
          isTablet ? null : toolTipShow(e);
        }}
        onMouseLeave={(e) => toolTipHide(e)}
        onFocus={(e) => {
          document.body.className == "no-outline" ? null : toolTipShow(e);
        }}
        onBlur={(e) => toolTipHide(e)}
      >
        <span className="icon-back" />
      </button>
      {props.active && (
        <Tooltip
          title={t("noteBook.carousel.previous")}
          classes={`labNotebookButton`}
          id={t("noteBook.carousel.previous")}
        />
      )}
    </>
  );
}

function CarouselRightArrow(props) {
  const { t } = props;
  return (
    <>
      <button
        className="vl-notebook-carousel-arrow vl-notebook-carousel-arrow-right"
        onClick={props.active ? props.onClick : () => false}
        style={!props.active ? { visibility: "hidden" } : {}}
        aria-label={t("noteBook.carousel.next")}
        // title={t("noteBook.carousel.next")}
        aria-hidden={!props.active}
        disabled={!props.active}
        id="right-arrow-button"
        onMouseOver={(e) => {
          isTablet ? null : toolTipShow(e);
        }}
        onMouseLeave={(e) => toolTipHide(e)}
        onFocus={(e) => {
          document.body.className == "no-outline" ? null : toolTipShow(e);
        }}
        onBlur={(e) => toolTipHide(e)}
      >
        <span className="icon-next" />
      </button>
      {props.active && (
        <Tooltip
          position="right"
          title={t("noteBook.carousel.next")}
          classes={`labNotebookButton`}
          id={t("noteBook.carousel.next")}
        />
      )}
    </>
  );
}

// Notebook Carousel wrapper component
class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  goToPrevSlide = (e) => {
    e.preventDefault();
    const { activeSlideIndex, gotoSlide, updateAriaLiveText, notebookData } =
      this.props;
    gotoSlide(activeSlideIndex - 1);
    const currentSlide = activeSlideIndex - 1;
    setTimeout(() => {
      updateAriaLiveText(
        `${this.props.t("noteBook.carousel.page")} ${currentSlide + 1}/${
          notebookData.pages.length
        }`
      );
    }, 600);
    setTimeout(() => {
      updateAriaLiveText(" ");
    }, 1500);
    if (currentSlide === 0) {
      setTimeout(() => {
        document.getElementById("right-arrow-button").focus();
      }, 200);
    }
  };

  goToNextSlide = (e) => {
    e.preventDefault();
    const { activeSlideIndex, gotoSlide, notebookData, updateAriaLiveText } =
      this.props;
    gotoSlide(activeSlideIndex + 1);
    // `Page ${activeSlideIndex + 1}/${notebookData.pages.length}`
    const currentSlide = activeSlideIndex + 1;
    updateAriaLiveText(
      `${this.props.t("noteBook.carousel.page")} ${currentSlide + 1}/${
        notebookData.pages.length
      }`
    );
    setTimeout(() => {
      updateAriaLiveText(" ");
    }, 1000);
    if (currentSlide === notebookData.pages.length - 1) {
      setTimeout(() => {
        document.getElementById("left-arrow-button").focus();
      }, 200);
    }
  };

  render() {
    const {
      notebookData,
      activeSlideIndex,
      templates,
      updateNotebookModelsData,
      updateNotebookData,
      updateAriaLiveText,
      t,
      markedNotebooks,
      markCompletedNoteBook,
      markedNotebooksValidation,
      currentLangData,
      completedActivity,
      currentTab,
      widthChange,
    } = this.props;
    setTimeout(() => {
      notebookData.pages.map((slide, i) => {
        const isCompleted = markedNotebooksValidation.includes(
          slide.pageDetails
        );
        if (i === activeSlideIndex && isCompleted) {
          updateAriaLiveText(`${currentLangData.labGloabalData.completed}`);
        }
      });
    });
    return (
      <React.Fragment>
        <div className="vl-notebook-carousel-control">
          <CarouselLeftArrow
            onClick={(e) => this.goToPrevSlide(e)}
            active={activeSlideIndex > 0}
            t={t}
          />
          <div>
            {`${t("noteBook.carousel.page")} ${activeSlideIndex + 1}/${
              notebookData.pages.length
            }`}
          </div>
          <CarouselRightArrow
            onClick={(e) => this.goToNextSlide(e)}
            active={activeSlideIndex < notebookData.pages.length - 1}
            t={t}
          />
        </div>
        <div className="vl-notebook-carousel-slides">
          {notebookData.pages.map((slide, index) => (
            <CarouselSlide
              key={index}
              index={index}
              activeSlideIndex={activeSlideIndex}
              slideData={slide}
              component={templates[slide.component]}
              model={notebookData.model}
              updateNotebookModelsData={updateNotebookModelsData}
              updateNotebookData={updateNotebookData}
              updateAriaLiveText={updateAriaLiveText}
              t={t}
              currentLangData={currentLangData}
              notebookData={notebookData}
              markedNotebooks={markedNotebooks}
              markCompletedNoteBook={markCompletedNoteBook}
              markedNotebooksValidation={markedNotebooksValidation}
              completedActivity={completedActivity}
              widthChange={widthChange}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Carousel;
