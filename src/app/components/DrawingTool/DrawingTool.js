import React, { Component } from "react";
import Tooltip from "../Tooltip";

class DrawingTool extends Component {
  constructor(props) {
    super(props);
    this.subMenuRef = React.createRef(null);
    this.state = {
      selectedSize: 2,
      selectedTool: "select",
      selectedColor: "black",
      disableScreenshotButton: false,
    };
    this.toolbarItems = [
      {
        id: "select",
        icon: "Select_2",
        haveSelectedState: true,
        tooltipPosition: "right",
      },
      {
        id: "pencil",
        icon: "Pencil_2",
        haveSelectedState: true,
        tooltipPosition: "right",
      },
      {
        id: "eraser",
        icon: "Eraser_2",
        haveSelectedState: true,
        tooltipPosition: "right",
      },
      {
        id: "clearall",
        icon: "ClearAll_2",
        haveSelectedState: false,
        customFunction: "clearall",
        tooltipPosition: "right",
      },
      {
        id: "screenshot",
        icon: "Camera_2",
        haveSelectedState: false,
        customFunction: "screenshot",
        tooltipPosition: "right",
      },
    ];
    this.colorPallete = [
      {
        id: "black",
      },
      {
        id: "red",
      },
      {
        id: "green",
      },
      {
        id: "yellow",
      },
      {
        id: "violet",
      },
      {
        id: "blue",
      },
    ];
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.activeDrawing !== this.props.activeDrawing &&
      !newProps.activeDrawing
    ) {
      this.props.enableClearDrawingHandler(false);
      this.setState({
        selectedTool: "select",
      });
    }

