import React from "react";
import Button from "../Button";
import { EditorToolbar } from "../TextEditor";
import Tooltip from "../Tooltip";
import { isTablet } from "react-device-detect";

class NotebookToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bold: false,
      italic: false,
      underline: false,
      unOrderedList: false,
    };
  }

  componentDidMount() {
    this.props.setNotebookLastElement(this.addPageButtonRef);
  }

  boldHandler = () => {
    this.props.boldClickHandler();
  };

  italicHandler = () => {
    this.props.italicClickHandler();
  };

  underlineHandler = () => {
    this.props.underlineClickHandler();
  };

  unOrderedListHandler = () => {
    this.props.unorderListClickHandler();
  };

  fontHandler = (params) => {
    const { updateAriaLiveText } = this.props;
    this.props.fontSizeClickHandler(params);
    // if (updateAriaLiveText) {
    //   updateAriaLiveText(params.item.text + " selected");
    //   setTimeout(() => {
    //     updateAriaLiveText(" ");
    //   }, 1000)
    // }
  };
  addPagedata = (data) => {
    this.props.addPage();
  };
  symbolHandler = (data) => {
    this.props.symbolHandler(data);
  };

  deletePage = () => {
    this.props.deletePage();
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

  render() {
    const {
      addPage,
      deletePage,
      printPage,
      activeSlideIndex,
      notebookData,
      notebookEmphasisState,
      notebookOpend,
      t,
    } = this.props;
    const activeSlideObject = notebookData.pages[activeSlideIndex];
    const disableToolBar = activeSlideObject && activeSlideObject.tableContent;
    const isParentPageActive =
      !!activeSlideObject && activeSlideObject.parent === "";
    const disableAddPage =
      !!activeSlideObject && activeSlideObject.pageType === "image";

    return (
      <div className="vl-notebook-toolbar">
        <EditorToolbar
          fontHandler={this.fontHandler}
          boldHandler={this.boldHandler}
          italicHandler={this.italicHandler}
          underlineHandler={this.underlineHandler}
          unOrderedListHandler={this.unOrderedListHandler}
          isBold={notebookEmphasisState.bold}
          isItalic={notebookEmphasisState.italic}
          isUnderline={notebookEmphasisState.underline}
          isUnOrderedList={notebookEmphasisState.unOrderedList}
          t={t}
          symbolHandler={this.symbolHandler}
          notebookOpend={notebookOpend}
          disableToolBar={disableToolBar}
        />
        <div className="vl-notebook-toolbar-action">
          <div className="vl-notebook-toolbar-control">
            <Button
              className="icon-discard icon-fonts"
              onClick={(e) => this.deletePage(e)}
              disabled={isParentPageActive}
              aria-label={t("editor.delete")}
              //title={t('editor.delete')}
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
            />
            <Tooltip
              title={t("editor.delete")}
              classes={t("editor.delete")}
              position={"top"}
              id={t("editor.delete") + "-tooltip"}
            />
          </div>
          <div className="vl-notebook-toolbar-control">
            <Button
              className="icon-print icon-fonts"
              onClick={printPage}
              aria-label={t("editor.print")}
              //title={t('editor.print')}
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
            />
            <Tooltip
              title={t("editor.print")}
              classes={t("editor.print")}
              position={"top"}
              id={t("editor.print") + "-tooltip"}
            />
          </div>
          <div className="vl-notebook-toolbar-control">
            <Button
              className="icon-add icon-fonts"
              onClick={() => this.addPagedata()}
              aria-label={t("editor.addPage")}
              //title={t(`editor.addPage`)}
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
              disabled={disableAddPage}
              ref={(div) => {
                this.addPageButtonRef = div;
              }}
            />
            <Tooltip
              title={t(`editor.addPage`)}
              classes={t(`editor.addPage`)}
              position={"top"}
              id={t(`editor.addPage`) + "-tooltip"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NotebookToolbar;
