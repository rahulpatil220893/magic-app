import React from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

const View3_ = (props) => {
  const onChange = (data) => {
    props.updateNotebookModelsData({
      introduce_textarea_5: data,
    });
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };
  const { t } = props;
  return (
    <div className="vl-notebook-text-page discover-2">
      <p dangerouslySetInnerHTML={{ __html: t(`notebook.page6.text1`) }} />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_5}
        onChange={onChange}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page6.content`)}
      />
    </div>
  );
};
export default View3_;
