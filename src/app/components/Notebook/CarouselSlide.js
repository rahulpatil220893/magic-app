import React, { useEffect } from "react";
import PropTypes from "prop-types";

function CarouselSlide(props) {
  const {
    index,
    activeSlideIndex,
    component: Component,
    slideData: {
      pageSubtitle,
      parent,
      pageTitleCounterText,
      pageDetails,
      pageType,
      activeSubTab,
      subIndex,
      component,
    },
    model,
    updateNotebookModelsData,
    updateNotebookData,
    updateAriaLiveText,
    t,
    markedNotebooks,
    markCompletedNoteBook,
    markedNotebooksValidation,
    currentLangData,
    completedActivity,
    widthChange,
  } = props;

  const noteBook = props.notebookData.pages.filter(
    (e) => e.index == props.slideData.index
  );
  const isCompleted = markedNotebooksValidation.includes(pageDetails);

  const heading =
    parent === ""
      ? `${currentLangData.notebookData[props.slideData.index].title} ${
          pageSubtitle
            ? currentLangData.notebookData[props.slideData.index][pageSubtitle]
            : ""
        }`
      : `${
          props.slideData.pageType == "text"
            ? currentLangData.notebookData[props.slideData.index].title
            : currentLangData.notebookData[props.slideData.index].screenshote
        } - ${pageTitleCounterText} ${
          pageSubtitle
            ? currentLangData.notebookData[props.slideData.index][pageSubtitle]
            : ""
        }`;

  const tab = `${currentLangData.notebookData[props.slideData.index].title}${
    pageSubtitle ? "_sub" : ""
  }`;

  const tab1 = `${currentLangData.notebookData[props.slideData.index].title}${
    pageSubtitle ? "_sub" : pageTitleCounterText ? "_sub" : ""
  }`;

  const tab2 = `${currentLangData.notebookData[props.slideData.index].title}${
    component == "TextView" ? "_subText" : ""
  }`;

  const screenshotAtext =
    pageType == "image"
      ? `${currentLangData.notebookData[props.slideData.index].screenshote} ${
          currentLangData.numbers[pageTitleCounterText]
        }, ${currentLangData.carousel.page} ${
          currentLangData.numbers[activeSubTab + 1]
        }`
      : ``;

  useEffect(() => {
    if (isCompleted) {
      completedActivity(
        currentLangData.completedActivity.replace("-1-", heading)
      );
    }
  }, [isCompleted]);

  useEffect(() => {
    getTabIndex();
  });

  const getTabIndex = () => {
    setTimeout(() => {
      const divs = document.querySelectorAll(".vl-notebook-slide-content");
      divs.forEach((div) => {
        if (div) {
          div.setAttribute(
            "tabIndex",
            div.scrollHeight > div.clientHeight ? "0" : null
          );
        }
      });
    });
  };

  return (
    <div
      className={`vl-notebook-carousel-slide ${
        index === activeSlideIndex ? "active" : ""
      }`}
    >
      <div className="vl-notebook-slide-header">
        <div className="header-inner">
          <span>
            <h2 className="vl-notebook-heading">
              {parent === ""
                ? currentLangData.notebookData[props.slideData.index].title
                : `${
                    props.slideData.pageType == "text"
                      ? currentLangData.notebookData[props.slideData.index]
                          .title
                      : currentLangData.notebookData[props.slideData.index]
                          .screenshote
                  } - ${pageTitleCounterText}`}
            </h2>
            {isCompleted ? <i className="fa fa-check"></i> : ""}
          </span>
          {pageSubtitle && (
            <h3 className="vl-notebook-subheading">
              {
                currentLangData.notebookData[props.slideData.index][
                  pageSubtitle
                ]
              }
            </h3>
          )}
        </div>
      </div>
      <hr aria-hidden="true" className="line-divider" />
      <div
        className={`vl-notebook-carousel-slide-container 
      ${currentLangData.notebookData[props.slideData.index].title} 
      ${subIndex ? `page${subIndex}` : ""} ${
          props.slideData.pageType == "image" ? `screenshot` : ""
        } tab${tab1} ${tab2}`}
      >
        <div className="vl-notebook-slide-content">
          <div className="vl-notebook-slide-content-page">
            <Component
              data={props.slideData}
              currentLangData={currentLangData}
              model={model}
              updateNotebookModelsData={updateNotebookModelsData}
              updateNotebookData={updateNotebookData}
              index={index}
              updateAriaLiveText={updateAriaLiveText}
              t={t}
              markCompletedNoteBook={markCompletedNoteBook}
              activeSlideIndex={activeSlideIndex}
              heading={heading}
              screenshotAtext={screenshotAtext}
              tab={tab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
CarouselSlide.propTypes = {
  index: PropTypes.number,
  activeSlideIndex: PropTypes.number,
  component: PropTypes.any,
  slideData: PropTypes.object,
  model: PropTypes.any,
  updateNotebookModelsData: PropTypes.func,
  updateNotebookData: PropTypes.func,
  updateAriaLiveText: PropTypes.func,
};
export default CarouselSlide;
