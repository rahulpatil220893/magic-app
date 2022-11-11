import "../i18next";
import React from "react";
import { isEmpty } from "lodash";
import { withTranslation } from "react-i18next";

import { activityComponents } from "./index";
import { Tab } from "../../app/components/Tabs";
import { Popup } from "../../app/components/Popup";
import { LiveAnnouncer, LiveMessage } from "react-aria-live";
import {
  NotebookAlertPopup,
  NotebookImageAlertPopup,
} from "../../app/components/Notebook";

import HelpContainer from "../containers/HelpContainer";
import TabsContainer from "../containers/TabsContainer";
import PopupContainer from "../containers/PopupContainer";
import HeaderContainer from "../containers/HeaderContainer";
import SavePopup from "../../app/components/Header/SavePopup";
import NotebookContainer from "../containers/NotebookContainer";
import DrawingToolContainer from "../containers/DrawingToolContainer";
import SubmitPopupContainer from "../containers/SubmitPopupContainer";
import SubActivityCompletionPopup from "../containers/SubActivityCompletion";
import NavigationButtonContainer from "../containers/NavigationButtonContainer";
import LabProgressPopupContainer from "../containers/LabProgressPopupContainer";
import NotebookPageConfirmContainer from "../containers/NotebookPageConfirmContainer";
import LanguageSwitchPopupContainer from "../containers/LanguageSwitchPopupContainer";
import NotebookImageConfirmContainer from "../containers/NotebookImageConfirmContainer";

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appLoaded: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener("keydown", () => {
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 9)
        document.body.classList.remove("no-outline");
    });

    document.body.addEventListener("mousedown", (event) => {
      document.body.classList.add("no-outline");
    });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.tincanLoaded !== newProps.tincanLoaded) {
      if (!isEmpty(TincanManager.data.notebook.notebookSavedData)) {
        this.props.updateNotebookData(
          TincanManager.data.notebook.notebookSavedData
        );
      }

      if (TincanManager.reviewMode) {
        this.props.labSubmittedHandler(true);
      }

      this.setState(
        {
          appLoaded: true,
        },
        () => {
          if (TincanManager.data.isFirstTime === true)
            this.props.togglePopup("5");

          TincanManager.recordElapsedTime(
            TincanManager.data,
            "section_0",
            true
          );
          this.props.onChangeTab(TincanManager.data.selectedTabIndex);
          document.getElementsByClassName(
            "loading-container"
          )[0].style.display = "none";
        }
      );
    }
  }

  render() {
    const { isPopupActive = false, ariaLiveText, i18n, t } = this.props;
    const { appLoaded } = this.state;

    const currentLangData =
      this.props.i18n.store.data[this.props.defaultLang].translation;
    return appLoaded ? (
      <React.Fragment>
        <div
          className="vl-container"
          aria-hidden={isPopupActive}
          tabIndex={isPopupActive ? "-1" : null}
        >
          <HeaderContainer
            i18n={i18n}
            className="vl-header"
            headerData={currentLangData}
          />

          <main>
            <DrawingToolContainer
              drawingToolData={currentLangData.drawingTool}
            />
            <div className="vl-main-container">
              <div className="nav-bar-container">
                <div className="vl-tabs-component">
                  <TabsContainer
                    t={t}
                    tabsData={currentLangData.tabs}
                    lang={this.props.defaultLang}
                  >
                    {currentLangData.tabs?.map(
                      ({ title, component, subTabLength, ...props }, i) => (
                        <Tab title={title} key={i} subTabLength={subTabLength}>
                          {React.createElement(activityComponents[component], {
                            key: i,
                            ...props,
                            t,
                            index: i,
                            currentLangData,
                          })}
                        </Tab>
                      )
                    )}
                  </TabsContainer>
                </div>
              </div>
            </div>
          </main>
          <NavigationButtonContainer tabsData={currentLangData.tabs} />
        </div>
        <PopupContainer t={t} popupData={currentLangData.popups}>
          <Popup
            popupid="0"
            drag={true}
            className="vl-popup-notebook"
            dragOptions={{
              cursor: "grabbing",
              handle: ".vl-notebook-drag-handle",
              cancel:
                ".vl-content-editable, .content-editable, .vl-notebook-toolbar",
            }}
          >
            <NotebookContainer currentLangData={currentLangData} />
          </Popup>
          <Popup
            popupid="1"
            className="vl-popup-notebook-alert"
            autoClose
            // role="alertdialog"
            // ariaLabelledBy={currentLangData.noteBook.maxPages}
            // ariaLabel={currentLangData.noteBook.maxPages}
          >
            <NotebookAlertPopup noteBookData={currentLangData.noteBook} />
          </Popup>
          <Popup popupid="2" className="vl-popup-notebook-confirm">
            <NotebookPageConfirmContainer
              noteBookData={currentLangData.noteBook}
              body={currentLangData.noteBook.body}
            />
          </Popup>
          <Popup popupid="3" className="vl-popup-notebook-confirm">
            <NotebookImageConfirmContainer
              noteBookData={currentLangData.noteBook}
              body={currentLangData.noteBook.imgBody}
            />
          </Popup>
          <Popup popupid="4" className="vl-popup-notebook-alert">
            <NotebookImageAlertPopup noteBookData={currentLangData.noteBook} />
          </Popup>
          <Popup popupid="5" className="vl-popup-help">
            <HelpContainer helpData={currentLangData.help} />
          </Popup>
          <Popup popupid="6" className="vl-popup-submit">
            <SubmitPopupContainer
              submitPopupData={currentLangData.submitPopup}
            />
          </Popup>
          <Popup popupid="7" className="vl-popup-save">
            <SavePopup messagesData={currentLangData.messages} />
          </Popup>
          <Popup popupid="8" className="vl-popup-lab-progress">
            <LabProgressPopupContainer
              labProgressData={currentLangData.labProgress}
            />
          </Popup>

          <Popup
            popupid="9"
            className="vl-popup-save"
            autoClose
            // role="alertdialog"
            // ariaDescribedBy={"vl-save-popup-content"}
            // ariaLabel={this.props.popupMessage}
          >
            <SubActivityCompletionPopup />
          </Popup>

          <Popup popupid="10" className="vl-popup toggle-language">
            <LanguageSwitchPopupContainer />
          </Popup>
        </PopupContainer>

        <LiveAnnouncer>
          <LiveMessage message={ariaLiveText} aria-live="polite" />
        </LiveAnnouncer>
      </React.Fragment>
    ) : null;
  }
}

AppComponent.propTypes = {};

AppComponent.defaultProps = {};

export default withTranslation()(AppComponent);
