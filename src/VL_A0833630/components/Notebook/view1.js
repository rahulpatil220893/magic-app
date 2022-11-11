import React from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

import { useState } from "react";

const View1 = (props) => {
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
    if (arr.length == 2) {
      if (data == "") {
        props.markCompletedNoteBook(props.data, "remove");
      } else {
        props.markCompletedNoteBook(props.data, "add");
      }
    }
  };

  const { t } = props;

  return (
    <div className="vl-notebook-text-page scenario-1">
      <p
        className="introduce_textarea_2"
        dangerouslySetInnerHTML={{ __html: t(`notebook.page2.text1`) }}
      />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_2}
        onChange={(e) => onChange(e, 2)}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page2.content`)}
      />
      <p
        className="introduce_textarea_3"
        dangerouslySetInnerHTML={{ __html: t(`notebook.page2.text2`) }}
      />
      <NotebookTextEditorContainer
        html={props.model.introduce_textarea_3}
        onChange={(e) => onChange(e, 3)}
        placeholder={t(`labGloabalData.placeHolderData`)}
        t={props.t}
        label={t(`notebook.page2.content2`)}
      />
    </div>
  );
};

export default View1;
