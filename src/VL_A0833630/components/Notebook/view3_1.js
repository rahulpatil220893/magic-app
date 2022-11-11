import React from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

const View3_1 = (props) => {
  const onChange = (data) => {
    props.updateNotebookModelsData({
      introduce_textarea_7: data,
    });
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };
  const { t } = props;
  return (
    <div className="vl-notebook-text-page discover-3">
      <p dangerouslySetInnerHTML={{ __html: t(`notebook.page7.text1`) }} />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_7}
        onChange={onChange}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page7.content`)}
      />
    </div>
  );
};
export default View3_1;
