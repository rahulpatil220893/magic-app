import React from "react";
import ButtonItem from "./ButtonItem";
import Tooltip from "../Tooltip";
import { isTablet } from "react-device-detect";

class DropDownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: this.props.opened,
      currentItem: 0,
    };

    this.blurTimeout = "";
  }

  onMouseDown = (event) => {
    event.persist();
    event.preventDefault();
    return false;
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
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.opened === true) {
      setTimeout(() => {
        this.setState({
          currentItem: 0,
        });
        // this.activeLink.focus();
      });
      document.addEventListener("click", this.checkIfClickedOutside);
    }

    if (newProps.opened === false) {
      document.removeEventListener("click", this.checkIfClickedOutside);
    }
  }

  checkIfClickedOutside = (e) => {
    if (
      e.target.className == "clickable-objects" ||
      e.target.classList[0] != "icon-fonts"
    ) {
      this.props.closeDropDown();
    }
  };

  onClick = (e, menuIndex) => {
    e.preventDefault();
    const { onItemClick } = this.props;
    this.props.closeDropDown(true);

    onItemClick({
      itemIndex: menuIndex,
      item: this.props.menu[menuIndex],
    });
  };

  onBlur = (e) => {
    this.toolTipHide(e);
    // this.blurTimeout = setTimeout(() => {
    if (this.props.opened) {
      // this.props.closeDropDown();
    }
    // }, 10);
  };

  onKeyDown = (e, itemIndex) => {
    switch (e.which) {
      case 13:
        e.preventDefault();
        e.stopPropagation();
        this.onClick(e, itemIndex);
        break;
      case 27:
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.closeDropDown(true);
        break;
      case 35:
        e.preventDefault();
        this.lastItem(itemIndex);
        break;
      case 36:
        e.preventDefault();
        this.firstItem(itemIndex);
        break;
      case 37:
      case 38:
        e.preventDefault();
        this.previousItem(itemIndex);
        break;
      case 39:
      case 40:
        e.preventDefault();
        this.nextItem(itemIndex);
        break;
      default:
        break;
    }
  };

  keyDownList = (e) => {
    if (e.which == 39 || e.which == 40) {
      if (
        e.target.parentNode.nextSibling &&
        e.target.parentNode.nextSibling.querySelector("a")
      ) {
        e.target.parentNode.nextSibling.querySelector("a").focus();
      } else {
        if (
          e.target.parentNode &&
          e.target.parentNode.parentNode &&
          e.target.parentNode.parentNode.firstChild &&
          e.target.parentNode.parentNode.firstChild.nodeName == "li" &&
          e.target.parentNode.parentNode.firstChild.querySelector("a")
        ) {
          // e.target.parentNode.parentNode.firstChild.querySelector("a").focus();
        }
      }
    } else if (e.which == 37 || e.which == 38) {
      if (
        e.target.parentNode.previousSibling &&
        e.target.parentNode.previousSibling.querySelector("a")
      ) {
        e.target.parentNode.previousSibling.querySelector("a").focus();
      } else {
        if (
          e.target.parentNode &&
          e.target.parentNode.parentNode &&
          e.target.parentNode.parentNode.lastChild &&
          e.target.parentNode.parentNode.lastChild.nodeName == "li" &&
          e.target.parentNode.parentNode.lastChild.querySelector("a")
        ) {
          // e.target.parentNode.parentNode.lastChild.querySelector("a").focus();
        }
      }
    } else if (e.which == 9) {
      this.props.closeDropDown();
    }
  };

  onChangeItem = (itemIndex) => {
    this.setState(
      {
        currentItem: itemIndex,
      },
      () => {
        // this.activeLink.focus();
      }
    );
  };

  selectItem(itemIndex) {
    const { currentItem } = this.state;

    if (currentItem !== itemIndex) {
      this.onChangeItem(itemIndex);
    }
  }

  previousItem(index) {
    if (index > 0) this.selectItem(index - 1);
    else if (index === 0) this.selectItem(this.props.menu.length - 1);
  }

  nextItem(index) {
    if (index < this.props.menu.length - 1) this.selectItem(index + 1);
    else if (index === this.props.menu.length - 1) this.selectItem(0);
  }

  firstItem() {
    this.selectItem(0);
  }

  lastItem() {
    this.selectItem(this.props.menu.length - 1);
  }

  render = () => {
    const { currentItem } = this.state;
    const { opened, menu, classes, t } = this.props;
    return (
      <div
        style={{ display: opened ? "block" : "none" }}
        className={classes || null}
      >
        <ul className="vl-list" role="menu">
          {menu?.map((menuList, index) => {
            const itemIndex = index === currentItem ? 0 : -1;
            return (
              <li
                key={index}
                role="none"
                className={`vl-item ${menuList.class}`}
                onClick={(e) => {
                  this.onClick(e, index);
                }}
              >
                <a
                  href="#"
                  tabIndex={0}
                  role="menuitem"
                  className={"clickable-objects"}
                  dangerouslySetInnerHTML={{
                    __html: menuList.isSymbol
                      ? menuList.text == "&deg"
                        ? menuList.html
                        : menuList.type !== "math-div" &&
                          menuList.type !== "math-root"
                        ? menuList.text
                        : ""
                      : t(`editorText.${menuList.ariaLabel}`),
                  }}
                  onKeyDown={(e) => {
                    return this.keyDownList(e, index);
                  }}
                  onFocus={(e) => {
                    document.body.className == "no-outline"
                      ? null
                      : this.toolTipShow(e);
                  }}
                  onBlur={(e) => this.onBlur(e)}
                  aria-label={
                    menuList.isSymbol
                      ? t(`editorText.${menuList.title}`)
                      : t(`editorText.${menuList.ariaLabel}`)
                  }
                  onMouseOver={(e) => {
                    isTablet ? null : this.toolTipShow(e);
                  }}
                  onMouseLeave={(e) => this.toolTipHide(e)}
                />
                {menuList.isSymbol ? (
                  <Tooltip
                    id={t(`editorText.${menuList.title}`)}
                    title={t(`editorText.${menuList.title}`)}
                    classes={t(`editorText.${menuList.title}`)}
                    position="bottom"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}

DropDownButton.defaultProps = {
  menu: [],
  classes: "",
};

export default DropDownButton;
