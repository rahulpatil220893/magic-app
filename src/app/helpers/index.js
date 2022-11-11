import html2canvas from "html2canvas";
import { printStyles } from "./print.js";
import { t } from "i18next";
let timer;
export const debounce = (func, delay = 300) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    func();
  }, delay);
};

export const getCurrentPageIndexParentData = (notebookData, activeIndex) => {
  let activeNote = {
    data: notebookData[activeIndex],
    index: activeIndex,
  };

  if (activeNote.data.parent !== "") {
    let activeNoteParent = {};

    if (activeNote.data.subIndex !== "") {
      for (let j = 0; j < notebookData.length; j++) {
        if (
          notebookData[j].index === activeNote.data.parent &&
          notebookData[j].subIndex === activeNote.data.subIndex
        ) {
          activeNoteParent["data"] = notebookData[j];
          activeNoteParent["index"] = j;
          break;
        }
      }
      return activeNoteParent;
    } else {
      for (let j = 0; j < notebookData.length; j++) {
        if (notebookData[j].index === activeNote.data.parent) {
          activeNoteParent["data"] = notebookData[j];
          activeNoteParent["index"] = j;
          break;
        }
      }
      return activeNoteParent;
    }
  } else {
    return activeNote;
  }
};

export const isDevice = function () {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );
};

export const isIpadDevice = function () {
  return navigator.userAgent.match(/iPad/i) != null;
};

export const isAndroidDevice = function () {
  return /(android)/i.test(navigator.userAgent);
};

export const IsMac = function () {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
    ? true
    : false;
  const isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
  return isMac || isMacLike || isIOS;
};

/* Print page function */
export const print = function (element, data = {}, customView) {
  console.log(element);
  if (!element) return false;
  setTimeout(() => {
    const printWindow = isIpadDevice()
      ? window.open("", "Print-Page", "height=400,width=800")
      : null;

    const printView =
      customView && typeof customView === "function"
        ? customView
        : printDefaultView;
    html2canvas(element).then((canvas) => {
      const screenShot = canvas.toDataURL("image/png");
      const htmlcontents = printView(screenShot, data);
      printContainer(htmlcontents, data, printWindow);
    });
  });
};

/* Default body for print page */
export const printDefaultView = function (screenShot, printData) {
  return `<div>
  <div class="print-container">
     <div class="print-header">
         <div class="same-line"><label>${t(
           "print.Name"
         )} :</label><div class="header-info header-info_1"></div></div>
         <div class="same-line"><label>${t(
           "print.Class"
         )} :</label><div class="header-info header-info_3"></div></div><br/>
         <div class="print-section">${t(
           "print.SectionName"
         )}: <span class="header-info2">${printData.section}</span></div><br/>
     </div>
     <div class="print-body"><img src="${screenShot}" class="print-image" alt="" width="720"></div>
     <div class="print-footer">${printData.footer}</div>\
 </div>
</div>
`;
};

export const printContainer = function (body, printData, win) {
  if (isIpadDevice() || isAndroidDevice()) {
    let printWindow = !win
      ? window.open("", "Print-Page", "height=400,width=800")
      : win;
    printWindow.document.write(
      "<html><head><title>" + printData.title + "</title>"
    );
    //printWindow.document.write('<link href="main.css" rel="stylesheet">');
    // printWindow.document.write('<link href="css/comp.css" rel="stylesheet">');
    // printWindow.document.write(`<style>${printStyles}</style>`);
    printWindow.document.write('</head><body class="print-bg">');
    printWindow.document.write(body);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  } else {
    const framename = `frame${Math.floor(Math.random() * 10000)}`;
    const frame1 = document.createElement("iframe");
    frame1.name = framename;
    frame1.style.position = "absolute";
    frame1.style.top = "-1000px";
    document.body.appendChild(frame1);
    const frameDoc = frame1.contentWindow
      ? frame1.contentWindow
      : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write(
      '<html><head><title>"' + printData.title + '"</title>'
    );
    //frameDoc.document.write('<link href="main.css" rel="stylesheet">'); // commented by Syed
    // frameDoc.document.write('<link href="css/comp.css" rel="stylesheet">');
    // frameDoc.document.write(`<style>${printStyles}</style>`);
    frameDoc.document.write('</head><body class="print-bg">');
    frameDoc.document.write(body);
    frameDoc.document.write("</body></html>");
    frameDoc.document.close();

    setTimeout(() => {
      window.frames[framename].focus();
      if (IsMac() || isIpadDevice()) {
        setTimeout(() => {
          window.frames[framename].onafterprint = function () {
            document.body.removeChild(frame1);
          };
        }, 200);
        window.frames[framename].print();
      } else {
        window.frames[framename].print();
        document.body.removeChild(frame1);
      }
    }, 1000);
  }
  return;
};

