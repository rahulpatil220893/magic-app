import React, { useState } from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

var TextView1 = (props) => {
  const onChange = (data) => {
    props.updateNotebookModelsData({
      introduce_textarea_1: data,
    });
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };

  const { t } = props;
  return (
    <div className="vl-notebook-text-page conclude">
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_1}
        onChange={onChange}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page1.content1`)}
      />
    </div>
  );
};

export default TextView1;
