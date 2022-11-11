import React, { useEffect } from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

function TextView(props) {
  const onChange = (data) => {
    let _model = {
      [`not_scorable_model_${props.data.pageDetails}`]: data,
    };
    props.updateNotebookModelsData(_model);
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };
  const { t, heading, tab } = props;
  return (
    <div className={`vl-notebook-text-page conclude`}>
      <NotebookTextEditorContainer
        html={props.model[`not_scorable_model_${props.data.pageDetails}`]}
        onChange={onChange}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={`${t(`labGloabalData.label`)} ${heading} ${t(
          `labGloabalData.screen`
        )}`}
      />
    </div>
  );
}

export default TextView;
