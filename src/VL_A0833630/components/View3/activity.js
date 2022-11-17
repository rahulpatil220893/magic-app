import React, { useEffect, useRef, useState } from "react";
// import RocketAnimaton from "./RocketAnimation";
import AccessibleDnDList from "../../../app/components/AccessibleList";
import { t } from "i18next";
import { isSafari, isTablet, isMacOs } from "react-device-detect";
import Tooltip from "../../../app/components/Tooltip";
import AccessibleList from "../../../app/components/AccessibleList";
const Activity = (props) => {
  const {
    draggableImg,
    deleteActiveElements,
    resetDrop,
    commonDropZone,
    updateAriaLiveText,
    scale,
    thisback,
    imgAlt,
    imgAlt1,
    imgAlt2,
    tab,
    defaultImg,
    currentLangData: {
      buttonsLable,
      tab2,
      commonWords,
      hotSpotData31,
      hotSpotData32,
      hotSpotData33,
      numbers,
      tab3,
    },
    currentTab,
    currentSubTab,
    currentHotspotPopup,
    toggleHotspotPopup,
    markCompletedActivity,
    updateFocusTooltip,
    buttontext,
    reset,
  } = props;
  const [a11yDnD, setA11yDnD] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [droppedItems, setDroppedItems] = useState([]);
  const [droppedItems2, setDroppedItems2] = useState([]);
  const [droppedItems3, setDroppedItems3] = useState([]);
  const [dropZone, seDropZone] = useState(commonDropZone);
  const [noofdata, setnoofdata] = useState([]);
  const [hotSpotsVisited, setHotSpotsVisited] = useState([]);
  const [show, setshow] = useState(true);
  const [settest, setsettest] = useState(true);
  const [clearafter2, setclearafter2] = useState(false);
  const [showanswer, setshowanswer] = useState(false);
  const [showfinalize, setshowfinalize] = useState(true);
  const [buttonClicked, setbuttonClicked] = useState(0);
  const dragRef = useRef(null);
  const activeItemRef = useRef(null);
  const [altText, setAltText] = useState(defaultImg);
  const [altText1, setAltText1] = useState(defaultImg);
  const [altText2, setAltText2] = useState(defaultImg);
  useEffect(() => {
    if (deleteActiveElements) {
      setDroppedItems([]);
    }
    if (deleteActiveElements) {
      setDroppedItems2([]);
    }
    if (deleteActiveElements) {
      setDroppedItems3([]);
    }
    props.deleteelements1();
  }, [deleteActiveElements]);
  useEffect(
    () => {
      if (droppedItems.length >= 3) {
        $(`#drag1`).addClass("disabledraggable");
        $(`#drag2`).addClass("disabledraggable");
        $(`#drag3`).addClass("disabledraggable");
        $(`#drag4`).addClass("disabledraggable");
        $(`#drag5`).addClass("disabledraggable");
        $(`#drag6`).addClass("disabledraggable");
      }
      if (droppedItems2.length >= 3) {
        $(`#drag11`).addClass("disabledraggable");
        $(`#drag12`).addClass("disabledraggable");
        $(`#drag13`).addClass("disabledraggable");
        $(`#drag14`).addClass("disabledraggable");
        $(`#drag15`).addClass("disabledraggable");
        $(`#drag16`).addClass("disabledraggable");
      }
      if (droppedItems3.length >= 3) {
        $(`#drag21`).addClass("disabledraggable");
        $(`#drag22`).addClass("disabledraggable");
        $(`#drag23`).addClass("disabledraggable");
        $(`#drag24`).addClass("disabledraggable");
        $(`#drag25`).addClass("disabledraggable");
        $(`#drag26`).addClass("disabledraggable");
      }
    },
    [droppedItems],
    [droppedItems2],
    [droppedItems3]
  );
  useEffect(() => {
    const selectedCombination = droppedItems.map((d) => d.source);
    const selectedCombination2 = droppedItems2.map((d) => d.source);
    const selectedCombination3 = droppedItems3.map((d) => d.source);

    if (droppedItems.length === 3 && currentSubTab === 0) {
      if (
        selectedCombination.every((e) => ["pasque", "dall", "pika"].includes(e))
      ) {
        setshowanswer(true);
      } else {
        setshowanswer(false);
      }
    }
    if (droppedItems2.length === 3 && currentSubTab === 1) {
      if (
        selectedCombination2.every((e) =>
          ["harris2", "ocotillo", "spiny"].includes(e)
        )
      ) {
        setshowanswer(true);
      } else {
        setshowanswer(false);
      }
    }
    if (droppedItems3.length === 3 && currentSubTab === 2) {
      if (
        selectedCombination3.every((e) =>
          ["capybara3", "monkey3", "zebra3"].includes(e)
        )
      ) {
        setshowanswer(true);
      } else {
        setshowanswer(false);
      }
    }
  });

  useEffect(() => {
    if (currentHotspotPopup.length == 1) {
      setbuttonClicked(1);
    }
    if (droppedItems.length === 3 && currentSubTab === 0) {
      if (currentHotspotPopup.length == 0 && buttonClicked == 1) {
        const items = droppedItems.filter((d) =>
          ["pasque", "dall", "pika"].includes(d.source)
        );
        setDroppedItems(items);
        // droppedItems.forEach((d, index) => {
        //   // if (!["pasque", "dall", "pika"].includes(d.source)) {
        //   //   droppedItems.splice(index, 1);
        //   // }
        // });
        setbuttonClicked(0);
        setshowfinalize(true);
      }
    }
    if (droppedItems2.length === 3 && currentSubTab === 1) {
      if (currentHotspotPopup.length == 0 && buttonClicked == 1) {
        const items2 = droppedItems2.filter((d) =>
          ["harris2", "ocotillo", "spiny"].includes(d.source)
        );
        setDroppedItems2(items2);
        // droppedItems2.forEach((d, index) => {
        //   if (!["harris2", "ocotillo", "spiny"].includes(d.source)) {
        //     droppedItems2.splice(index, 1);
        //   }
        // });
        setbuttonClicked(0);
        setshowfinalize(true);
      }
    }
    if (droppedItems3.length === 3 && currentSubTab === 2) {
      if (currentHotspotPopup.length == 0 && buttonClicked == 1) {
        const items3 = droppedItems3.filter((d) =>
          ["capybara3", "monkey3", "zebra3"].includes(d.source)
        );
        setDroppedItems3(items3);
        // droppedItems3.forEach((d, index) => {
        //   if (!["capybara3", "monkey3", "zebra3"].includes(d.source)) {
        //     droppedItems3.splice(index, 1);
        //   }
        // });
        setbuttonClicked(0);
        setshowfinalize(true);
      }
    }
  }, [currentHotspotPopup, buttonClicked]);

  const toggleHotspotPopupHandler = (index) => {
    const selectedCombination = droppedItems.map((d) => d.source);
    const selectedCombination2 = droppedItems2.map((d) => d.source);
    const selectedCombination3 = droppedItems3.map((d) => d.source);
    if (droppedItems.length === 3 && currentSubTab === 0) {
      if (
        selectedCombination.every((e) => ["pasque", "dall", "pika"].includes(e))
      ) {
        props.markCompletedActivity(2, 0);
      }
    }
    if (droppedItems2.length === 3 && currentSubTab === 1) {
      if (
        selectedCombination2.every((e) =>
          ["harris2", "ocotillo", "spiny"].includes(e)
        )
      ) {
        props.markCompletedActivity(2, 1);
      }
    }
    if (droppedItems3.length === 3 && currentSubTab === 2) {
      if (
        selectedCombination3.every((e) =>
          ["capybara3", "monkey3", "zebra3"].includes(e)
        )
      ) {
        props.markCompletedActivity(2, 2);
      }
    }
    if (index === "hotspot11") {
      setsettest(false);
    }
    if (index === "hotspot210") {
      setsettest(false);
    }
    const { toggleHotspotPopup, currentHotspotPopup, markCompletedActivity } =
      props;
    currentHotspotPopup.includes(index) ||
      toggleHotspotPopup([...currentHotspotPopup, index]);
    if (!hotSpotsVisited.includes(index)) {
      setHotSpotsVisited([...hotSpotsVisited, index]);
    }
  };
  const toolTipHide = (e) => {
    const div = e.currentTarget.nextSibling;
    if (div && div.classList != undefined) {
      div.classList.remove("show");
      div.setAttribute("aria-hidden", true);
    }
  };
  const toolTipShow = (e) => {
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

  const onKeyDown = (e, id) => {
    switch (e.which) {
      case 13:
        e.preventDefault();
        e.stopPropagation();
        updateFocusTooltip();
        toggleHotspotPopupHandler(id);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    let local = droppedItems;

    if (dragRef.current) {
      const draggables = dragRef.current.querySelectorAll(".draggable");
      const droppable = dragRef.current.querySelector(".dropzone");
      $(draggables).draggable({
        helper: "clone",
        containment: "#dropzone" + thisback,
        start: (e, ui) => {
          const { source, label, id } = e.target.dataset;
          setActiveItem({ source, label });
          activeItemRef.current = { source, label };
          if (id.includes("drag")) {
            document.getElementById(`${id}`).style.zIndex = 50;
          }
        },
        stop: (e, ui) => {
          const { id } = e.target.dataset;
          if (id.includes("drag")) {
            document.getElementById(`${id}`).style.zIndex = 10;
          }
        },
      });
      $(droppable).droppable({
        tolerance: "intersect",
        drop: (e, ui) => {
          props.markCompletedActivity(1, 0);
          const { source, label, id } = ui.draggable[0].dataset;
          const { top, left } = dragRef.current.getBoundingClientRect();
          if (ui.draggable[0].dataset.id.includes("drag")) {
            {
              (ui.offset.top - top) / scale < 267 &&
                $(`#${id}`).addClass("disabledraggable");
              $(`#${id}`).find("button").attr("disabled", true);
            }
          } else {
            var numbers = [];

            let a = document.getElementById(ui.draggable[0].dataset.id).style
              .zIndex;
            a = a + 1;
            document.getElementById(
              ui.draggable[0].dataset.id
            ).style.zIndex = `${a}`;
            //slide1
            if (document.getElementById("hariss") != null) {
              numbers.push(
                Number(document.getElementById("hariss").style.zIndex)
              );
            }
            if (document.getElementById("dall") != null) {
              numbers.push(
                Number(document.getElementById("dall").style.zIndex)
              );
            }
            if (document.getElementById("monkey") != null) {
              numbers.push(
                Number(document.getElementById("monkey").style.zIndex)
              );
            }
            if (document.getElementById("pika") != null) {
              numbers.push(
                Number(document.getElementById("pika").style.zIndex)
              );
            }
            if (document.getElementById("pasque") != null) {
              numbers.push(
                Number(document.getElementById("pasque").style.zIndex)
              );
            }
            if (document.getElementById("zebra") != null) {
              numbers.push(
                Number(document.getElementById("zebra").style.zIndex)
              );
            }
            //slide2
            if (document.getElementById("capybara") != null) {
              numbers.push(
                Number(document.getElementById("capybara").style.zIndex)
              );
            }
            if (document.getElementById("pika2") != null) {
              numbers.push(
                Number(document.getElementById("pika2").style.zIndex)
              );
            }
            if (document.getElementById("harris2") != null) {
              numbers.push(
                Number(document.getElementById("harris2").style.zIndex)
              );
            }
            if (document.getElementById("spiny") != null) {
              numbers.push(
                Number(document.getElementById("spiny").style.zIndex)
              );
            }
            if (document.getElementById("ocotillo") != null) {
              numbers.push(
                Number(document.getElementById("ocotillo").style.zIndex)
              );
            }
            if (document.getElementById("pasque2") != null) {
              numbers.push(
                Number(document.getElementById("pasque2").style.zIndex)
              );
            }
            //slide3
            if (document.getElementById("capybara3") != null) {
              numbers.push(
                Number(document.getElementById("capybara3").style.zIndex)
              );
            }
            if (document.getElementById("dall3") != null) {
              numbers.push(
                Number(document.getElementById("dall3").style.zIndex)
              );
            }
            if (document.getElementById("spiny3") != null) {
              numbers.push(
                Number(document.getElementById("spiny3").style.zIndex)
              );
            }
            if (document.getElementById("monkey3") != null) {
              numbers.push(
                Number(document.getElementById("monkey3").style.zIndex)
              );
            }
            if (document.getElementById("ocotillo3") != null) {
              numbers.push(
                Number(document.getElementById("ocotillo3").style.zIndex)
              );
            }
            if (document.getElementById("zebra3") != null) {
              numbers.push(
                Number(document.getElementById("zebra3").style.zIndex)
              );
            }

            a = Math.max(...numbers) + 15;

            document.getElementById(
              ui.draggable[0].dataset.id
            ).style.zIndex = `${a}`;
          }

          if (
            activeItemRef &&
            activeItemRef.current &&
            activeItemRef.current.source
          ) {
            const { top, left } = dragRef.current.getBoundingClientRect();
            var leftvalue;
            const position = {
              top: (ui.offset.top - top) / scale,
              left: (ui.offset.left - left) / scale,
            };
            const temp = { ...activeItemRef.current };
            temp.position = { ...position };

            {
              (ui.offset.top - top) / scale < 267 &&
                setDroppedItems((items) => [...items, { ...temp }]);
            }
            {
              (ui.offset.top - top) / scale < 267 &&
                setDroppedItems2((items) => [...items, { ...temp }]);
            }
            {
              (ui.offset.top - top) / scale < 267 &&
                setDroppedItems3((items) => [...items, { ...temp }]);
            }
            activeItemRef.current = null;
            resetDrop();
          }
        },
      });
    }
  }, [scale, currentSubTab, droppedItems, droppedItems2, droppedItems3]);
  useEffect(
    () => {
      if (dragRef.current) {
        const items = dragRef.current.querySelectorAll(".dropped-item");
        for (let item of items) {
          if (!item.classList.contains("ui-draggable")) {
            $(item).draggable({
              containment: "#discover-container" + thisback,
            });
          }
        }
      }
    },
    [droppedItems],
    [droppedItems2],
    [droppedItems3]
  );

  useEffect(() => {
    if (!a11yDnD && Object.keys(activeItem).length) {
      const drag = draggableImg.filter((e) => e.label == activeItem.label);
      if (drag.length != 0) {
        updateAriaLiveText(`${drag[0].liveText} ${commonDropZone[0].liveText}`);
      }
    }
  }, [a11yDnD, activeItem]);

  // dynamic text
  useEffect(() => {
    if (droppedItems.length !== 0) {
      let text = imgAlt;
      let innerText = "";
      let countText = 0;
      const dropped = draggableImg.filter((o1) =>
        droppedItems.some((o2) => o1.source === o2.source)
      );
      if (dropped.length == 1) {
        text = text.replace("-1-", dropped[0].labelAlt + " ");
      } else {
        dropped.map((altText) => {
          countText++;
          if (countText < dropped.length) {
            innerText =
              innerText + " " + altText.labelAlt + " " + tab3.slide1.andAltText;
          } else {
            innerText = innerText + " " + altText.labelAlt;
          }
        });
        text = text.replace("-1-", innerText + " ");
      }
      setAltText(text);
    } else {
      setAltText(defaultImg);
    }
  });
  // dynamic text subtab2
  useEffect(() => {
    if (droppedItems2.length !== 0) {
      let text = imgAlt;
      let innerText = "";
      let countText = 0;
      const dropped = draggableImg.filter((o1) =>
        droppedItems2.some((o2) => o1.source === o2.source)
      );
      if (dropped.length == 1) {
        text = text.replace("-1-", dropped[0].labelAlt + " ");
      } else {
        dropped.map((altText) => {
          countText++;
          if (countText < dropped.length) {
            innerText =
              innerText + " " + altText.labelAlt + " " + tab3.slide1.andAltText;
          } else {
            innerText = innerText + " " + altText.labelAlt;
          }
        });
        text = text.replace("-1-", innerText + " ");
      }
      setAltText1(text);
    } else {
      setAltText1(defaultImg);
    }
  });
  // dynamic text subtab3
  useEffect(() => {
    if (droppedItems3.length !== 0) {
      let text = imgAlt;
      let innerText = "";
      let countText = 0;
      const dropped = draggableImg.filter((o1) =>
        droppedItems3.some((o2) => o1.source === o2.source)
      );
      if (dropped.length == 1) {
        text = text.replace("-1-", dropped[0].labelAlt + " ");
      } else {
        dropped.map((altText) => {
          countText++;
          if (countText < dropped.length) {
            innerText =
              innerText + " " + altText.labelAlt + " " + tab3.slide1.andAltText;
          } else {
            innerText = innerText + " " + altText.labelAlt;
          }
        });
        text = text.replace("-1-", innerText + " ");
      }
      setAltText2(text);
    } else {
      setAltText2(defaultImg);
    }
  });
  const onA11yDrop = (e) => {
    const temp = { ...activeItemRef.current };
    if (droppedItems.length === 2 && currentSubTab === 0) {
      $(`#drag1`).find("button").attr("disabled", true);
      $(`#drag2`).find("button").attr("disabled", true);
      $(`#drag3`).find("button").attr("disabled", true);
      $(`#drag4`).find("button").attr("disabled", true);
      $(`#drag5`).find("button").attr("disabled", true);
      $(`#drag6`).find("button").attr("disabled", true);
    }
    if (droppedItems2.length === 2 && currentSubTab === 1) {
      $(`#drag11`).find("button").attr("disabled", true);
      $(`#drag12`).find("button").attr("disabled", true);
      $(`#drag13`).find("button").attr("disabled", true);
      $(`#drag14`).find("button").attr("disabled", true);
      $(`#drag15`).find("button").attr("disabled", true);
      $(`#drag16`).find("button").attr("disabled", true);
    }
    if (droppedItems3.length === 2 && currentSubTab === 2) {
      $(`#drag21`).find("button").attr("disabled", true);
      $(`#drag22`).find("button").attr("disabled", true);
      $(`#drag23`).find("button").attr("disabled", true);
      $(`#drag24`).find("button").attr("disabled", true);
      $(`#drag25`).find("button").attr("disabled", true);
      $(`#drag26`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag1") {
      temp.position = { top: 10, left: 280 };
      $(`#drag1`).addClass("disabledraggable");
      $(`#drag1`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag2") {
      temp.position = { top: 238, left: 125 };
      $(`#drag2`).addClass("disabledraggable");
      $(`#drag2`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag3") {
      temp.position = { top: 178, left: 100 };
      $(`#drag3`).addClass("disabledraggable");
      $(`#drag3`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag4") {
      temp.position = { top: 238, left: 270 };
      $(`#drag4`).addClass("disabledraggable");
      $(`#drag4`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag5") {
      temp.position = { top: 178, left: 150 };
      $(`#drag5`).addClass("disabledraggable");
      $(`#drag5`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag6") {
      temp.position = { top: 238, left: 200 };
      $(`#drag6`).addClass("disabledraggable");
      $(`#drag6`).find("button").attr("disabled", true);
    }
    //slide2
    if (temp.id == "drag11") {
      temp.position = { top: 10, left: 280 };
      $(`#drag11`).addClass("disabledraggable");
      $(`#drag11`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag12") {
      temp.position = { top: 238, left: 125 };
      $(`#drag12`).addClass("disabledraggable");
      $(`#drag12`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag13") {
      temp.position = { top: 178, left: 100 };
      $(`#drag13`).addClass("disabledraggable");
      $(`#drag13`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag14") {
      temp.position = { top: 238, left: 270 };
      $(`#drag14`).addClass("disabledraggable");
      $(`#drag14`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag15") {
      temp.position = { top: 178, left: 100 };
      $(`#drag15`).addClass("disabledraggable");
      $(`#drag15`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag16") {
      temp.position = { top: 238, left: 270 };
      $(`#drag16`).addClass("disabledraggable");
      $(`#drag16`).find("button").attr("disabled", true);
    }
    //slide3
    if (temp.id == "drag21") {
      temp.position = { top: 10, left: 280 };
      $(`#drag21`).addClass("disabledraggable");
      $(`#drag21`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag22") {
      temp.position = { top: 238, left: 125 };
      $(`#drag22`).addClass("disabledraggable");
      $(`#drag22`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag23") {
      temp.position = { top: 178, left: 100 };
      $(`#drag23`).addClass("disabledraggable");
      $(`#drag23`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag24") {
      temp.position = { top: 238, left: 270 };
      $(`#drag24`).addClass("disabledraggable");
      $(`#drag24`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag25") {
      temp.position = { top: 178, left: 100 };
      $(`#drag25`).addClass("disabledraggable");
      $(`#drag25`).find("button").attr("disabled", true);
    }
    if (temp.id == "drag26") {
      temp.position = { top: 238, left: 270 };
      $(`#drag26`).addClass("disabledraggable");
      $(`#drag26`).find("button").attr("disabled", true);
    }
    if (droppedItems.length == 0) {
      temp.position = { top: 160, left: 160 };
    } else if (droppedItems.length == 1) {
      temp.position = { top: 160, left: 395 };
    } else {
      temp.position = { top: 160, left: 620 };
    }
    if (droppedItems2.length == 0) {
      temp.position = { top: 160, left: 160 };
    } else if (droppedItems2.length == 1) {
      temp.position = { top: 160, left: 395 };
    } else {
      temp.position = { top: 160, left: 620 };
    }
    if (droppedItems3.length == 0) {
      temp.position = { top: 160, left: 160 };
    } else if (droppedItems3.length == 1) {
      temp.position = { top: 160, left: 395 };
    } else {
      temp.position = { top: 160, left: 620 };
    }
    props.markCompletedActivity(3, 0);
    setDroppedItems((items) => [...items, { ...temp }]);
    setDroppedItems2((items) => [...items, { ...temp }]);
    setDroppedItems3((items) => [...items, { ...temp }]);

    resetDrop();
    setTimeout(() => {}, 1000);
    activeItemRef.current = null;
    setA11yDnD(false);
  };
  const resetall = () => {
    toggleHotspotPopupHandler(hotSpotData31);
    props.resetHandler1();
    setsettest(true);
    setshowfinalize(true);
    // slide1
    //buttons
    $(`#drag1`).find("button").attr("disabled", false);
    $(`#drag2`).find("button").attr("disabled", false);
    $(`#drag3`).find("button").attr("disabled", false);
    $(`#drag4`).find("button").attr("disabled", false);
    $(`#drag5`).find("button").attr("disabled", false);
    $(`#drag6`).find("button").attr("disabled", false);
    //images clear
    // $(`div`).remove(".dropped-item");
    $(`#drag1`).removeClass("disabledraggable");
    $(`#drag2`).removeClass("disabledraggable");
    $(`#drag3`).removeClass("disabledraggable");
    $(`#drag4`).removeClass("disabledraggable");
    $(`#drag5`).removeClass("disabledraggable");
    $(`#drag6`).removeClass("disabledraggable");
    // $(".hariss").remove();
    // $(".dall").remove();
    // $(".monkey").remove();
    // $(".pika").remove();
    // $(".pasque").remove();
    // $(".zebra").remove();
    updateAriaLiveText(tab3.resetLiveText);
  };
  const resetall1 = () => {
    toggleHotspotPopupHandler(hotSpotData32);
    setsettest(true);
    props.resetHandler2();
    updateAriaLiveText(tab3.resetLiveText);
    setshowfinalize(true);
    // slide2
    //buttons
    $(`#drag11`).find("button").attr("disabled", false);
    $(`#drag12`).find("button").attr("disabled", false);
    $(`#drag13`).find("button").attr("disabled", false);
    $(`#drag14`).find("button").attr("disabled", false);
    $(`#drag15`).find("button").attr("disabled", false);
    $(`#drag16`).find("button").attr("disabled", false);
    //images clear
    // $(`div`).remove(".dropped-item");
    $(`#drag11`).removeClass("disabledraggable");
    $(`#drag12`).removeClass("disabledraggable");
    $(`#drag13`).removeClass("disabledraggable");
    $(`#drag14`).removeClass("disabledraggable");
    $(`#drag15`).removeClass("disabledraggable");
    $(`#drag16`).removeClass("disabledraggable");
    // setclearafter2(false)
    $(".capybara").remove();
    $(".pika2").remove();
    $(".harris2").remove();
    $(".spiny").remove();
    $(".ocotillo").remove();
    $(".pasque2").remove();
  };
  const resetall2 = () => {
    toggleHotspotPopupHandler(hotSpotData33);
    setsettest(true);
    props.resetHandler3();
    setshowfinalize(true);
    updateAriaLiveText(tab3.resetLiveText);
    // slide2
    //buttons
    $(`#drag21`).find("button").attr("disabled", false);
    $(`#drag22`).find("button").attr("disabled", false);
    $(`#drag23`).find("button").attr("disabled", false);
    $(`#drag24`).find("button").attr("disabled", false);
    $(`#drag25`).find("button").attr("disabled", false);
    $(`#drag26`).find("button").attr("disabled", false);
    //images clear
    // $(`div`).remove(".dropped-item");
    $(`#drag21`).removeClass("disabledraggable");
    $(`#drag22`).removeClass("disabledraggable");
    $(`#drag23`).removeClass("disabledraggable");
    $(`#drag24`).removeClass("disabledraggable");
    $(`#drag25`).removeClass("disabledraggable");
    $(`#drag26`).removeClass("disabledraggable");
    $(".capybara3").remove();
    $(".dall3").remove();
    $(".monkey3").remove();
    $(".spiny3").remove();
    $(".ocotillo3").remove();
    $(".zebra3").remove();
  };
  // console.log(altText, droppedItems);
  return (
    <div className="dnd-wrapper" ref={dragRef}>
      {currentSubTab == 0 && (
        <>
          <div
            id={`discover-container${thisback}`}
            className={`droppable-container`}
            // role="img"
          >
            <div id={`dropzone${thisback}`} className="dropzone"></div>
            <div role="img" className="sr-image"></div>
            <div role="img" className="sr-image" aria-label={altText}></div>
            <AccessibleList
              list={dropZone}
              opened={a11yDnD}
              onClick={onA11yDrop}
              closeList={() => {
                setA11yDnD(false);
              }}
              // label={props.dropzone.label}
            />
            {droppedItems.length > 0 &&
              droppedItems.map((item, index) => {
                let curentvalofdrag = 0;
                let array = [];
                if (droppedItems.length === 1 && item.count == 1) {
                  curentvalofdrag = 0.9;
                }
                if (droppedItems.length === 2 && item.count == 1) {
                  curentvalofdrag = 0.3;
                }

                const label = draggableImg.filter(
                  (e) => e.source == item.source
                );
                return item.position.top < 267 ? (
                  <div
                    aria-hidden="true"
                    data-source={item.source}
                    data-id={item.label.toString().toLowerCase()}
                    id={item.label.toString().toLowerCase()}
                    key={`subTab0-${index}`}
                    data-prevent-drop
                    style={{
                      top: `${item.position.top - 8}px`,
                      left: `${item.position.left - 118}px`,
                    }}
                    aria-label={item.label}
                    className={`dropped-item drag-item ${item.id}`}
                  >
                    <div className={item.label} />
                  </div>
                ) : null;
              })}
          </div>

          {/* the draggable images and button are here */}
          <div className="white-board">
            <div className="drag-container">
              {draggableImg.map((image) => {
                const droppedItemsLabels = droppedItems.map((i) => i.label);
                return (
                  <div
                    className={`drag-item ${image.id} ${
                      droppedItemsLabels.length == 3 ||
                      droppedItemsLabels.includes(image.label)
                        ? "disabledraggable"
                        : ""
                    }`}
                    id={image.id}
                    key={`draggable-${image.id}`}
                  >
                    <button
                      aria-label={image.a11ylabel}
                      data-source={image.label}
                      data-label={image.label}
                      className="accessible-btn"
                      data-id={image.id}
                      onClick={(e) => {
                        const { source, label, id } = e.target.dataset;
                        setActiveItem({ source, label });
                        activeItemRef.current = { source, label, id };
                        setA11yDnD(true);
                      }}
                    ></button>
                    <div
                      className={`draggable`}
                      data-label={image.label}
                      data-source={image.source}
                      data-id={image.id}
                      tabIndex="-1"
                      aria-hidden="true"
                      onClick={(e) => {
                        const source = image.source;
                        const label = image.label;
                        const id = image.id;

                        setActiveItem({ source, label });
                        activeItemRef.current = { source, label, id };
                        setA11yDnD(true);
                      }}
                    >
                      <img
                        src={image.imgSrc}
                        aria-hidden
                        alt={image.a11ylabel}
                      />
                      {/* <p>{image.text}</p> */}
                    </div>
                  </div>
                );
                // till here
              })}
            </div>
            <div className="draggable-text">
              {draggableImg.map((image, index) => {
                return (
                  <div
                    style={{ zIndex: "auto" }}
                    className={`text-name imgname${image.text}`}
                    aria-hidden="true"
                    key={`img-text${index}`}
                  >
                    {image.text}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="buttons">
            {showanswer ? (
              <button
                disabled={
                  droppedItems.length == 3 && showfinalize ? false : true
                }
                className={`btn1 item-col hotspot hotspot11${
                  !currentHotspotPopup.includes("hotspot11") ? "" : "_active"
                }`}
                onClick={() => {
                  setshowfinalize(false);
                  toggleHotspotPopupHandler("hotspot11");
                }}
                onKeyDown={(e) => {
                  return onKeyDown(e, "hotspot11");
                }}
                aria-label={`${hotSpotData31[0].label} ${
                  currentHotspotPopup.includes("hotspot11")
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes("hotspot11") ? "visited" : ""}`}
              >
                {buttontext.button1}
              </button>
            ) : (
              <button
                disabled={
                  droppedItems.length == 3 && showfinalize ? false : true
                }
                className={`btn1 item-col hotspot hotspot12${
                  !currentHotspotPopup.includes("hotspot12") ? "" : "_active"
                }`}
                onClick={() => {
                  setshowfinalize(false);
                  toggleHotspotPopupHandler("hotspot12");
                }}
                onKeyDown={(e) => {
                  return onKeyDown(e, "hotspot12");
                }}
                // tabIndex={isPopupActive ? "-1" : null}
                aria-label={`${hotSpotData31[0].label} ${
                  currentHotspotPopup.includes("hotspot12")
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes("hotspot12") ? "visited" : ""}`}
              >
                {buttontext.button1}
              </button>
            )}
            <button
              className={`reset`}
              onClick={resetall}
              aria-label={`Reset`}
              disabled={droppedItems.length > 0 ? false : true}
            >
              {/* <i className="fa fa-rotate-right" aria-hidden="true"></i> */}
              <span className="btn_text btn_reset">{buttontext.button3}</span>
            </button>
          </div>
        </>
      )}
      {currentSubTab == 1 && (
        <>
          <div
            id={`discover-container${thisback}`}
            className={`droppable-container`}
            // role="img"
          >
            <div id={`dropzone${thisback}`} className="dropzone"></div>
            <div role="img" className="sr-image"></div>
            <div role="img" className="sr-image" aria-label={altText1}></div>
            <AccessibleList
              list={dropZone}
              opened={a11yDnD}
              onClick={onA11yDrop}
              closeList={() => {
                setA11yDnD(false);
              }}
              // label={props.dropzone.label}
            />
            {droppedItems2.map((item, index) => {
              const label = draggableImg.filter((e) => e.source == item.source);
              return (
                <div
                  aria-hidden="true"
                  data-source={item.source}
                  data-id={item.label.toString().toLowerCase()}
                  id={item.label.toString().toLowerCase()}
                  key={`subTab1${index}`}
                  data-prevent-drop
                  style={{
                    top: `${item.position.top - 12}px`,
                    left: `${item.position.left - 118}px`,
                  }}
                  aria-label={item.label}
                  className={`dropped-item drag-item ${item.id}`}
                >
                  <div className={item.label} />
                </div>
              );
            })}
          </div>
          <div className="white-board">
            <div className="drag-container">
              {draggableImg.map((image) => {
                const droppedItems2Labels = droppedItems2.map((i) => i.label);
                return (
                  <div
                    className={`drag-item ${image.id} ${
                      droppedItems2Labels.length == 3 ||
                      droppedItems2Labels.includes(image.label)
                        ? "disabledraggable"
                        : ""
                    }`}
                    id={image.id}
                    key={`draggable-${image.id}`}
                  >
                    <button
                      aria-label={image.a11ylabel}
                      data-source={image.label}
                      data-label={image.label}
                      className="accessible-btn"
                      data-id={image.id}
                      onClick={(e) => {
                        const { source, label, id } = e.target.dataset;
                        setActiveItem({ source, label });
                        activeItemRef.current = { source, label, id };
                        setA11yDnD(true);
                      }}
                    ></button>
                    <div
                      className={`draggable`}
                      data-label={image.label}
                      data-source={image.source}
                      data-id={image.id}
                      tabIndex="-1"
                      aria-hidden="true"
                      onClick={(e) => {
                        const source = image.source;
                        const label = image.label;
                        const id = image.id;

                        setActiveItem({ source, label });
                        activeItemRef.current = { source, label, id };
                        setA11yDnD(true);
                      }}
                    >
                      <img
                        src={image.imgSrc}
                        aria-hidden
                        alt={image.a11ylabel}
                      />
                      {/* <p>{image.text}</p> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="draggable-text">
              {draggableImg.map((image, index) => {
                return (
                  <div
                    style={{ zIndex: "auto" }}
                    className={`text-name imgname${image.text}`}
                    aria-hidden="true"
                    key={`img-name${index}`}
                  >
                    {image.text}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="buttons2">
            {showanswer ? (
              <button
                disabled={
                  droppedItems2.length == 3 && showfinalize ? false : true
                }
                className={`btn1 item-col hotspot hotspot210${
                  !currentHotspotPopup.includes("hotspot210") ? "" : "_active"
                }`}
                onClick={() => {
                  setshowfinalize(false);
                  toggleHotspotPopupHandler("hotspot210");
                }}
                onKeyDown={(e) => {
                  return onKeyDown(e, "hotspot210");
                }}
                aria-label={`${hotSpotData32[0].label} ${
                  currentHotspotPopup.includes("hotspot210")
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes("hotspot210") ? "visited" : ""}`}
              >
                {buttontext.button1}
              </button>
            ) : (
              <button
                disabled={
                  droppedItems2.length == 3 && showfinalize ? false : true
                }
                className={`btn1 item-col hotspot hotspot220${
                  !currentHotspotPopup.includes("hotspot220") ? "" : "_active"
                }`}
                onClick={() => {
                  setshowfinalize(false);
                  toggleHotspotPopupHandler("hotspot220");
                }}
                onKeyDown={(e) => {
                  return onKeyDown(e, "hotspot220");
                }}
                aria-label={`${hotSpotData32[0].label} ${
                  currentHotspotPopup.includes("hotspot220")
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes("hotspot220") ? "visited" : ""}`}
              >
                {buttontext.button1}
              </button>
            )}
            <button
              className={`reset`}
              onClick={resetall1}
              aria-label={`Reset`}
              disabled={droppedItems2.length > 0 ? false : true}
            >
              {/* <i className="fa fa-rotate-right" aria-hidden="true"></i> */}
              <span className="btn_text btn_reset">{buttontext.button3}</span>
            </button>
          </div>
        </>
      )}
      {currentSubTab == 2 && (
        <>
          <div
            id={`discover-container${thisback}`}
            className={`droppable-container`}
            // role="img"
          >
            <div id={`dropzone${thisback}`} className="dropzone"></div>
            <div role="img" className="sr-image"></div>
            <div role="img" className="sr-image" aria-label={altText2}></div>
            <AccessibleList
              list={dropZone}
              opened={a11yDnD}
              onClick={onA11yDrop}
              closeList={() => {
                setA11yDnD(false);
              }}
              // label={props.dropzone.label}
            />
            {droppedItems3.map((item, index) => {
              const label = draggableImg.filter((e) => e.source == item.source);
              return (
                <div
                  aria-hidden="true"
                  data-source={item.source}
                  data-id={item.label.toString().toLowerCase()}
                  id={item.label.toString().toLowerCase()}
                  key={`subTab2-${index}`}
                  data-prevent-drop
                  style={{
                    top: `${item.position.top - 8}px`,
                    left: `${item.position.left - 118}px`,
                  }}
                  aria-label={item.label}
                  className={`dropped-item drag-item ${item.id}`}
                >
                  <div className={item.label} />
                </div>
              );
            })}
          </div>
          <div className="white-board">
            <div className="drag-container">
              {draggableImg.map((image) => {
                const droppedItems3Labels = droppedItems3.map((i) => i.label);
                return (
                  <div
                    className={`drag-item ${image.id} ${
                      droppedItems3Labels.length == 3 ||
                      droppedItems3Labels.includes(image.label)
                        ? "disabledraggable"
                        : ""
                    }`}
                    id={image.id}
                    key={`draggable-${image.id}`}
                  >
                    <button
                      aria-label={image.a11ylabel}
                      data-source={image.label}
                      data-label={image.label}
                      className="accessible-btn"
                      data-id={image.id}
                      onClick={(e) => {
                        const { source, label, id } = e.target.dataset;
                        setActiveItem({ source, label });
                        activeItemRef.current = { source, label, id };
                        setA11yDnD(true);
                      }}
                    ></button>
                    <div
                      className={`draggable`}
                      data-label={image.label}
                      data-source={image.source}
                      data-id={image.id}
                      tabIndex="-1"
                      aria-hidden="true"
                      onClick={(e) => {
                        const source = image.source;
                        const label = image.label;
                        const id = image.id;
                        setActiveItem({ source, label });
                        activeItemRef.current = { source, label, id };
                        setA11yDnD(true);
                      }}
                    >
                      <img
                        src={image.imgSrc}
                        aria-hidden
                        alt={image.a11ylabel}
                      />
                      {/* <p>{image.text}</p> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="draggable-text">
              {draggableImg.map((image, index) => {
                return (
                  <div
                    style={{ zIndex: "auto" }}
                    className={`text-name imgname${image.text}`}
                    aria-hidden="true"
                    key={`draggable-text${index}`}
                  >
                    {image.text}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="buttons3">
            {showanswer ? (
              <button
                disabled={
                  droppedItems3.length == 3 && showfinalize ? false : true
                }
                className={`btn1 item-col hotspot hotspot310${
                  !currentHotspotPopup.includes("hotspot310") ? "" : "_active"
                }`}
                onClick={() => {
                  setshowfinalize(false);
                  toggleHotspotPopupHandler("hotspot310");
                }}
                onKeyDown={(e) => {
                  return onKeyDown(e, "hotspot310");
                }}
                // tabIndex={isPopupActive ? "-1" : null}
                aria-label={`${hotSpotData33[0].label} ${
                  currentHotspotPopup.includes("hotspot310")
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes("hotspot310") ? "visited" : ""}`}
              >
                {buttontext.button1}
              </button>
            ) : (
              <button
                disabled={
                  droppedItems3.length == 3 && showfinalize ? false : true
                }
                className={`btn1 item-col hotspot hotspot320${
                  !currentHotspotPopup.includes("hotspot320") ? "" : "_active"
                }`}
                onClick={() => {
                  setshowfinalize(false);
                  toggleHotspotPopupHandler("hotspot320");
                }}
                onKeyDown={(e) => {
                  return onKeyDown(e, "hotspot320");
                }}
                aria-label={`${hotSpotData33[0].label} ${
                  currentHotspotPopup.includes("hotspot320")
                    ? commonWords.selected
                    : ""
                } ${hotSpotsVisited.includes("hotspot320") ? "visited" : ""}`}
              >
                {buttontext.button1}
              </button>
            )}
            <button
              className={`reset`}
              onClick={resetall2}
              aria-label={`Reset`}
              disabled={droppedItems3.length > 0 ? false : true}
            >
              {/* <i className="fa fa-rotate-right" aria-hidden="true"></i> */}
              <span className="btn_text btn_reset">{buttontext.button3}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Activity;