export const getCurrentActiveTabIndexData = function (
  notebookData,
  currentActiveTabIndex
) {
  let activeNote = {};
  for (let i = 0; i < notebookData.length; i++) {
    if (notebookData[i].index == currentActiveTabIndex) {
      activeNote["data"] = notebookData[i];
      activeNote["index"] = i;
      break;
    }
    // if (currentActiveSubTabIndex === "") {
    //   if (notebookData[i].index == currentActiveTabIndex) {
    //     activeNote["data"] = notebookData[i];
    //     activeNote["index"] = i;
    //     break;
    //   }
    // } else {
    //   if (
    //     notebookData[i].index == currentActiveTabIndex &&
    //     notebookData[i].subIndex == currentActiveSubTabIndex
    //   ) {
    //     activeNote["data"] = notebookData[i];
    //     activeNote["index"] = i;
    //     break;
    //   }
    // }
  }

  return activeNote;
};

export const Keys = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  esc: 27,
  space: 32,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
};

export const guid = function () {
  let id = "";
  let i;
  let random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += "-";
    }
    // eslint-disable-next-line no-mixed-operators
    id += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return id;
};

export const navigate = function (focusedIndex, keyCode, altKey, total) {
  if (altKey) {
    return focusedIndex;
  }
  switch (keyCode) {
    case Keys.enter:
    case Keys.space:
    case Keys.esc:
      return -1;
    case Keys.up:
    case Keys.left:
      return Math.max(0, focusedIndex - 1);
    case Keys.down:
    case Keys.right:
      return Math.min(total - 1, focusedIndex + 1);
    default:
      return focusedIndex;
  }
};

export const classNames = function () {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args
    .filter(function (arg) {
      return arg !== true && !!arg;
    })
    .map(function (arg) {
      return Array.isArray(arg)
        ? exports.classNames.apply(void 0, arg)
        : typeof arg === "object"
        ? Object.keys(arg)
            .map(function (key, idx) {
              return arg[idx] || (arg[key] && key) || null;
            })
            .filter(function (el) {
              return el !== null;
            })
            .join(" ")
        : arg;
    })
    .filter(function (arg) {
      return !!arg;
    })
    .join(" ");
};

/**
 * @hidden
 * Dispatches a new event based on an event that was already internally dispatched to users.
 *
 * @param eventHandler - The public event handler that is assigned by the user.
 * When undefined, the method is not an option.
 * @param dispatchedEvent - The event that was already dispatched internally.
 * @param target - The target component of the new event.
 * @param eventData - The additional data that will be passed through the new event.
 * When the new event has no additional data
 *  other than the `BaseEvent` arguments, pass `undefined`.
 */
export const dispatchEvent = function (
  eventHandler,
  dispatchedEvent,
  target,
  eventData
) {
  if (eventHandler) {
    var eventBaseData = {
      syntheticEvent: dispatchedEvent,
      nativeEvent: dispatchedEvent.nativeEvent,
      target: target,
    };
    eventHandler.call(undefined, Object.assign(eventBaseData, eventData));
  }
};
//# sourceMappingURL=dispatchEvent.js.map
