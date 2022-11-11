// import PropTypes from 'prop-types';
let localPersistence = false;
let tcConfigData = {};
let authorizationTimeout = null;
let isCommitRequestRaised = false;
let initializeApp = null;

export const init = (tincanData, callback) => {
  initializeApp = callback;
  TincanManager.setTincanData(tincanData);
  TincanService.addWindowMessageEventListener(commitPostMsgListener);

  let arr = window.location.search.substring(1).split("&");
  if (arr.indexOf("localpersistence=true") > -1) {
    localPersistence = true;
  }

  if (arr.indexOf("tc=y") > -1) {
    TincanService.sendWindowPostMessage(
      {
        action: "getTCConfig",
        scoId: ACTIVITY_CONFIG.scoId,
      },
      ACTIVITY_CONFIG.scoId
    ).then(
      (data) => {
        tcConfigData = data;

        TincanManager.mode = tcConfigData.mode;

        if (tcConfigData.mode === "review" || tcConfigData.mode === "browse") {
          TincanManager.reviewMode = true;
        }

        if (tcConfigData.mode === "normal" || tcConfigData.mode === "review") {
          runAuthorizationTimer();
          getTincanData();
        } else {
          initializeApp();
        }
      },
      () => {}
    );
  }
};

const commitPostMsgListener = () => {
  isCommitRequestRaised = true;
  saveTincanData();
};

const runAuthorizationTimer = () => {
  if (tcConfigData.authorization != undefined) {
    if (tcConfigData.authorization.expiration != undefined) {
      let intTime =
        parseInt(tcConfigData.authorization.expiration) * 1000 - 300000;

      authorizationTimeout = setTimeout(() => {
        TincanService.sendWindowPostMessage({
          action: "getAuthorization",
        }).then((data) => {
          tcConfigData.authorization = data.authorization;
          tcConfigData.session = data.session;
          TincanService.updateTincanConfig(tcConfigData);
          runAuthorizationTimer();
          clearTimeout(authorizationTimeout);
          authorizationTimeout = null;
        });
      }, intTime);

      setTimeout(() => {
        TincanService.sendWindowPostMessage({
          action: "getAuthorization",
        }).then(() => {});
      }, 10000);
    }
  }
};

const getTincanData = () => {
  if (localPersistence) {
    let objLocalS = localStorage.getItem(ACTIVITY_CONFIG.scoId);
    objLocalS = JSON.parse(objLocalS);

    if (objLocalS) {
      if (objLocalS.body !== undefined) {
        TincanManager.setTincanData(objLocalS.body);
      }
    }

    initializeApp();
  } else {
    TincanService.getSCOData().then(
      (response) => {
        if (response !== undefined && response !== null) {
          if (response.body !== undefined) {
            TincanManager.setTincanData(response.body);
          }
        }

        initializeApp();
      },
      () => {
        initializeApp();
      }
    );
  }
};

const sendCommitPostMessage = (stat) => {
  TincanService.sendWindowPostMessage(
    {
      action: "commit",
      result: stat,
    },
    ACTIVITY_CONFIG.scoId
  );
};

const getPOSTData = (mode) => {
  let objTincanData = TincanManager.data;
  let scaledVal = 0;
  if (Number(objTincanData.total_score) > 0) {
    scaledVal =
      Number(objTincanData.total_score) / Number(objTincanData.max_score);
    scaledVal = Math.round((scaledVal + 0.00001) * 100) / 100;
  }

  let strSuccessStatus = "failed";

  if (scaledVal >= Number(tcConfigData.scaledPassingScore)) {
    strSuccessStatus = "passed";
  }

  let strCompletionStatus = "incomplete";
  if (
    Number(objTincanData.total_score) / Number(objTincanData.max_score) ==
    Number(tcConfigData.completionThreshold)
  ) {
    strCompletionStatus = "completed";
  }

  let objData = {
    result: {
      score: {
        scaled: scaledVal,
        raw: Number(objTincanData.total_score),
        max: Number(objTincanData.max_score),
      },
      successStatus: strSuccessStatus,
      progressMeasure: scaledVal,
      completionStatus: strCompletionStatus,
      location:
        TincanManager.data.screens[TincanManager.data.selectedTabIndex].screen,
      totalTime: Number(objTincanData.total_time_spent),
      exit: mode,
    },
    body: objTincanData,
  };

  if (tcConfigData.session) {
    if (tcConfigData.session.id) {
      objData.session = {
        id: tcConfigData.session.id,
      };
    }
  }

  return objData;
};

export const saveTincanData = () => {
  if (tcConfigData.mode == "normal") {
    if (localPersistence) {
      let objDataToSave = {
        result: {},
        body: TincanManager.data,
        session: {},
      };
      // const size = new TextEncoder().encode(JSON.stringify(objDataToSave)).length
      // const kiloBytes = size / 1024;
      // const megaBytes = kiloBytes / 1024;
      // console.log(megaBytes)
      setTimeout(() => {
        localStorage.setItem(
          ACTIVITY_CONFIG.scoId,
          JSON.stringify(objDataToSave)
        );
      });
    } else {
      let objPostData = getPOSTData("suspend");
      TincanService.postSCOSaveData(objPostData).then(
        () => {
          if (isCommitRequestRaised) {
            isCommitRequestRaised = false;
            sendCommitPostMessage("succeeded");
          }
        },
        () => {
          if (isCommitRequestRaised) {
            isCommitRequestRaised = false;
            sendCommitPostMessage("failed");
          }
        }
      );
    }
  }
};

export const submitTincanData = () => {
  if (tcConfigData.mode == "normal") {
    if (localPersistence) {
      let objDataToSave = {
        result: {},
        body: TincanManager.data,
        session: {},
      };

      localStorage.setItem(
        ACTIVITY_CONFIG.scoId,
        JSON.stringify(objDataToSave)
      );
    } else {
      let objPostData = getPOSTData("normal");
      TincanService.postSCOSaveData(objPostData).then(
        () => {
          // sendCommitPostMessage("succeeded");
        },
        () => {
          // sendCommitPostMessage("failed");
        }
      );
    }

    TincanManager.reviewMode = true;
  }
};

// init.propTypes = {
//   TincanManager: PropTypes.object,
//   TincanService: PropTypes.object,
// };
// submitTincanData.propTypes = {
//   TincanManager: PropTypes.object,
//   TincanService: PropTypes.object,

// };
// saveTincanData.propTypes = {
//   TincanManager: PropTypes.object,
//   TincanService: PropTypes.object,

// };
