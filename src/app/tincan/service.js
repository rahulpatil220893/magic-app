let TincanService = {};
let tcConfig = {};
let winPostMsgPromise = null;
let winPostMsgPromiseResolveFunc = null;
let winCommitPostMsgListener = null;
let hostWindow = null;

TincanService.getURL = () => {
  const objAgent = {
    objectType: "Agent",
    account: tcConfig.account,
  };
  const stragent = encodeURI(JSON.stringify(objAgent));
  let url = encodeURI(
    tcConfig.endpoint +
      "/activities/state/?activityId=https://" +
      ACTIVITY_CONFIG.scoId +
      "&"
  );
  url += encodeURI(
    "stateId=state&agent=" + stragent + "&registration=" + tcConfig.registration
  );
  return url;
};

TincanService.getRequestHeader = () => {
  const obj = {
    Authorization: tcConfig.authorization.header[0].value,
    Accept: "application/json; charset=utf8",
    "Content-Type": "application/json; charset=utf8",
  };

  return obj;
};

TincanService.postSCOSaveData = (objData) => {
  const url = TincanService.getURL();
  const headers = TincanService.getRequestHeader();

  return fetch(url, {
    method: "post",
    headers,
    body: JSON.stringify(objData),
  }).then((response) => {
    return response.json();
  });
};

TincanService.getSCOData = (strToken) => {
  const url = TincanService.getURL();
  const headers = TincanService.getRequestHeader();

  return fetch(url, {
    headers,
  }).then((response) => {
    return response.json();
  });
};

TincanService.validateTCConfigData = (objTCData) => {
  let isValidData = true;

  if (
    objTCData.account == undefined ||
    objTCData.mode == undefined ||
    objTCData.registration == undefined ||
    objTCData.endpoint == undefined ||
    objTCData.authorization == undefined
  ) {
    isValidData = false;
  }

  if (isValidData == true) {
    if (
      objTCData.authorization.header == undefined ||
      objTCData.authorization.expiration == undefined
    ) {
      isValidData = false;
    }
  }

  if (isValidData == true) {
    if (objTCData.authorization.header[0].value == undefined) {
      isValidData = false;
    }
  }

  if (isValidData == false) {
    console.warn("Invalid TCConfig Data");
  }

  return isValidData;
};

TincanService.receiveTCConfig = (event) => {
  if (event.data.action == "tcConfig") {
    hostWindow = event.source;

    tcConfig = event.data;
    if (tcConfig.scaledPassingScore == undefined) {
      tcConfig.scaledPassingScore = 0.6;
    }

    if (tcConfig.completionThreshold == undefined) {
      tcConfig.completionThreshold = 1;
    }

    winPostMsgPromiseResolveFunc(tcConfig);
    winPostMsgPromise = null;
  } else if (event.data.action == "authorization") {
    winPostMsgPromiseResolveFunc(event.data);
    winPostMsgPromise = null;
  } else if (event.data.action == "commit") {
    winCommitPostMsgListener();
    winPostMsgPromise = null;
  }
};

TincanService.addWindowMessageEventListener = (funcListener) => {
  winCommitPostMsgListener = funcListener;
  window.addEventListener("message", TincanService.receiveTCConfig);
};

TincanService.sendWindowPostMessage = (objData) => {
  let nWinCounter = 0;

  winPostMsgPromise = new Promise(function (resolve, reject) {
    winPostMsgPromiseResolveFunc = resolve;

    if (hostWindow != null) {
      hostWindow.postMessage(objData, "*");
    } else {
      let currentWindow = window;
      const sendMessageToParentWindow = function (win, isOpener) {
        if (win !== currentWindow) {
          currentWindow = win;
          nWinCounter++;
          if (win != null) {
            win.postMessage(objData, "*");
          }

          if (nWinCounter < 5 && isOpener == undefined) {
            sendMessageToParentWindow(win.parent);
          }
        }
      };

      sendMessageToParentWindow(window.parent);
      if (window.opener !== currentWindow) {
        sendMessageToParentWindow(window.opener, true);
      }
    }
  });

  return winPostMsgPromise;
};

TincanService.updateTincanConfig = (objConfig) => {
  tcConfig = objConfig;
};

module.exports = TincanService;
