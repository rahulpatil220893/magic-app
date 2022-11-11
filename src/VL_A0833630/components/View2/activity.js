import React from "react";
import { t } from "i18next";

import AccessibleDnDList from "../../../app/components/AccessibleList";
// import { use } from "express/lib/application";
class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzones: [],
      hotSpotsVisited: [],
      hotSpotsVisited1: [],
      hotSpotsVisited2: [],
      tab1selected: false,
      tab2selected: false,
      tab3selected: false,
      tab21selected: false,
      tab22selected: false,
      tab23selected: false,
      tab31selected: false,
      tab32selected: false,
      tab33selected: false,
      tab34selected: false,
      tab35selected: false,
      tab36selected: false,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // if (this.props.currentHotspotPopup[0]) {
    //   const hotspot = document.querySelector(
    //     `#${this.props.currentHotspotPopup[0]}`
    //   );
    //   if (hotspot) hotspot.focus();
    // }
    console.log(newProps.currentHotspotPopup);
  }
  toggleHotspotPopupHandler = (index, lastOpenPopupId) => {
    const { toggleHotspotPopup, currentHotspotPopup, markCompletedActivity } =
      this.props;
    const { hotSpotsVisited } = this.state;
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
    if (!hotSpotsVisited.includes(index)) {
      this.setState(
        {
          hotSpotsVisited: [...this.state.hotSpotsVisited, index],
        },
        () => {
          if (this.state.hotSpotsVisited.length === 3) {
            markCompletedActivity(1, 0);
          }
        }
      );
    }
  };
  toggleHotspotPopupHandler1 = (index, lastOpenPopupId) => {
    const { toggleHotspotPopup, currentHotspotPopup, markCompletedActivity } =
      this.props;
    const { hotSpotsVisited1 } = this.state;
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
    if (!hotSpotsVisited1.includes(index)) {
      this.setState(
        {
          hotSpotsVisited1: [...this.state.hotSpotsVisited1, index],
        },
        () => {
          if (this.state.hotSpotsVisited1.length === 3) {
            markCompletedActivity(1, 1);
          }
        }
      );
    }
  };
  toggleHotspotPopupHandler2 = (index, lastOpenPopupId) => {
    const { toggleHotspotPopup, currentHotspotPopup, markCompletedActivity } =
      this.props;
    const { hotSpotsVisited2 } = this.state;
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
    if (!hotSpotsVisited2.includes(index)) {
      this.setState(
        {
          hotSpotsVisited2: [...this.state.hotSpotsVisited2, index],
        },
        () => {
          if (this.state.hotSpotsVisited2.length === 6) {
            markCompletedActivity(1, 2);
          }
        }
      );
    }
  };
  toolTipHide = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
  };

  toolTipShow = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
    if (document.querySelector("body").className != "no-outline") {
      if (div && div.classList != undefined) {
        div.classList.add("show");
        div.setAttribute("aria-hidden", false);
      }
    }
  };

  onKeyDown = (e, id) => {
    switch (e.which) {
      case 13:
        if (id == "hotspot01") {
          this.setState({
            tab1selected: true,
          });
        }
        if (id == "hotspot02") {
          this.setState({
            tab2selected: true,
          });
        }
        if (id == "hotspot03") {
          this.setState({
            tab3selected: true,
          });
        }
        if (id == "hotspot21") {
          this.setState({
            tab21selected: true,
          });
        }
        if (id == "hotspot22") {
          this.setState({
            tab22selected: true,
          });
        }
        if (id == "hotspot23") {
          this.setState({
            tab23selected: true,
          });
        }
        if (id == "hotspot31") {
          this.setState({
            tab31selected: true,
          });
        }
        if (id == "hotspot32") {
          this.setState({
            tab32selected: true,
          });
        }
        if (id == "hotspot33") {
          this.setState({
            tab33selected: true,
          });
        }
        if (id == "hotspot34") {
          this.setState({
            tab34selected: true,
          });
        }
        if (id == "hotspot35") {
          this.setState({
            tab35selected: true,
          });
        }
        if (id == "hotspot36") {
          this.setState({
            tab36selected: true,
          });
        }
        e.preventDefault();
        e.stopPropagation();
        this.props.updateFocusTooltip();
        this.toggleHotspotPopupHandler(id);
        this.toggleHotspotPopupHandler1(id);
        this.toggleHotspotPopupHandler2(id);
        break;
      default:
        break;
    }
  };
  // onKeyDown = (e, id) => {
  //   switch (e.which) {
  //     case 13:
  //       e.preventDefault();
  //       e.stopPropagation();
  //       this.props.updateFocusTooltip();
  //       this.toggleHotspotPopupHandler(id);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  render() {
    const {
      tab,
      currentSubTab,
      isPopupActive,
      currentLangData: {
        tab2,
        commonWords,
        hotSpotData,
        hotSpotData1,
        hotSpotData2,
      },
      currentHotspotPopup,
    } = this.props;
    // const circuitimage = tab == 2 ? "circuit_parts_img" : "circuit_img";
    const classN = `tab${tab}`;
    const _currentSubTab = currentSubTab + 1;
    return (
      <>
        <div
          className={`image-container`}
          role="img"
          aria-label={tab2[`slide${_currentSubTab}`]?.imgAlt}
        >
          {" "}
        </div>
        <div className={`vl-explore-activity-container ${classN}`}>
          {tab == 1 && (
            <>
              <div
                className="refimage1"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>

              <button
                className={`item-col hotspot hotspot01 hotspot01${
                  this.state.tab1selected ? "_active" : ""
                }`}
                onClick={() => {
                  this.setState({
                    tab1selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler("hotspot01");
                }}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot01");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                aria-label={`${hotSpotData[0].label} ${
                  currentHotspotPopup.includes("hotspot01")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited.includes("hotspot01")
                    ? "visited"
                    : ""
                }`}
                id="hotspot01"
              >
                <span>{hotSpotData[0].image}</span>
              </button>
              <div
                className="refimage2"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <button
                aria-label={`${hotSpotData[1].label} ${
                  currentHotspotPopup.includes("hotspot02")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited.includes("hotspot02")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot02 hotspot02${
                  this.state.tab2selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot02");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab2selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler("hotspot02");
                }}
                // id="hotspot02"
              >
                <span>{hotSpotData[1].image}</span>
              </button>

              <div
                className="refimage3"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <button
                aria-label={`${hotSpotData[2].label} ${
                  currentHotspotPopup.includes("hotspot03")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited.includes("hotspot03")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot03 hotspot03${
                  this.state.tab3selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot03");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab3selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler("hotspot03");
                }}
                // id="hotspot03"
              >
                <span>{hotSpotData[2].image}</span>
              </button>
            </>
          )}
          {tab == 2 && (
            <>
              <div
                className="refimage12"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage22"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage32"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <button
                className={`item-col hotspot hotspot21 hotspot21${
                  this.state.tab21selected ? "_active" : ""
                }`}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab21selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler1("hotspot21");
                }}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot21");
                }}
                aria-label={`${hotSpotData1[0].label} ${
                  currentHotspotPopup.includes("hotspot21")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited1.includes("hotspot21")
                    ? "visited"
                    : ""
                }`}
                // id="hotspot21"
              >
                <span>{hotSpotData1[0].image}</span>
              </button>
              <button
                aria-label={`${hotSpotData1[1].label} ${
                  currentHotspotPopup.includes("hotspot22")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited1.includes("hotspot22")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot22 hotspot22${
                  this.state.tab22selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot22");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab22selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler1("hotspot22");
                }}
                // id="hotspot22"
              >
                <span>{hotSpotData1[1].image}</span>
              </button>
              <button
                aria-label={`${hotSpotData1[2].label} ${
                  currentHotspotPopup.includes("hotspot23")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited1.includes("hotspot23")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot23 hotspot23${
                  this.state.tab23selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot23");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab23selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler1("hotspot23");
                }}
                // id="hotspot23"
              >
                <span>{hotSpotData1[2].image}</span>
              </button>
            </>
          )}
          {tab == 3 && (
            <>
              <div
                className="refimage13"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage23"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage33"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage43"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage53"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <div
                className="refimage63"
                role="img"
                tabIndex="-1"
                aria-hidden={true}
              ></div>
              <button
                className={`item-col hotspot hotspot31 hotspot31${
                  this.state.tab31selected ? "_active" : ""
                }`}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab31selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler2("hotspot31");
                }}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot31");
                }}
                aria-label={`${hotSpotData2[0].label} ${
                  currentHotspotPopup.includes("hotspot31")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited2.includes("hotspot31")
                    ? "visited"
                    : ""
                }`}
                id="hotspot31"
              >
                <span>{hotSpotData2[0].image}</span>
              </button>
              <button
                aria-label={`${hotSpotData2[1].label} ${
                  currentHotspotPopup.includes("hotspot32")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited2.includes("hotspot32")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot32 hotspot32${
                  this.state.tab32selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot32");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab32selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler2("hotspot32");
                }}
                id="hotspot32"
              >
                <span>{hotSpotData2[1].image}</span>
              </button>
              <button
                aria-label={`${hotSpotData2[2].label} ${
                  currentHotspotPopup.includes("hotspot33")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited2.includes("hotspot33")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot33 hotspot33${
                  this.state.tab33selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot33");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab33selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler2("hotspot33");
                }}
                id="hotspot33"
              >
                <span>{hotSpotData2[2].image}</span>
              </button>
              <button
                className={`item-col hotspot hotspot34 hotspot34${
                  this.state.tab34selected ? "_active" : ""
                }`}
                onClick={() => {
                  this.setState({
                    tab34selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler2("hotspot34");
                }}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot34");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                aria-label={`${hotSpotData2[3].label} ${
                  currentHotspotPopup.includes("hotspot34")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited2.includes("hotspot34")
                    ? "visited"
                    : ""
                }`}
                id="hotspot34"
              >
                <span>{hotSpotData2[3].image}</span>
              </button>
              <button
                aria-label={`${hotSpotData2[4].label} ${
                  currentHotspotPopup.includes("hotspot35")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited2.includes("hotspot35")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot35 hotspot35${
                  this.state.tab35selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot35");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab35selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler2("hotspot35");
                }}
                id="hotspot35"
              >
                <span>{hotSpotData2[4].image}</span>
              </button>
              <button
                aria-label={`${hotSpotData2[5].label} ${
                  currentHotspotPopup.includes("hotspot36")
                    ? commonWords.selected
                    : ""
                } ${
                  this.state.hotSpotsVisited2.includes("hotspot36")
                    ? "visited"
                    : ""
                }`}
                className={`item-col hotspot hotspot36 hotspot36${
                  this.state.tab36selected ? "_active" : ""
                }`}
                onKeyDown={(e) => {
                  return this.onKeyDown(e, "hotspot36");
                }}
                tabIndex={isPopupActive ? "-1" : null}
                onClick={() => {
                  this.setState({
                    tab36selected: true,
                  });
                  // this.toggleHotspotPopupHandler("hotspot01");
                  this.toggleHotspotPopupHandler2("hotspot36");
                }}
                id="hotspot36"
              >
                <span>{hotSpotData2[5].image}</span>
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Activity;
