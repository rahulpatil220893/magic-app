let TincanManager = {};
TincanManager.startTime;
TincanManager.endTime;
TincanManager.spentTime;
TincanManager.lastView;
TincanManager.mode = "normal";
TincanManager.reviewMode = false;
TincanManager.data = {};

TincanManager.recordElapsedTime = function (obj, view, blaunch) {
  if (TincanManager.mode == "normal") {
    if (blaunch) {
      TincanManager.startTime = new Date();
    } else {
      TincanManager.endTime = new Date();
      TincanManager.spentTime = TincanManager.endTime - TincanManager.startTime;
      TincanManager.startTime = TincanManager.endTime;
    }

    if (TincanManager.lastView != null && view != TincanManager.lastView) {
      switch (TincanManager.lastView) {
        case "section_0":
        case "section_1":
        case "section_2":
        case "section_3":
        case "section_4":
          var ind = TincanManager.lastView.split("_")[1];
          var prev_spent_time = obj.screens[ind].time_spent;
          obj.screens[ind].time_spent =
            prev_spent_time + TincanManager.spentTime;
          obj.screens[ind].visited = true;
          break;
        case "notebook":
          break;
      }
    }

    TincanManager.lastView = view;

    TincanManager.calculateTotalTime(obj);
    TincanManager.calculatePercentageCompleted(obj, view);
  }
};

TincanManager.calculatePercentageCompleted = function () {};

TincanManager.msToTime = function (duration) {
  // var milliseconds = parseInt((duration % 1000) / 100),
  (seconds = parseInt((duration / 1000) % 60)),
    (minutes = parseInt((duration / (1000 * 60)) % 60)),
    (hours = parseInt((duration / (1000 * 60 * 60)) % 24));

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return parseInt(duration / 1000);
};

TincanManager.subtractTime = function () {};

TincanManager.addTime = function () {};

TincanManager.calculateTotalTime = function (objAppData) {
  var totalTime = 0;
  for (var i = 0; i < objAppData.screens.length; i++) {
    totalTime += objAppData.screens[i].time_spent;
  }
  totalTime = TincanManager.msToTime(totalTime);
  objAppData.total_time_spent = totalTime;
};

TincanManager.updateSectionTincanData = function (obj, view, key, value) {
  if (TincanManager.mode == "normal") {
    if (view != null && view != undefined) {
      var ind = view.split("_")[1];
      var currentSection = TincanManager.data.screens[ind];
      currentSection.elements[key] = value;
      if (currentSection.max_score === 1) {
        currentSection.score =
          typeof value.score !== "undefined" ? value.score : 1;
      } else if (currentSection.max_score > 1) {
        TincanManager.calculateSectionTotalScore(currentSection);
      }
    }

    TincanManager.calculateApplicationTotalScore(TincanManager.data);
  }
};

TincanManager.calculateSectionTotalScore = function (objSectionData) {
  if (objSectionData.max_score > 1) {
    objSectionData.score = 0;
    for (var elem in objSectionData.elements) {
      if (
        objSectionData.elements[elem] &&
        objSectionData.elements[elem].score
      ) {
        objSectionData.score += objSectionData.elements[elem].score;
      }
    }
    if (objSectionData.max_score < objSectionData.score) {
      objSectionData.score = objSectionData.max_score;
    }
  }
};

TincanManager.updateNoteBookTincanData = function (notebookData) {
  if (TincanManager.mode == "normal") {
    TincanManager.data.notebook.notebookSavedData = notebookData;
    // if (TincanManager.data.notebook.max_score === 1) {
    //   TincanManager.data.notebook.score = 1;
    // } else if (TincanManager.data.notebook.max_score > 1) {
    TincanManager.calculateNoteBookTotalScore(TincanManager.data.notebook);
    // }
    TincanManager.calculateApplicationTotalScore(TincanManager.data);
  }
};

TincanManager.calculateNoteBookTotalScore = function (objNoteBookData) {
  var notebookScore = 0;
  var objNoteBookSavedData = objNoteBookData.notebookSavedData;
  for (var nbModeKey in objNoteBookSavedData.model) {
    if (nbModeKey.indexOf("not_scorable") == -1) {
      if (
        objNoteBookSavedData.model[nbModeKey] &&
        typeof objNoteBookSavedData.model[nbModeKey] != "object" &&
        objNoteBookSavedData.model[nbModeKey] != ""
      ) {
        notebookScore += 1;
      } else if (typeof objNoteBookSavedData.model[nbModeKey] === "object") {
        if (objNoteBookSavedData.model[nbModeKey].score) {
          notebookScore += 1;
        }
      }
    }
  }

  objNoteBookData.score = notebookScore;
  if (objNoteBookData.max_score < objNoteBookData.score) {
    objNoteBookData.score = objNoteBookData.max_score;
  }
};

TincanManager.calculateApplicationTotalScore = function (objAppData) {
  objAppData.total_score = 0;
  for (var i = 0; i < objAppData.screens.length; i++) {
    objAppData.total_score += objAppData.screens[i].score;
  }

  objAppData.total_score += objAppData.notebook.score;

  if (objAppData.max_score < objAppData.total_score) {
    objAppData.total_score = objAppData.max_score;
  }
};

TincanManager.setTincanData = function (data) {
  TincanManager.data = data;
};

module.exports = TincanManager;
