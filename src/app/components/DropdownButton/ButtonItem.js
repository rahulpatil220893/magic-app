import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';

const renderContent = props => {
  var _a = props,
    dataItem = _a.dataItem,
    textField = _a.textField,
    index = _a.index;
  var Render = props.dataItem.render || props.itemRender;
  var text =
    dataItem.text !== undefined
      ? dataItem.text
      : textField
        ? dataItem[textField]
        : dataItem;
  var iconClass = dataItem.icon
    ? "vl-icon vl-i-" + dataItem.icon
    : dataItem.iconClass;
  return (
    (Render &&
      React.createElement(Render, { item: dataItem, itemIndex: index })) || [
      iconClass &&
      React.createElement("span", {
        className: iconClass,
        role: "presentation",
        key: "icon"
      }),
      dataItem.imageUrl &&
      React.createElement("img", {
        className: "vl-image",
        alt: "",
        src: dataItem.imageUrl,
        role: "presentation",
        key: "image"
      }),
      text
    ]
  );
};

const ButtonItem = props => {
  const { dataItem, focused, id, onDown } = props;
  const handleClick = event => {
    return props.onClick(event, props.index);
  };
  return (
    <li
      id={id}
      tabIndex="-1"
      className={classNames(
        "vl-item",
        dataItem.className && dataItem.className,
        {
          "vl-state-focused": focused,
          "vl-state-selected": dataItem.selected,
          "vl-state-disabled": dataItem.disabled
        }
      )}
      onClick={handleClick}
      onMouseDown={onDown}
      onPointerDown={onDown}
      role="menuitem"
      aria-disabled={dataItem.disabled || undefined}
    >
      {renderContent(props)}
    </li>
  )
};
ButtonItem.propTypes = {
  dataItem: PropTypes.object,
  onDown: PropTypes.func,
  focused: PropTypes.any,
  id: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.any,
}
export default ButtonItem;
