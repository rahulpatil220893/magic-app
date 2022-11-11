import React, { useState } from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

const View4 = (props) => {
  const [arrayLocation, setarrayLocation] = useState([]);
  const onChange = (data, location) => {
    let _location = {
      [`introduce_textarea_${location}`]: data,
    };
    props.updateNotebookModelsData(_location);
    let arr = [...arrayLocation];
    if (!arr.includes(location)) {
      arr = [...arr, location];
      setarrayLocation(arr);
    }
    if (arr.length == 1) {
      if (data == "") {
        props.markCompletedNoteBook(props.data, "remove");
      } else {
        props.markCompletedNoteBook(props.data, "add");
      }
    }
  };

  const { t } = props;
  return (
    <div className="vl-notebook-text-page Imagine">
      <p dangerouslySetInnerHTML={{ __html: t(`notebook.page9.text1`) }} />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_6}
        onChange={(e) => onChange(e, 6)}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page9.content1`)}
      />
    </div>
  );
};
export default View4;
