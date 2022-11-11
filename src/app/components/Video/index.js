import React from "react";
import data from "../../data";
import { withTranslation } from "react-i18next";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      play: false,
      videoType: "video/mp4",
    };
  }

  timeupdate = (e) => {
    this.setState({
      currentTime: e.target.currentTime,
      seeking: e.target.seeking,
    });
  };

  componentDidMount() {
    if (this.player) {
      const { src, autoplay, muted = false } = this.props;
      this.player.src = src;
      this.player.muted = muted;
      this.player.load();
      if (src) {
        const ext = this.isVideo(src);
        this.setState({ videoType: `video/${ext}` });
      }
      if (autoplay) {
        this.playVideo();
      }
      this.player.addEventListener("timeupdate", this.timeupdate);
      this.player.addEventListener("canplay", (e) => {
        if (this.props.videoLoaded) {
          this.props.videoLoaded();
        }
      });
      this.player.addEventListener("ended", (e) => {
        if (this.props.videoEnded) {
          this.props.videoEnded();
        }
        this.setState({ currentTime: 0, play: false });
        if (this.props.videoCallback) {
          this.props.videoCallback();
        }
      });
    }
  }
  getExtension = (filename) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };
  isVideo = (filename) => {
    let ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case "m4v":
      case "avi":
      case "mpg":
      case "mp4":
        // etc
        return ext;
    }
  };

  componentWillUnmount() {
    this.player.pause();
    this.player.removeEventListener("timeupdate", this.timeupdate);
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    if (
      newprops.currentTab !== this.props.currentTab ||
      newprops.currentSubTab !== this.props.currentSubTab ||
      newprops.currentHotspotPopup !== this.props.currentHotspotPopup
    ) {
    }
  }
  playVideo = () => {
    const { play, currentTime } = this.state;
    const { src, updateAriaLiveText, ariaLabel } = this.props;

    if (!play) {
      // this.player.src = src;
      const { ariaLabel } = this.props;
      if (currentTime) {
        this.player.currentTime = currentTime;
      }
      if (ariaLabel) {
        updateAriaLiveText(ariaLabel);
      }

      this.player.play();
    } else {
      // this.updateLiveText("Video paused");
      this.player.pause();
    }
    this.setState({ play: !play });
    if (this.props.videoPlayed) {
      this.props.videoPlayed(!play);
    }
  };

  updateLiveText = (altText) => {
    const { updateAriaLiveText, altTimeOut } = this.props;
    let timeout = altTimeOut ? altTimeOut : 500;
    if (updateAriaLiveText) {
      updateAriaLiveText(altText);
      setTimeout(() => {
        updateAriaLiveText(" ");
      }, timeout);
    }
  };

  render() {
    const { play, videoType } = this.state;
    const { hidePlayBtn, posterImg, ariaLabel } = this.props;
    const {
      buttonsLabel: { playVideo, pauseVideo },
    } = data[this.props.i18n.language];
    return (
      <>
        <div className={`video-container ${play ? "play-state" : ""}`}>
          <video
            ref={(ref) => (this.player = ref)}
            type={videoType}
            preload="auto"
            poster={posterImg ? posterImg : ""}
            aria-label={ariaLabel ? ariaLabel : "Video section"}
          />
          <button
            className={`play-icon ${!play ? "play" : "pause"} ${
              hidePlayBtn ? "hide" : ""
            }`}
            title={!play ? playVideo : pauseVideo}
            aria-label={!play ? playVideo : pauseVideo}
            onClick={() => {
              this.playVideo();
            }}
          >
            <span
              className="videoicon-play play-center"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </>
    );
  }
}

export default withTranslation()(Video);
