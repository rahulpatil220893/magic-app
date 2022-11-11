import React from "react";
import Tooltip from "../Tooltip";
import { withTranslation } from "react-i18next";
import { isTablet } from "react-device-detect";
import data from "../../data";

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null,
      player: "stopped",
      currentTime: null,
      duration: null,
      audioType: "audio/mpeg",
    };
  }

  componentDidMount() {
    if (this.player) {
      this.player.addEventListener("timeupdate", (e) => {
        this.setState({
          currentTime: e.target.currentTime,
          duration: e.target.duration,
        });
      });
      this.player.addEventListener("ended", (e) => {
        this.setState({ player: "stopped" });
      });
    }
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }
  UNSAFE_componentWillReceiveProps(newprops) {
    if (
      newprops.currentTab !== this.props.currentTab ||
      newprops.currentSubTab !== this.props.currentSubTab
    ) {
      // if (this.props.audiosrc) {
      //   this.player.pause();
      //   //this.player.currentTime = 0;
      // }
      this.setState({
        selectedTrack: null,
        player: "stopped",
        currentTime: null,
        duration: null,
      });
    }
    if (newprops.audioStop != this.props.audioStop) {
      if (newprops.audioStop) {
        this.setState({
          selectedTrack: null,
          player: "stopped",
          currentTime: null,
          duration: null,
        });
        this.props.setAudioStop(false);
      }
    }
    if (this.props.defaultLang !== newprops.defaultLang) {
      this.setState({
        selectedTrack: null,
        player: "stopped",
        currentTime: null,
        duration: null,
      });
    }
    if (
      (newprops.currentTab == this.props.currentTab ||
        newprops.currentSubTab == this.props.currentSubTab ||
        newprops.audioOverlap !== this.props.audioOverlap) &&
      newprops.audioOverlap == true
    ) {
      this.setState({
        selectedTrack: null,
        player: "stopped",
        currentTime: null,
        duration: null,
      });
    }

    if (
      this.props.childPopup !== newprops.childPopup ||
      this.props.currentHotspotPopup !== newprops.currentHotspotPopup
    ) {
      if (
        this.state.player == "playing" ||
        this.state.player === "restart" ||
        this.state.player === null
      ) {
        this.setState({
          player: "paused",
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Lab 1":
          track = this.props.audiosrc;
          break;
        default:
          break;
      }
      if (track) {
        //const ext = this.isAudio(track);
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (this.state.player === "restart") {
        this.player.currentTime = 0;
        this.player.play();
        this.setState({ player: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

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

  playerSelector = () => {
    if (
      this.props.upadateAudioOverLap &&
      this.state.player !== "playing" &&
      this.state.player !== "paused" &&
      this.state.player !== "restart" &&
      this.state.player !== null
    ) {
      this.props.upadateAudioOverLap(true);
      setTimeout(() => {
        this.props.upadateAudioOverLap(false);
      }, 100);
    }
    setTimeout(() => {
      this.state.player !== "playing" &&
      this.state.player !== "restart" &&
      this.state.player !== null
        ? this.setState({ selectedTrack: "Lab 1", player: "playing" })
        : this.setState({ selectedTrack: "Lab 1", player: "paused" });
    });
  };

  getExtension = (filename) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };
  isAudio = (filename) => {
    let ext = this.getExtension(filename);
    let extType = "mpeg";
    switch (ext.toLowerCase()) {
      case "mp3":
        extType = "mpeg";
        break;
      case "wav":
        extType = "wav";
        break; // etc
    }
    return extType;
  };
  render() {
    const { t, isPopupActive, ariaHidden, disabled } = this.props;
    const {
      buttonsLabel: { pause, play, replay },
    } = data[this.props.i18n.language];
    const _isPopupActive = isPopupActive ? "-1" : null;

    return (
      <>
        <div className="vl-audio" aria-hidden={ariaHidden}>
          <button
            tabIndex={_isPopupActive}
            className={
              this.state.player !== "playing" &&
              this.state.player !== "restart" &&
              this.state.player !== null
                ? "vl-audio-play-icon"
                : "vl-audio-pause-icon"
            }
            disabled={disabled}
            aria-hidden={disabled}
            aria-label={
              this.state.player !== "playing" && this.state.player !== "restart"
                ? play
                : pause
            }
            onClick={() => this.playerSelector()}
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
            title={
              this.state.player !== "playing" && this.state.player !== "restart"
                ? play
                : pause
            }
            classes={
              this.state.player !== "playing" && this.state.player !== "restart"
                ? play
                : pause
            }
            position={"bottom"}
            id={
              this.state.player !== "playing" && this.state.player !== "restart"
                ? "audio-play" + "-tooltip"
                : "audio-pause" + "-tooltip"
            }
          />

          {this.state.player !== "stopped" && (
            <>
              <button
                tabIndex={_isPopupActive}
                id="audio_restart_icon"
                className="vl-audio-restart-icon"
                //title={replay}
                aria-label={replay}
                disabled={disabled}
                aria-hidden={disabled}
                onClick={() => this.setState({ player: "restart" })}
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
                title={replay}
                classes={replay}
                position={"bottom"}
                id={"audio-replay-tooltip"}
              />
            </>
          )}
        </div>
        <audio ref={(ref) => (this.player = ref)} />
      </>
    );
  }
}

export default withTranslation()(Audio);
