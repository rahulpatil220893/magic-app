import React from "react";
import Carousel from "./Carousel";
import NotebookToolbar from "./NotebookToolbar";
import html2canvas from "html2canvas";
import cameraClickSound from "../../assets/audios/camera_shutter_click.mp3";
import {
  getCurrentPageIndexParentData,
  getCurrentActiveTabIndexData,
  print,
} from "../../helpers";
import EventManager from "../../events/manager";

import { saveTincanData } from "../../tincan";
import { responsiveDrag, responsiveDrop } from "../../helpers/jquery";
class Notebook extends React.Component {
  constructor(props) {
    super(props);
    const pages =
      props.notebookData.pages.filter((p) => p.pageType == "image") || [];
    this.totalSnapshots = pages.length;
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.notebookOpened !== this.props.notebookOpened ||
      newProps.notebookTextDeletePopupOpened !=
        this.props.notebookTextDeletePopupOpened ||
      this.props.notebookImageDeletePopupOpened !=
        newProps.notebookImageDeletePopupOpened
    ) {
      if (newProps.notebookOpened) {
        responsiveDrag(1);
        responsiveDrop(1);
        if (
          (this.props.notebookTextDeletePopupOpened == true &&
            newProps.notebookTextDeletePopupOpened == false) ||
          (this.props.notebookImageDeletePopupOpened == true &&
            newProps.notebookImageDeletePopupOpened == false)
        ) {
          const deleteIcon = document.querySelectorAll(
            ".vl-popup-container .icon-discard"
          )[0];
          if (deleteIcon) {
            setTimeout(() => {
              deleteIcon.focus();
            }, 100);
          }
        }
      } else {
        TincanManager.updateNoteBookTincanData(newProps.notebookData);
        saveTincanData();
        responsiveDrag(newProps.scale);
        responsiveDrop(newProps.scale);
        //console.log(`SCALE AS ${newProps.scale}`);
      }
    }

    if (newProps.notebookOpened) {
      if (
        this.props.notebookTextDeletePopupOpened === true &&
        newProps.notebookTextDeletePopupOpened === false &&
        this.props.notebookConfirmClick !== newProps.notebookConfirmClick
      ) {
        this.deletePageHandler();
      }

      if (
        this.props.notebookImageDeletePopupOpened === true &&
        newProps.notebookImageDeletePopupOpened === false &&
        this.props.notebookConfirmClick !== newProps.notebookConfirmClick
      ) {
        this.deletePageHandler();
      }
    }

