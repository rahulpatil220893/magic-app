import React from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

const View3 = (props) => {
  const onChange = (data) => {
    props.updateNotebookModelsData({
      introduce_textarea_8: data,
    });
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };
  const { t } = props;
  return (
    <div className="vl-notebook-text-page discover-1">
      <p dangerouslySetInnerHTML={{ __html: t(`notebook.page5.text1`) }} />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_8}
        onChange={onChange}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page5.content`)}
      />
    </div>
  );
};
export default View3;
