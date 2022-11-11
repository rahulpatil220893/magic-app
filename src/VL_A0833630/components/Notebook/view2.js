import React from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

const View2 = (props) => {
  const onChange = (data) => {
    props.updateNotebookModelsData({
      introduce_textarea_4: data,
    });
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };
  const { t } = props;
  return (
    <div className="vl-notebook-text-page explore-2">
      <p dangerouslySetInnerHTML={{ __html: t(`notebook.page3.text1`) }} />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_4}
        onChange={onChange}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page3.content`)}
      />
    </div>
  );
};

export default View2;
