import React from "react";

function NotebookAlert({ noteBookData }) {
  return (
    <div className="vl-notebook-alert-content">{noteBookData.maxPages}</div>
  );
}

NotebookAlert.defaultProps = {
  t: () => {},
};

export default NotebookAlert;
