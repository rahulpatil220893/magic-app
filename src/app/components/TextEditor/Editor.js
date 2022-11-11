import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import EditorToolbar from "./EditorToolbar";
import {
  isTablet,
  isSafari,
  isAndroid,
  isFirefox,
  isMacOs,
} from "react-device-detect";

import Cursor from "./Cursor";

const shortid = require("shortid");
const OPERATORS = {
  "&plus;": "+",
  "&minus;": "−",
  "&times;": "×",
  "&divide;": "÷",
  "&le;": "≤",
  "&ge;": "≥",
  "&radic;": "√",
  "&boxh;": "─",
  "&roarr;": "⇾",
  "&loarr;": "⇽",
  "&rlhar;": "⇌",
  "&deg": "°",
  "&theta;": "θ",
  "&gamma;": "γ",
  "&mu;": "μ",
  "&Delta;": "Δ",
};
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorId = `editor-${shortid.generate()}`;
    this.editorFocused = false;
    this.editor = null;
    this.sanitizeConf = {
      allowedTags: ["b", "i", "em", "strong", "ul", "p", "li", "font"],
      allowedAttributes: {
        font: ["size"],
      },
    };
    this.mathFieldFocusFalse = false;
    this.state = {
      bold: false,
      italic: false,
      underline: false,
      unOrderedList: false,
      html: "",
      cursorPosition: "",
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // if (!newProps.activeEditor) {
    //   this.editor.focus();
    // }
    if (
      this.props.boldClick !== newProps.boldClick &&
      this.editor.id === newProps.activeEditor.id &&
      this.isEditorVisible()
    ) {
      this.boldHandler();
    }

    if (
      this.props.italicClick !== newProps.italicClick &&
      this.editor.id === newProps.activeEditor.id &&
      this.isEditorVisible()
    ) {
      this.italicHandler();
    }

    if (
      this.props.underlineClick !== newProps.underlineClick &&
      this.editor.id === newProps.activeEditor.id &&
      this.isEditorVisible()
    ) {
      this.underlineHandler();
    }

    if (
      this.props.unorderListClick !== newProps.unorderListClick &&
      this.editor.id === newProps.activeEditor.id &&
      this.isEditorVisible()
    ) {
      this.unOrderedListHandler();
    }

    if (
      this.props.fontSizeClick !== newProps.fontSizeClick &&
      this.editor.id === newProps.activeEditor.id &&
      this.isEditorVisible()
    ) {
      this.fontSizeHandler(newProps.fontSizeClick);
    }
    if (
      this.props.symbolClick !== newProps.symbolClick &&
      this.editor.id === newProps.activeEditor.id &&
      this.isEditorVisible()
    ) {
      this.symbolHandler(newProps.symbolClick);
    }
    if (
      this.props.defaultLang !== newProps.defaultLang ||
      this.props.label !== newProps.label ||
      this.props.notebookData.pages.length != newProps.notebookData.pages.length
    ) {
      this.forceUpdate();
    }
    if (
      this.props.notebookTextDeletePopupOpened !==
        newProps.notebookTextDeletePopupOpened ||
      this.props.notebookImageDeletePopupOpened !=
        newProps.notebookImageDeletePopupOpened
    ) {
      this.forceUpdate();
    }
  }

  isEditorVisible = () => {
    return !(this.editor.offsetParent === null);
  };

  handleFocus = (event) => {
    if (event.target.nodeName != "TEXTAREA" || !this.mathFieldFocusFalse) {
      event.persist();
      this.editorFocused = true;
      this.props.setActiveEditor(event.target);
    }
  };

  handleBlur = (event) => {
    if (event.target.nodeName != "TEXTAREA") {
      event.persist();
      this.editorFocused = false;
      const position = Cursor.getCurrentCursorPosition(this.editor);
      this.setState({
        cursorPosition: position,
      });

      var targetDiv = event.target;
      setTimeout(() => {
        if (
          (targetDiv.textContent.length == 0 &&
            $(targetDiv).find("div").length == 0 &&
            //$(targetDiv).find("label").length == 1 &&
            $(targetDiv).find("ul").length == 0 &&
            $(targetDiv).find("b").length == 0 &&
            $(targetDiv).find("i").length == 0 &&
            $(targetDiv).find("u").length == 0 &&
            $(targetDiv).find("span").length == 1 &&
            $(targetDiv).find("li").length == 0) ||
          targetDiv.innerHTML == "&nbsp;" ||
          targetDiv.innerHTML == "<span>&nbsp;</span>" ||
          targetDiv.innerHTML == "<br>"
          // || targetDiv.innerHTML ==
          //   "<label><span><span class='blankSpace'></span></span></label>"
        ) {
          targetDiv.innerHTML = "";
        }
      });
    }
  };

  sanitize = () => {
    this.setState({
      html: sanitizeHtml(this.state.html, this.sanitizeConf),
    });
  };

  handleInput = (event) => {
    event.persist();
    const array = [
      "&nbsp;<br>",
      "&nbsp;&nbsp;",
      "&nbsp;",
      "&nbsp; ",
      "&nbsp;&nbsp;<br>",
    ];
    var targetDiv = event.target;
    if ($(targetDiv).find("ul").length != 0) {
      Array.from(event.target.querySelectorAll("ul > li"))
        .map((el) => {
          if (array.includes(el.innerHTML)) {
            el.innerHTML = "";
          }
        })
        .join(" ");
    }
    const equationList = this.editor.querySelectorAll(".mq-editable-field");
    const labelList = this.editor.getElementsByTagName("label");
    const ulList = this.editor.getElementsByTagName("li");
    if (equationList.length != 0) {
      for (let i = 0; i < equationList.length; i++) {
        let b = equationList[i].getElementsByTagName("b");
        let italics = equationList[i].getElementsByTagName("i");
        let u = equationList[i].getElementsByTagName("u");
        let br = equationList[i].getElementsByTagName("br");
        while (b.length) {
          let parent = b[0].parentNode;
          while (b[0].firstChild) {
            parent.insertBefore(b[0].firstChild, b[0]);
          }
          parent.removeChild(b[0]);
        }
        while (italics.length) {
          let parent1 = italics[0].parentNode;
          while (italics[0].firstChild) {
            parent1.insertBefore(italics[0].firstChild, italics[0]);
          }
          parent1.removeChild(italics[0]);
        }
        while (u.length) {
          let parent2 = u[0].parentNode;
          while (u[0].firstChild) {
            parent2.insertBefore(u[0].firstChild, u[0]);
          }
          parent2.removeChild(u[0]);
        }
      }
    }
    //if (labelList.length != 0) {
    // for (let i = 0; i < labelList.length; i++) {
    //   let br = labelList[i].getElementsByTagName("br");
    //   while (br.length) {
    //     let parent = br[0].parentNode;
    //     while (br[0].firstChild) {
    //       parent.insertBefore(br[0].firstChild, br[0]);
    //     }
    //     parent.removeChild(br[0]);
    //   }
    // }
    //}
    // if (ulList.length != 0) {
    //   for (let i = 0; i < ulList.length; i++) {
    //     let br = ulList[i].getElementsByTagName("br");
    //     while (br.length) {
    //       let parent = br[0].parentNode;
    //       while (br[0].firstChild) {
    //         parent.insertBefore(br[0].firstChild, br[0]);
    //       }
    //       parent.removeChild(br[0]);
    //     }
    //   }
    // }
    // if (this.editor.firstChild && this.editor.firstChild.outerHTML == "<br>") {
    //   this.editor.removeChild(this.editor.firstChild);
    // }
    const selection = window.getSelection();
    const span = selection.focusNode.parentNode;
    span.classList.remove("mq-empty");
    const empty = this.editor.querySelectorAll(".mq-empty");
    if (empty.length) {
      for (let i = 0; i < empty.length; i++) {
        if (empty[i].childNodes.length > 1) {
          empty[i].classList.remove("mq-empty");
        }
      }
    }
    const html = this.editor.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  };

  updateStyle = () => {
    const { emphasisStateChange } = this.props;
    this.setState(
      {
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        unOrderedList: document.queryCommandState("InsertUnorderedList"),
      },
      () => {
        emphasisStateChange &&
          emphasisStateChange({
            bold: this.state.bold,
            italic: this.state.italic,
            underline: this.state.underline,
            unOrderedList: this.state.unOrderedList,
          });
      }
    );
    return false;
  };

  boldHandler = () => {
    const { emphasisStateChange, activeEditor, t } = this.props;
    const selection = window.getSelection();
    const span =
      selection.focusNode != null ? selection.focusNode.parentNode : "";
    if (
      span != "" &&
      (span.classList[0] == "mq-numerator" ||
        span.classList[0] == "mq-fraction" ||
        span.classList[0] == "mq-denominator" ||
        span.classList[1] == "mq-sqrt-stem")
    ) {
    } else {
      if (this.editorFocused || activeEditor) {
        let text = this.toggleUpdateText(t("editor.bold"), this.state.bold);
        this.toggleArialiveText(text);
        setTimeout(() => {
          document.execCommand("bold", false, null);
          this.setState(
            {
              bold: !this.state.bold,
            },
            () => {
              emphasisStateChange &&
                emphasisStateChange({
                  bold: this.state.bold,
                });
            }
          );
        }, 10);
      }
    }
  };

  toggleUpdateText = (button, state) => {
    const { t } = this.props;
    let text = t("editor.buttonToggleOff", { button });
    if (state) {
      text = t("editor.buttonToggleOn", { button });
    }
    return text;
  };

  toggleArialiveText = (text) => {
    const { activeEditor, updateAriaLiveText } = this.props;
    activeEditor && activeEditor.focus();
    if (updateAriaLiveText) {
      setTimeout(() => {
        updateAriaLiveText(text);
        setTimeout(() => {
          updateAriaLiveText(" ");
        }, 500);
      }, 2000);
    }
  };

  italicHandler = () => {
    const { emphasisStateChange, activeEditor, t } = this.props;
    const selection = window.getSelection();
    const span =
      selection.focusNode != null ? selection.focusNode.parentNode : "";
    if (
      span != "" &&
      (span.classList[0] == "mq-numerator" ||
        span.classList[0] == "mq-fraction" ||
        span.classList[0] == "mq-denominator" ||
        span.classList[1] == "mq-sqrt-stem")
    ) {
    } else {
      if (this.editorFocused || activeEditor) {
        let text = this.toggleUpdateText(t("editor.italic"), this.state.italic);
        this.toggleArialiveText(text);
        setTimeout(() => {
          document.execCommand("italic", false, null);
          this.setState(
            {
              italic: !this.state.italic,
            },
            () => {
              emphasisStateChange &&
                emphasisStateChange({
                  italic: this.state.italic,
                });
            }
          );
        }, 10);
      }
    }
  };

  underlineHandler = () => {
    const { emphasisStateChange, activeEditor, t } = this.props;
    const selection = window.getSelection();
    const span =
      selection.focusNode != null ? selection.focusNode.parentNode : "";
    if (
      span != "" &&
      (span.classList[0] == "mq-numerator" ||
        span.classList[0] == "mq-fraction" ||
        span.classList[0] == "mq-denominator" ||
        span.classList[1] == "mq-sqrt-stem")
    ) {
    } else {
      if (this.editorFocused || activeEditor) {
        let text = this.toggleUpdateText(
          t("editor.underline"),
          this.state.underline
        );
        this.toggleArialiveText(text);
        setTimeout(() => {
          document.execCommand("underline", false, null);
          this.setState(
            {
              underline: !this.state.underline,
            },
            () => {
              emphasisStateChange &&
                emphasisStateChange({
                  underline: this.state.underline,
                });
            }
          );
        }, 10);
      }
    }
  };

  unOrderedListHandler = () => {
    const { emphasisStateChange, activeEditor, t } = this.props;
    const position = Cursor.getCurrentCursorPosition(this.editor);
    const selection = window.getSelection();
    const frcationList = this.editor.querySelectorAll(".mq-fraction");
    const span =
      selection.focusNode != null ? selection.focusNode.parentNode : "";
    if (frcationList.length != 0) {
      if (
        span != "" &&
        (span.classList[0] == "mq-numerator" ||
          span.classList[0] == "mq-denominator" ||
          span.classList[0] == "mq-fraction")
      ) {
        const lastPosition = Cursor.getLastPosition(this.editor);
        setTimeout(() => {
          if (lastPosition !== null) {
            Cursor.setCurrentCursorPosition(lastPosition + 1, this.editor);
          }
        }, 10);
      } else {
        setTimeout(() => {
          if (
            selection.focusNode.textContent == "" ||
            selection.type == "Range"
          ) {
            activeEditor && activeEditor.focus();
          } else {
            if (position !== null) {
              this.setState({
                cursorPosition: position,
              });
              Cursor.setCurrentCursorPosition(position, this.editor);
            }
          }
        }, 200);
      }
    } else {
      setTimeout(() => {
        if (
          selection.focusNode.textContent == "" ||
          selection.type == "Range"
        ) {
          activeEditor && activeEditor.focus();
        } else {
          if (position !== null) {
            this.setState({
              cursorPosition: position,
            });
            Cursor.setCurrentCursorPosition(position, this.editor);
          }
        }
      }, 100);
    }
    setTimeout(() => {
      if (frcationList.length != 0) {
        for (let i = 0; i < frcationList.length; i++) {
          frcationList[i].setAttribute("contenteditable", false);
        }
        setTimeout(() => {
          const html = this.editor.innerHTML;
          if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange(html);
          }
          this.lastHtml = html;
        }, 20);
        let beforeInnerHtml, afterInnerHtml;
        setTimeout(() => {
          for (let i = 0; i < frcationList.length; i++) {
            beforeInnerHtml = frcationList[i].parentNode.innerHTML;
            frcationList[i].removeAttribute("contenteditable");
            afterInnerHtml = frcationList[i].parentNode.innerHTML;
            let html = this.editor.innerHTML;
            html = html.replace(`${beforeInnerHtml}`, `${afterInnerHtml}`);
            if (this.props.onChange && html !== this.lastHtml) {
              this.props.onChange(html);
            }
            this.lastHtml = html;
          }
        }, 70);
        setTimeout(() => {
          if (this.editorFocused || activeEditor) {
            document.execCommand("insertUnorderedList", false, null);
            this.setState(
              {
                unOrderedList: !this.state.unOrderedList,
              },
              () => {
                emphasisStateChange &&
                  emphasisStateChange({
                    unOrderedList: this.state.unOrderedList,
                  });
                let text = this.toggleUpdateText(
                  t("editor.bulletList"),
                  this.state.unOrderedList
                );
                this.toggleArialiveText(text);
              }
            );
          }
        }, 30);
      } else {
        if (this.editorFocused || activeEditor) {
          document.execCommand("insertUnorderedList", false, null);
          this.setState(
            {
              unOrderedList: !this.state.unOrderedList,
            },
            () => {
              emphasisStateChange &&
                emphasisStateChange({
                  unOrderedList: this.state.unOrderedList,
                });
              let text = this.toggleUpdateText(
                t("editor.bulletList"),
                this.state.unOrderedList
              );
              this.toggleArialiveText(text);
            }
          );
        }
      }
    }, 50);
  };

  fontSizeHandler = (params) => {
    const { activeEditor, updateAriaLiveText, t } = this.props;
    let FontSize = 5 - Number(params.itemIndex);
    if (FontSize === 5) {
      FontSize = "+2";
    }
    setTimeout(() => {
      const selection = window.getSelection();
      if (
        selection.type == "Range" ||
        selection.focusNode.textContent == "" ||
        this.state.bold == true ||
        this.state.italic == true ||
        this.state.underline == true ||
        this.state.cursorPosition == 0
      ) {
        activeEditor && activeEditor.focus();
      } else {
        if (this.state.cursorPosition !== null) {
          Cursor.setCurrentCursorPosition(
            this.state.cursorPosition,
            this.editor
          );
        }
      }
    }, 90);
    setTimeout(() => {
      const selection = window.getSelection();
      const span = selection.focusNode.parentNode;
      if (
        span.classList[0] == "mq-numerator" ||
        span.classList[0] == "mq-fraction" ||
        span.classList[0] == "mq-denominator" ||
        span.classList[0] == "mq-sqrt-stem"
      ) {
      } else {
        if (this.editorFocused || activeEditor) {
          document.execCommand("fontSize", false, FontSize);
          updateAriaLiveText(params.item.text + t("carousel.selected"));
        }
        setTimeout(() => {
          updateAriaLiveText(" ");
        }, 1000);
      }
    }, 100);
  };

  onKeyDown = (event) => {
    if (event.target.nodeName != "TEXTAREA") {
      setTimeout(() => {
        this.updateStyle();
      });
      if (event.keyCode == 8) {
        const array = [" ", "", "&nbsp;", "&nbsp; ", " <br>"];
        const selection = window.getSelection();
        const previousSibling = selection.focusNode.parentNode.previousSibling
          ? selection.focusNode.parentNode.previousSibling
          : selection.focusNode;
        const parentNode = selection.focusNode.parentNode.previousSibling
          ? selection.focusNode.parentNode
          : selection.focusNode;
        if (
          previousSibling &&
          previousSibling.nodeType != Node.TEXT_NODE &&
          previousSibling.classList.value != "" &&
          (previousSibling.classList[0] == "mq-editable-field" ||
            previousSibling.classList[1] == "mq-sqrt-prefix" ||
            previousSibling.classList[1] == "blankSpace" ||
            previousSibling.classList[1] == "mq-sqrt-stem") &&
          (array.includes(parentNode.innerHTML) ||
            parentNode.innerHTML.length == 1 ||
            (parentNode.innerHTML.length == 2 &&
              parentNode.innerHTML.includes(" ")))
        ) {
          const blankSpace =
            previousSibling.parentNode.parentNode.parentNode.nextSibling;
          if (blankSpace && array.includes(blankSpace.innerHTML)) {
            blankSpace.parentNode.removeChild(blankSpace);
          }
          if (
            parentNode &&
            array.includes(parentNode.innerHTML) &&
            parentNode.classList[0] == "blankSpace"
          ) {
            parentNode.parentNode.removeChild(parentNode);
          }
          if (previousSibling.classList[1] == "mq-sqrt-prefix") {
            previousSibling.parentNode.parentNode.removeChild(
              previousSibling.parentNode
            );
          } else {
            if (previousSibling.classList[1] == "mq-sqrt-stem") {
              previousSibling.parentNode.parentNode.removeChild(
                previousSibling.parentNode
              );
            } else {
              previousSibling.parentNode.removeChild(previousSibling);
            }
          }
        } else {
          // Fraction backspace
          let fraction =
            selection.focusNode.parentNode.classList[0] == "mq-fraction"
              ? selection.focusNode
              : selection.focusNode.parentNode;
          if (
            fraction &&
            fraction.nodeType != Node.TEXT_NODE &&
            (array.includes(fraction.innerHTML) ||
              fraction.innerHTML.includes("<br>") ||
              fraction.innerHTML.length == 1 ||
              (isTablet && isSafari && fraction.innerHTML.length == 135) ||
              (fraction.innerHTML.length == 2 &&
                fraction.innerHTML.includes(" "))) &&
            ((fraction.classList.value != "" &&
              (fraction.classList[0] == "mq-numerator" ||
                fraction.classList[0] == "mq-denominator")) ||
              (selection.focusNode.classList != undefined &&
                (selection.focusNode.classList[0] == "mq-numerator" ||
                  selection.focusNode.classList[0] == "mq-denominator")))
          ) {
            const spanWarapper = fraction.parentNode;
            const blankSpace = spanWarapper.parentNode.parentNode.nextSibling;
            if (blankSpace && blankSpace.innerHTML == "&nbsp;") {
              blankSpace.parentNode.removeChild(blankSpace);
            }
            spanWarapper.parentNode.removeChild(spanWarapper);
            if (isTablet && isSafari) {
              fraction.removeChild(selection.focusNode);
            }
          }
        }
      }
      // delete
      if (event.keyCode == 46) {
        const array = [" ", "", "&nbsp;"];
        const selection = window.getSelection();
        const previousSibling = selection.focusNode.parentNode.nextSibling;
        const parentNode = selection.focusNode.parentNode;
        if (
          previousSibling &&
          previousSibling.nodeType != Node.TEXT_NODE &&
          (previousSibling.classList[0] == "mq-editable-field" ||
            previousSibling.classList[1] == "mq-sqrt-prefix") &&
          (array.includes(parentNode.innerHTML) ||
            parentNode.innerHTML.length == 1 ||
            (parentNode.innerHTML.length == 2 &&
              parentNode.innerHTML.includes(" ")))
        ) {
          const blankSpace =
            previousSibling.parentNode.parentNode.parentNode.nextSibling;
          if (blankSpace && blankSpace.innerHTML == "&nbsp;") {
            blankSpace.parentNode.removeChild(blankSpace);
          }
          if (previousSibling.classList[1] == "mq-sqrt-prefix") {
            previousSibling.parentNode.parentNode.removeChild(
              previousSibling.parentNode
            );
          } else {
            previousSibling.parentNode.removeChild(previousSibling);
          }
        } else {
          // Fraction delete
          let fraction = selection.focusNode.parentNode;
          if (
            fraction &&
            fraction.nodeType != Node.TEXT_NODE &&
            (array.includes(fraction.innerHTML) ||
              fraction.innerHTML.includes("<br>") ||
              fraction.innerHTML.length == 1 ||
              (fraction.innerHTML.length == 2 &&
                fraction.innerHTML.includes(" "))) &&
            (fraction.classList[0] == "mq-numerator" ||
              fraction.classList[0] == "mq-denominator")
          ) {
            const spanWarapper = fraction.parentNode;
            let blankSpace = spanWarapper.parentNode.parentNode.nextSibling;
            if (blankSpace && blankSpace.innerHTML == "&nbsp;") {
              blankSpace.parentNode.removeChild(blankSpace);
            }
            spanWarapper.parentNode.removeChild(spanWarapper);
          }
        }
      }
      if (event.keyCode == 13) {
        const selection = window.getSelection();
        const span = selection.focusNode.parentNode;
        if (
          span &&
          (span.classList[0] == "mq-non-leaf" ||
            span.classList[0] == "mq-fraction" ||
            span.parentNode.classList[0] == "mq-fraction")
        ) {
          event.preventDefault();
        }
      }
    }
  };

  onMouseUp = (event) => {
    if (event.target.nodeName != "TEXTAREA") {
      setTimeout(() => {
        this.updateStyle();
      });
    }
  };

  onMouseDown = (event) => {};

  onTouchEnd = (event) => {
    if (event.target.nodeName != "TEXTAREA") {
      setTimeout(() => {
        this.updateStyle();
      }, 1);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.bold !== this.state.bold ||
      nextState.italic !== this.state.italic ||
      nextState.underline !== this.state.underline ||
      nextState.unOrderedList !== this.state.unOrderedList
    ) {
      setTimeout(() => {
        if (!this.props.isPopupActive) {
          this.forceUpdate();
        }
      });
    }
    if (nextProps.isPopupActive !== this.props.isPopupActive) {
      setTimeout(() => {
        this.forceUpdate();
      });
    }
    if (this.props.isPopupActive) {
      return nextProps.html !== this.editor.innerHTML;
    } else {
      return false;
    }
  }

  symbolHandler = (dataObject) => {
    const { itemIndex, item } = dataObject;
    let sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        if (item.type) {
          if (this.currentMathField) {
            if (item.type == "math-div") {
              this.currentMathField.write("{\\frac{}{}}");
            } else if (item.type == "math-root") {
              this.currentMathField.write("{\\sqrt{}}");
            }
          } else {
            //range.insertNode(this.createMathFeild(item));
            //let divContent = this.editor.getElementsByTagName("div");
            // while (divContent.length) {
            //   let parent = divContent[0].parentNode;
            //   const label = document.createElement("label");
            //   const br = document.createElement("br");
            //   if (
            //     isFirefox &&
            //     divContent[0].previousSibling &&
            //     divContent[0].previousSibling.outerHTML == "<br>"
            //   ) {
            //   } else {
            //     parent.insertBefore(br, divContent[0]);
            //   }
            //   label.innerHTML = divContent[0].innerHTML;
            //   parent.insertBefore(label, divContent[0]);
            //   parent.removeChild(divContent[0]);
            // }
            const blankSpace = document.createElement("span");
            const element = document.createElement("span");
            blankSpace.classList.add("blankSpace");
            blankSpace.innerHTML = "&nbsp;";
            element.innerHTML = "&nbsp;&nbsp;";
            const span = this.createMathFeild(item);
            const div = span.querySelector(".mq-scaled");
            if (div) {
              div.setAttribute("contenteditable", false);
            }
            if (item.type == "math-div") {
              span.children[1].children[0].children[0].textContent = " ";
              if (isFirefox) {
                span.children[1].children[0].children[0].innerHTML = "&nbsp;";
                span.children[1].children[0].children[1].innerHTML = "&nbsp;";
              }
              if (isTablet && isAndroid) {
                span.children[1].children[0].children[1].innerHTML = "&nbsp;";
              }
              let div2 = span.querySelector(".mq-root-block").childNodes[0];
              div2 = div2.childNodes[div2.childNodes.length - 1];
              div2.parentNode.removeChild(div2);
            } else {
              span.children[1].children[0].children[1].innerHTML = " ";
              if (isFirefox) {
                span.children[1].children[0].children[1].innerHTML = "&nbsp;";
              }
            }
            element.appendChild(span);
            element.appendChild(blankSpace);
            if ((isTablet && isSafari) || isMacOs) {
              document.execCommand(
                "insertHTML",
                false,
                element.outerHTML + "&nbsp;"
              );
            } else {
              document.execCommand("insertHTML", false, element.outerHTML);
            }
            const position = Cursor.getCurrentCursorPosition(this.editor);
            setTimeout(() => {
              if (position !== null) {
                this.setState({
                  cursorPosition: position - 1,
                });
                Cursor.setCurrentCursorPosition(position - 1, this.editor);
                if (
                  (isFirefox || (isTablet && isAndroid)) &&
                  item.type == "math-div"
                ) {
                  Cursor.setCurrentCursorPosition(position - 2, this.editor);
                }
                if ((isTablet && isSafari) || isMacOs) {
                  Cursor.setCurrentCursorPosition(position - 2, this.editor);
                }
              }
            });
          }
        } else {
          if (this.currentMathField) {
            let text = "";
            switch (item.text) {
              case "&Cross;":
                text = "\\cdot";
                break;
              case "&divide;":
              case "&plus;":
              case "&minus;":
              case "&le;":
              case "&ge;":
              case "&radic;":
              case "&boxh;":
              case "&roarr;":
              case "&loarr;":
              case "&rlhar;":
              case "&deg":
              case "&theta;":
              case "&lambda;":
              case "&mu;":
              case "&Delta;":
                text = OPERATORS[item.text];
                break;
            }
            this.currentMathField.write(text);
          } else {
            //range.insertNode(range.createContextualFragment(item.text));
            document.execCommand("insertText", false, OPERATORS[item.text]);
          }
          const position = Cursor.getCurrentCursorPosition(this.editor);
          setTimeout(() => {
            if (position !== null) {
              this.setState({
                cursorPosition: position,
              });
              Cursor.setCurrentCursorPosition(position, this.editor);
            }
          });
        }
      }
    } else if (document.selection && document.selection.createRange) {
      document.selection.createRange().text = item.text;
      document.selection.empty();
      const html = this.editor.innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
        this.props.onChange(html);
      }
      this.lastHtml = html;
      const position = Cursor.getCurrentCursorPosition(this.editor);
      setTimeout(() => {
        if (position !== null) {
          this.setState({
            cursorPosition: position,
          });
          Cursor.setCurrentCursorPosition(position, this.editor);
        }
      });
    }
  };

  createMathFeild(item) {
    let mathField;
    const span = document.createElement("span");
    span.id = `mathquill_wrapper_span_${Math.floor(Math.random() * 1000000)}`;
    span.style.border = "none";
    span.style.boxShadow = "none";
    mathField = MQ.MathField(span, {
      spaceBehavesLikeTab: true,
      leftRightIntoCmdGoes: "up",
      handlers: {
        edit: () => {
          var enteredMath = mathField.latex(); // Get entered math in LaTeX format
          if (!enteredMath) {
            this.editor.removeChild(mathField.el());
            this.currentMathField = null;
          }
        },
        moveOutOf: (dir, mathField) => {},
        upOutOf: (mathField) => {},
      },
    });
    if (item.type == "math-div") {
      mathField.write("\\frac{}{}");
    } else if (item.type == "math-root") {
      mathField.write("\\sqrt{}");
    }
    return span;
  }

  onClick = (event) => {
    const position = Cursor.getCurrentCursorPosition(this.editor);
    this.setState({
      cursorPosition: position,
    });
    const sel = window.getSelection();
    const node = sel.focusNode.parentNode.parentNode;
    if (
      (isFirefox || (isTablet && isSafari) || isMacOs) &&
      (event.target == this.editor || event.target.tagName == "LI") &&
      (node.classList[0] == "mq-fraction" ||
        node.classList[0] == "mq-root-block" ||
        node.classList[0] == "mq-non-leaf")
    ) {
      const lastPosition = Cursor.getLastPosition(this.editor);
      setTimeout(() => {
        if (lastPosition !== null) {
          Cursor.setCurrentCursorPosition(lastPosition + 1, this.editor);
        }
      });
    }
  };

  render() {
    const { bold, italic, underline, unOrderedList, cursorPosition } =
      this.state;
    const { html, t, label, isPopupActive } = this.props;

    return (
      <div className="vl-text-editor-container">
        <div
          ref={(el) => (this.editor = el)}
          id={this.editorId}
          role="textbox"
          contentEditable
          spellCheck={false}
          className="vl-content-editable word-wrap"
          placeholder={this.props.placeholder}
          aria-label={label}
          dangerouslySetInnerHTML={{ __html: html }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onInput={this.handleInput}
          onKeyDown={this.onKeyDown}
          onMouseUp={this.onMouseUp}
          onTouchEnd={this.onTouchEnd}
          onClick={this.onClick}
        />
        {this.props.toolbar && (
          <EditorToolbar
            fontHandler={this.fontSizeHandler}
            boldHandler={this.boldHandler}
            italicHandler={this.italicHandler}
            underlineHandler={this.underlineHandler}
            unOrderedListHandler={this.unOrderedListHandler}
            isBold={bold}
            isItalic={italic}
            isUnderline={underline}
            isUnOrderedList={unOrderedList}
            printHandler={this.props.printHandler}
            t={t}
            symbolHandler={this.symbolHandler}
            isPopupActive={isPopupActive}
          />
        )}
      </div>
    );
  }
}

Editor.propTypes = {
  setActiveEditor: PropTypes.func,
  boldClick: PropTypes.bool,
  italicClick: PropTypes.bool,
  underlineClick: PropTypes.bool,
  unorderListClick: PropTypes.bool,
  fontSizeClick: PropTypes.object,
  onChange: PropTypes.func,
  emphasisStateChange: PropTypes.func,
  activeEditor: PropTypes.any,
  updateAriaLiveText: PropTypes.func,
  html: PropTypes.any,
  placeholder: PropTypes.string,
  toolbar: PropTypes.bool,
  printHandler: PropTypes.func,
};

Editor.defaultProps = {
  setActiveEditor: () => {},
  setFocusedEditor: () => {},
  onChange: () => {},
  emphasisStateChange: () => {},
  updateAriaLiveText: () => {},
  printHandler: () => {},
  boldClick: false,
  italicClick: false,
  underlineClick: false,
  unorderListClick: false,
  fontSizeClick: {},
  activeEditor: "",
  html: "",
  placeholder: "",
  toolbar: true,
};

export default Editor;
