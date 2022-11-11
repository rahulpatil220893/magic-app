import React from "react";

class DrawingWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "",
      height: "",
    };

    this.canvasMouseDown = false;
    this.hasDrawing = false;

    this.isDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
      );
    this.isIpadDevice = navigator.userAgent.match(/iPad/i) != null;
    this.isAndroidDevice = /(android)/i.test(navigator.userAgent);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.addEventListener("mousedown", this.onMouseDown, false);
    this.canvas.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("mouseup", this.onMouseUp, false);
    this.canvas.addEventListener("touchstart", this.touchStart, false);
    this.canvas.addEventListener("touchmove", this.touchMove, false);
    window.addEventListener("orientationchange", this.orientationChange, false);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown, false);
    this.canvas.removeEventListener("mousemove", this.onMouseMove, false);
    this.canvas.removeEventListener("touchstart", this.touchStart, false);
    this.canvas.removeEventListener("touchmove", this.touchMove, false);
    window.removeEventListener("mouseup", this.onMouseUp, false);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // Check drawing to enable or disable
    if (newProps.activeDrawing !== this.props.activeDrawing) {
      // if drawing tool enable
      if (
        newProps.activeDrawing === true &&
        newProps.currentTab === this.props.screenIndex
      ) {
        if (this.hasDrawing) {
          this.props.enableClearDrawingHandler(true);
        }
        if (this.isDevice) {
          if (this.props.orientation === newProps.widthChange.orientation) {
            if (newProps.currentSubTab === "") {
              this.canvas.parentNode.style.display = "block";
              if (this.state.width === "") {
                this.setDimensions();
              }
            } else {
              if (newProps.currentSubTab === this.props.subScreenIndex) {
                this.canvas.parentNode.style.display = "block";
                if (this.state.width === "") {
                  this.setDimensions();
                }
              }
            }
          }
        } else {
          if (this.props.orientation === "landscape") {
            if (newProps.currentSubTab === "") {
              this.canvas.parentNode.style.display = "block";
              if (this.state.width === "") {
                this.setDimensions();
              }
            } else {
              if (newProps.currentSubTab === this.props.subScreenIndex) {
                this.canvas.parentNode.style.display = "block";
                if (this.state.width === "") {
                  this.setDimensions();
                }
              }
            }
          }
        }
      }
      // if drawing tool disable
      else {
        this.canvas.parentNode.style.display = "none";
      }
    }

    if (
      this.props.activeDrawing === true &&
      this.props.currentTab === this.props.screenIndex
    ) {
      if (this.props.clearDrawing !== newProps.clearDrawing) {
        this.clearDrawing();
      }

      if (
        newProps.widthChange.windowSize !== this.props.widthChange.windowSize ||
        newProps.widthChange.windowHeight !==
          this.props.widthChange.windowHeight
      ) {
        if (!this.isDevice && this.props.orientation === "landscape") {
          this.setDimensions();
        }
      }
    }

    if (this.props.height != newProps.height) {
      this.setDimensions();
    }
  }

  orientationChange = () => {
    setTimeout(() => {
      if (
        this.props.activeDrawing === true &&
        this.props.currentTab === this.props.screenIndex &&
        this.props.widthChange.orientation === this.props.orientation &&
        this.isDevice
      ) {
        this.canvas.parentNode.style.display = "block";
        if (this.state.width === "") {
          this.setDimensions();
        }
      } else {
        this.canvas.parentNode.style.display = "none";
      }
    }, 50);
  };

  setDimensions = () => {
    setTimeout(() => {
      const parentDimension = this.canvas.parentNode.getBoundingClientRect();
      this.setState({
        width: this.props.width || parentDimension.width || "",
        height: this.props.height || parentDimension.height || "",
      });
    });
  };

  onMouseDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;
    this.ctx.lineWidth = this.props.drawingToolOptions.size * 3;
    this.canvasMouseDown = true;
    this.hasDrawing = true;
    this.props.enableClearDrawingHandler(this.hasDrawing);
    this.props.showDrawingOptionsHandler(
      false,
      this.props.currentTab,
      this.props.currentSubTab
    );
  };

  onMouseMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (this.canvasMouseDown === true) {
      if (this.props.drawingToolOptions.tool === "pencil") {
        this.drawDot(event.offsetX, event.offsetY);
      } else if (this.props.drawingToolOptions.tool === "eraser") {
        this.eraseDrawing(
          event.offsetX,
          event.offsetY,
          this.props.drawingToolOptions.size * 3
        );
      }
    }
  };

  onMouseUp = (event) => {
    this.canvasMouseDown = false;
  };

  touchStart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var position = event.target.getBoundingClientRect();
    this.lastX = event.touches[0].pageX - position.left;
    this.lastY = event.touches[0].pageY - position.top;
    this.ctx.lineWidth = this.props.drawingToolOptions.size * 3;
    this.hasDrawing = true;
    this.props.enableClearDrawingHandler(this.hasDrawing);
    this.props.showDrawingOptionsHandler(
      false,
      this.props.currentTab,
      this.props.currentSubTab
    );
  };

  touchMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var position = event.target.getBoundingClientRect();
    const touchX = event.touches[0].pageX - position.left;
    const touchY = event.touches[0].pageY - position.top;

    if (this.props.drawingToolOptions.tool === "pencil") {
      this.drawDot(touchX, touchY);
    } else if (this.props.drawingToolOptions.tool === "eraser") {
      this.eraseDrawing(touchX, touchY, this.props.drawingToolOptions.size * 3);
    }
  };

  drawDot = (x, y, size) => {
    const colorCodes = {
      black: "#000000",
      red: "#E7001C",
      green: "#78D215",
      yellow: "#F8E71C",
      violet: "#9012FE",
      blue: "#3C88E1",
    };
    this.ctx.beginPath();
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = colorCodes[this.props.drawingToolOptions.color];
    this.ctx.strokeStyle = colorCodes[this.props.drawingToolOptions.color];
    this.ctx.lineJoin = "round";
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.lastX = x;
    this.lastY = y;
  };

  eraseDrawing = (x, y, size) => {
    this.ctx.beginPath();
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.arc(x, y, size * 2, 0, Math.PI * 3, true);
    this.ctx.fill();
    this.ctx.restore();
  };

  clearDrawing = () => {
    const { width, height } = this.state;
    this.ctx.clearRect(0, 0, width, height);
    this.hasDrawing = false;
    this.props.enableClearDrawingHandler(this.hasDrawing);
  };

  render() {
    let { width, height } = this.state;
    const { drawingToolOptions } = this.props;

    return (
      <canvas
        ref={(canvas) => {
          this.canvas = canvas;
        }}
        className={`canvas-style ${
          drawingToolOptions.tool === "pencil"
            ? "pencil-cursor " + drawingToolOptions.color
            : drawingToolOptions.tool === "eraser"
            ? "eraser-cursor"
            : null
        }`}
        width={width}
        height={height}
      />
    );
  }
}

DrawingWrapper.propTypes = {};

DrawingWrapper.defaultProps = {};

export default DrawingWrapper;
