import React from "react";
import PropTypes from "prop-types";
import { normalizeHtml, replaceCaret } from "./utils";

class ContentEditable extends React.Component {
  constructor(props) {
    super(props);
    this.editorId = `editor-${+new Date()}`;
    this._element = React.createRef();
  }

  getElement = () =>
    (this.props.innerRef && typeof this.props.innerRef !== "function"
      ? this.props.innerRef
      : this._element
    ).current;

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const el = this.getElement();

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!el) return true;

    // ...or if html really changed... (programmatically, not by user edit)
    if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)) {
      return true;
    }

    // Handle additional properties
    return (
      props.disabled !== nextProps.disabled ||
      props.tagName !== nextProps.tagName ||
      props.className !== nextProps.className ||
      props.innerRef !== nextProps.innerRef
    );
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.defaultLang !== newProps.defaultLang) {
      setTimeout(() => {
        // this.forceUpdate();
        if (this.props.id && this.props.label) {
          const labelAria = document.getElementById(`${this.props.id}`);
          labelAria.setAttribute("aria-label", `${this.props.label}`);
        }
        // const labelAria = document.querySelectorAll(".content-editable");
        // for (let i = 0; i < labelAria.length; i++) {
        //   labelAria[i].setAttribute("aria-label", `${this.props.label}`);
        // }
      });
    }
  }

  componentDidUpdate() {
    const el = this.getElement();
    if (!el) return;

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (this.props.html !== el.innerHTML) {
      el.innerHTML = this.lastHtml = this.props.html;
    }
    replaceCaret(el);
  }

  emitChange = (originalEvt) => {
    const el = this.getElement();
    if (!el) return;
    if (this.props.acceptenterkey == "false" && originalEvt.keyCode === 13) {
      originalEvt.preventDefault();
    }
    if (this.props.maxLength) {
      const currentTextLength = originalEvt.target.outerText.length;
      if (
        currentTextLength === this.props.maxLength &&
        originalEvt.keyCode != 8 &&
        originalEvt.keyCode != 9
      ) {
        originalEvt.preventDefault();
      }
    }
    const html = el.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html,
        },
      });
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  };

  render() {
    const { tagName, html, innerRef, defaultLang, ...props } = this.props;
    //return (
    //   <div
    //     {...props}
    //     ref={
    //       typeof innerRef === "function"
    //         ? (current) => {
    //           innerRef(current);
    //           //this._element = current;
    //         }
    //         : innerRef || this._element
    //     }
    //     role="textbox"
    //     onInput={this.emitChange}
    //     onBlur={this.props.onBlur || this.emitChange}
    //     onKeyUp={this.props.onKeyUp || this.emitChange}
    //     onKeyDown={this.props.onKeyDown || this.emitChange}
    //     contentEditable={!this.props.disabled}
    //     dangerouslySetInnerHTML={{ __html: html }}
    //   >
    //     {this.props.children}
    //   </div>
    // );
    return React.createElement(
      tagName || "div",
      {
        ...props,
        ref:
          typeof innerRef === "function"
            ? (current) => {
                innerRef(current);
                //this._element.current = current
              }
            : innerRef || this._element,
        role: "textbox",
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        onKeyUp: this.props.onKeyUp || this.emitChange,
        onKeyDown: this.props.onKeyDown || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html },
      },
      this.props.children
    );
  }
}

ContentEditable.propTypes = {
  html: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  tagName: PropTypes.string,
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  maxLength: PropTypes.number,
};

export default ContentEditable;