    if (
      newProps.currentTab !== this.props.currentTab ||
      newProps.currentSubTab !== this.props.currentSubTab
    ) {
      this.props.updateDrawingOptions({ color: "black", size: 2 });
      this.setState({
        selectedSize: 2,
        selectedColor: "black",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.showDrawingOptions !== prevProps.showDrawingOptions &&
      this.props.showDrawingOptions
    ) {
      const black = this.subMenuRef.current.querySelector(
        `[data-color= ${this.state.selectedColor}]`
      );
      if (black) {
        black.focus();
      }
    }
    if (
      this.state.disableScreenshotButton !==
        prevState.disableScreenshotButton &&
      this.state.disableScreenshotButton
    ) {
      setTimeout(() => {
        this.setState({
          disableScreenshotButton: false,
        });
      }, 1500);
    }
  }

  changeTool = (tool) => {
    const {
      activeDrawing,
      showDrawingOptions,
      activeDrawingHandler,
      updateDrawingOptions,
      showDrawingOptionsHandler,
    } = this.props;

    if (tool === "pencil" || tool === "eraser") {
      if (activeDrawing === false) {
        activeDrawingHandler(true);
      }
      if (tool === "pencil") {
        if (!showDrawingOptions) {
          showDrawingOptionsHandler(true);
        } else {
          showDrawingOptionsHandler(!showDrawingOptions);
        }
      } else {
        showDrawingOptionsHandler(false);
      }
    } else if (tool === "select") {
      if (activeDrawing) {
        activeDrawingHandler(false);
      }
      if (showDrawingOptions) {
        showDrawingOptionsHandler(false);
      }
    }

    this.setState(
      {
        selectedTool: tool,
      },
      () => {
        updateDrawingOptions({
          tool,
        });
      }
    );
  };

  changeColor = (event) => {
    event.preventDefault();
    const { color } = event.target.dataset;
    const { updateDrawingOptions } = this.props;

    this.setState(
      {
        selectedColor: color,
      },
      () => {
        updateDrawingOptions({
          color,
        });
      }
    );
  };

  changeSize = (size) => {
    const { updateDrawingOptions } = this.props;
    this.setState(
      {
        selectedSize: size,
      },
      () => {
        updateDrawingOptions({
          size,
        });
      }
    );
  };

  decreaseSize = () => {
    const { selectedSize } = this.state;
    if (selectedSize > 1) {
      this.changeSize(selectedSize - 1);
    }
  };

  increaseSize = () => {
    const { selectedSize } = this.state;
    if (selectedSize < 3) {
      this.changeSize(selectedSize + 1);
    }
  };

  screenShot = (drawingTool) => {
    this.props.screenShot(drawingTool);
  };

  clearDrawing = () => {
    this.props.clearDrawingHandler();
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

  onItemClick = (event, id, customFunction, drawingTool) => {
    event.preventDefault();
    this.toolTipHide(event);
    if (customFunction) {
      if (customFunction === "clearall") {
        this.clearDrawing();
      } else if (customFunction === "screenshot") {
        this.screenShot(drawingTool);
        this.setState({
          disableScreenshotButton: true,
        });
      }
    } else {
      this.changeTool(id);
    }
  };

  expand = () => {
    const menu = document.querySelector(".btn-hamburger-menu");
    if (menu.getAttribute("data-expand") == "true") {
      const buttons = document.querySelector(".help-button-menuitem");
      if (buttons) {
        buttons.focus();
      }
    }
  };

  render() {
    const {
      selectedTool,
      selectedColor,
      selectedSize,
      disableScreenshotButton,
    } = this.state;
    const {
      showDrawingOptions,
      drawingToolData: drawingTool,
      isPopupActive,
      ariaHidden,
    } = this.props;

    const _isPopupActive = isPopupActive ? "-1" : null;
    return (
      <div className="vl-drawing-tool-container" aria-hidden={ariaHidden}>
        <ul
          role="none"
          className="vl-drawing-tool"
          aria-label={drawingTool.listLabel}
        >
          {this.toolbarItems.map((item) => {
            const { id, icon, customFunction, haveSelectedState } = item;
            const pencil = id === "pencil";
            const active = selectedTool === id;
            const hidden =
              ["select", "pencil", "clearall", "eraser"].indexOf(id) >= 0;
            const selected = haveSelectedState && active ? "selected" : "";
            const disabled =
              (item.id === "clearall" && !this.props.enableClearDrawing) ||
              (item.id === "screenshot" && disableScreenshotButton);
            return (
              <React.Fragment key={id}>
                <li role="none">
                  <button
                    // role="menuitem"
                    disabled={disabled}
                    aria-hidden={hidden}
                    //title={drawingTool[id]}
                    onBlur={(e) => this.toolTipHide(e)}
                    onFocus={(e) => {
                      document.body.className == "no-outline"
                        ? this.expand()
                        : this.toolTipShow(e);
                    }}
                    onMouseOver={(e) => this.toolTipShow(e)}
                    onMouseLeave={(e) => this.toolTipHide(e)}
                    className={`vl-tool-box ${selected}`.trim()}
                    tabIndex={
                      isPopupActive || hidden || item.id != "screenshot"
                        ? "-1"
                        : null
                    }
                    onClick={(e) =>
                      this.onItemClick(e, id, customFunction, drawingTool)
                    }
                    aria-label={drawingTool[id]}
                  >
                    <span aria-hidden className={`icomoon-${icon}`}></span>
                  </button>
                  <Tooltip
                    id={id + "-tooltip"}
                    title={drawingTool[id]}
                    classes={drawingTool[id]}
                    position={item.tooltipPosition}
                  />
                </li>
                {showDrawingOptions && pencil && active ? (
                  <li role="none" className={`pencil-panel show`}>
                    <ul
                      className="oval-container"
                      ref={this.subMenuRef}
                      role="menu"
                      aria-label={drawingTool.drawingPencilSubMenu.menuLabel}
                    >
                      {this.colorPallete.map((item, index) => {
                        const _index = index + 1;
                        const selected =
                          selectedColor == item.id ? "selected" : "";
                        return (
                          <li
                            className="oval-holder"
                            key={`color${index}`}
                            role="none"
                          >
                            <a
                              href="#"
                              data-color={item.id}
                              tabIndex={_isPopupActive}
                              onClick={this.changeColor}
                              className={`oval oval-${_index} ${selected}`.trim()}
                              title={
                                drawingTool.drawingPencilSubMenu.color[item.id]
                              }
                              role="menuitem"
                            ></a>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="bar-container">
                      <button
                        tabIndex={_isPopupActive}
                        onClick={this.decreaseSize}
                        className="bar-sign minus-sign"
                        title={drawingTool.drawingPencilSubMenu.slider.decrease}
                        aria-label={
                          drawingTool.drawingPencilSubMenu.slider.decrease
                        }
                      >
                        <span className="icon-minus" aria-hidden="true"></span>
                      </button>
                      <div
                        className="bar-holder"
                        title={drawingTool.drawingPencilSubMenu.slider.sizeTool}
                      >
                        <input
                          min="1"
                          max="3"
                          type="range"
                          className="bar"
                          value={selectedSize}
                          onChange={(event) => {
                            this.changeSize(parseInt(event.target.value));
                          }}
                          aria-label={
                            drawingTool.drawingPencilSubMenu.slider.sizeTool
                          }
                        />
                      </div>
                      <button
                        tabIndex={_isPopupActive}
                        onClick={this.increaseSize}
                        className="bar-sign plus-sign"
                        title={drawingTool.drawingPencilSubMenu.slider.increase}
                        aria-label={
                          drawingTool.drawingPencilSubMenu.slider.increase
                        }
                      >
                        <span className="icon-plus" aria-hidden="true"></span>
                      </button>
                    </div>
                  </li>
                ) : null}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DrawingTool;