    if (this.props.screenShotClick !== newProps.screenShotClick) {
      this.screenShotClickHandler();
    }
  }

  addPage = () => {
    const {
      notebookData,
      updateNotebookData,
      gotoSlide,
      togglePopup,
      activeSlideIndex,
      updateAriaLiveText,
      currentLangData,
    } = this.props;
    let noteObject = getCurrentPageIndexParentData(
      notebookData.pages,
      activeSlideIndex
    );

    let pageDetails = 0;
    notebookData.pages.map((e) => {
      if (e.pageDetails > pageDetails) {
        pageDetails = e.pageDetails;
      }
    });

    if (noteObject.data.pageCounter < 3) {
      const newPageJson = {
        pageTitle: noteObject.data.pageTitle,
        pageSubtitle: noteObject.data.pageSubtitle,
        parent: noteObject.data.index,
        index: noteObject.data.index,
        subIndex: noteObject.data.subIndex,
        component: "TextView",
        pageType: "text",
        active: false,
        model: "",
        pageTitleCounterText: noteObject.data.pageCounter + 2,
        pageDetails: pageDetails + 1,
      };
      noteObject.data.pageCounter = noteObject.data.pageCounter + 1;

      const pushIndex = noteObject.index + noteObject.data.pageCounter;
      notebookData.pages.splice(pushIndex, 0, newPageJson);
      updateNotebookData(notebookData);
      gotoSlide(pushIndex);
      //
      setTimeout(() => {
        if (
          document.querySelector(
            ".vl-notebook-carousel-slide.active .vl-content-editable"
          )
        ) {
          document
            .querySelector(
              ".vl-notebook-carousel-slide.active .vl-content-editable"
            )
            .focus();
        }
      }, 200);
      setTimeout(() => {
        updateAriaLiveText(currentLangData.notebook.addPageTitle);
        setTimeout(() => {
          updateAriaLiveText(" ");
        }, 1500);
      }, 1000);
    } else {
      togglePopup("1");
      updateAriaLiveText(this.props.currentLangData.noteBook.maxPages);

      setTimeout(() => {
        togglePopup("1");
      }, 3000);
    }
  };

  deletePage = () => {
    const {
      togglePopup,
      pageDeletePopupId,
      imageDeletePopupId,
      notebookData,
      activeSlideIndex,
    } = this.props;

    if (notebookData.pages[activeSlideIndex].pageType === "text") {
      togglePopup(pageDeletePopupId);
    } else {
      togglePopup(imageDeletePopupId);
    }
  };

  deletePageHandler = () => {
    const {
      notebookData,
      activeSlideIndex,
      updateNotebookData,
      gotoSlide,
      updateAriaLiveText,
      markCompletedNoteBook,
    } = this.props;
    const activeNote = {
      data: notebookData.pages[activeSlideIndex],
      index: activeSlideIndex,
    };
    markCompletedNoteBook(activeNote, "delete");
    if (activeNote.data.pageType === "text") {
      if (
        notebookData.pages[activeNote.index + 1] &&
        notebookData.pages[activeNote.index + 1].parent !== ""
      ) {
        for (let i = activeNote.index + 1; i < notebookData.pages.length; i++) {
          if (notebookData.pages[i].pageType === "text") {
            notebookData.pages[i].pageTitleCounterText =
              notebookData.pages[i].pageTitleCounterText - 1;
          } else {
            break;
          }
        }
      }

      let activeNoteParent = getCurrentPageIndexParentData(
        notebookData.pages,
        activeSlideIndex
      );
      activeNoteParent.data.pageCounter = activeNoteParent.data.pageCounter - 1;
      notebookData.pages.splice(activeNote.index, 1);
      updateNotebookData(notebookData);
      gotoSlide(activeNote.index - 1);
    } else if (activeNote.data.pageType === "image") {
      markCompletedNoteBook(activeNote, "delete");
      if (notebookData.pages[activeNote.index].parent !== "") {
        for (var i = activeNote.index + 1; i < notebookData.pages.length; i++) {
          if (notebookData.pages[i].pageType === "image") {
            notebookData.pages[i].pageTitleCounterText =
              notebookData.pages[i].pageTitleCounterText - 1;
          } else {
            break;
          }
        }
      }

      var activeNoteParent = getCurrentPageIndexParentData(
        notebookData.pages,
        activeSlideIndex
      );
      activeNoteParent.data.imageCounter =
        activeNoteParent.data.imageCounter - 1;
      this.totalSnapshots = this.totalSnapshots - 1;
      notebookData.pages.splice(activeNote.index, 1);
      updateNotebookData(notebookData);
      gotoSlide(activeNote.index - 1);
    }
    setTimeout(() => {
      if (document.querySelector(".vl-popup-container .vl-popup-close")) {
        document.querySelector(".vl-popup-container .vl-popup-close").focus();
      }
    });
    const { currentLangData } = this.props;
    setTimeout(() => {
      updateAriaLiveText(currentLangData.notebook.deletePageTitle);
      setTimeout(() => {
        updateAriaLiveText(" ");
      }, 1500);
    }, 500);
  };

  printPageHandler = () => {
    const { currentLangData } = this.props;
    let container = document.querySelectorAll(
      ".vl-notebook-carousel-slide.active"
    )[0];
    const el = container.querySelector(".vl-notebook-slide-content-page");

    setTimeout(function () {
      el.scrollTop = 0;
    });

    let section = container.querySelector("h3")
      ? container.querySelector("h2").innerHTML +
        " " +
        container.querySelector("h3").innerHTML
      : container.querySelector("h2").innerHTML;
    section = section.replace(/([a-z])([A-Z])/g, "$1 $2");
    const printData = {};
    printData.title = currentLangData.labTitle;
    printData.section = currentLangData.sectionHead + " " + section;
    printData.footer = currentLangData.footer;

    print(el, printData);

    // html2canvas(container.querySelector(".vl-notebook-slide-content")).then((canvas) => {
    //   const screenShot = canvas.toDataURL("image/png");
    //   const htmlcontents = printDefaultView(screenShot, printData);
    //   printContainer(htmlcontents, printWindow, printData)
    // });
  };

  screenShotClickHandler = () => {
    const {
      notebookData,
      updateNotebookData,
      gotoSlide,
      notebookPopupId,
      activeSubTabIndex,
      togglePopup,
      activeTabIndex,
      imageAlertPopupId,
      markCompletedActivity,
    } = this.props;

    let noteObject = getCurrentActiveTabIndexData(
      notebookData.pages,
      activeTabIndex,
      activeSubTabIndex
    );

    let pageDetails = 0;
    notebookData.pages.map((e) => {
      if (e.pageDetails > pageDetails) {
        pageDetails = e.pageDetails;
      }
    });

    if (this.totalSnapshots < 10) {
      this.totalSnapshots++;
      let shutterClickAudio = new Audio(cameraClickSound);
      setTimeout(() => {
        shutterClickAudio.play();
      });
      const element = document.querySelectorAll(
        ".tab-panels>div:not(.hide-tab-panel)"
      )[0];
      EventManager.broadcast("TAKE_SNAPSHOT_BEFORE");
      setTimeout(() => {
        html2canvas(element).then((canvas) => {
          const screenShot = canvas.toDataURL();
          const newImageJson = {
            pageTitle: noteObject.data.pageTitle + " Screenshot",
            pageSubtitle: "",
            parent: noteObject.data.index,
            index: noteObject.data.index,
            subIndex: noteObject.data.subIndex,
            component: "ImageView",
            pageType: "image",
            active: false,
            model: "",
            image: screenShot,
            pageTitleCounterText: noteObject.data.imageCounter + 1,
            pageDetails: pageDetails + 1,
            activeSubTab: activeSubTabIndex,
          };

          noteObject.data.imageCounter = noteObject.data.imageCounter + 1;
          const pushIndex =
            noteObject.index +
            noteObject.data.pageCounter +
            noteObject.data.imageCounter;
          notebookData.pages.splice(pushIndex, 0, newImageJson);
          // this.totalSnapshots++;
          updateNotebookData(notebookData);
          gotoSlide(pushIndex);
          togglePopup(notebookPopupId);

          EventManager.broadcast("TAKE_SNAPSHOT_AFTER");
        });
      });
      if (activeTabIndex === 4) {
        markCompletedActivity(4, activeSubTabIndex);
      }
      if (
        activeTabIndex === this.props.NumberOfTabs - 1 &&
        activeSubTabIndex === this.props.NumberOfSubTabs - 1
      ) {
        markCompletedActivity(activeTabIndex, activeSubTabIndex);
      }
    } else {
      togglePopup(imageAlertPopupId);
    }
  };

  render() {
    const {
      activeSlideIndex,
      notebookData,
      activeEditor,
      focusedEditor,
      setActiveEditor,
      setFocusedEditor,
      notebookBoldClickHandler,
      notebookItalicClickHandler,
      notebookUnderlineClickHandler,
      notebookUnorderListClickHandler,
      notebookFontSizeClickHandler,
      notebookEmphasisState,
      setPopupLastElement,
      updateAriaLiveText,
      t,
      notebookSymbolClickHandler,
      notebookOpend,
    } = this.props;
    return (
      <div className="vl-notebook-container">
        <div className="vl-notebook-drag-handle" />
        <div className="vl-notebook-carousel-container">
          <h1 className="vl-notebook-tittle">{t("noteBook.tittle")}</h1>
          <Carousel {...this.props} />
          <NotebookToolbar
            addPage={this.addPage}
            deletePage={this.deletePage}
            printPage={this.printPageHandler}
            activeSlideIndex={activeSlideIndex}
            notebookData={notebookData}
            activeEditor={activeEditor}
            focusedEditor={focusedEditor}
            setActiveEditor={setActiveEditor}
            setFocusedEditor={setFocusedEditor}
            boldClickHandler={notebookBoldClickHandler}
            italicClickHandler={notebookItalicClickHandler}
            underlineClickHandler={notebookUnderlineClickHandler}
            unorderListClickHandler={notebookUnorderListClickHandler}
            fontSizeClickHandler={notebookFontSizeClickHandler}
            notebookEmphasisState={notebookEmphasisState}
            setNotebookLastElement={setPopupLastElement}
            updateAriaLiveText={updateAriaLiveText}
            t={t}
            symbolHandler={notebookSymbolClickHandler}
            notebookOpend={notebookOpend}
          />
        </div>
      </div>
    );
  }
}

export default Notebook;
