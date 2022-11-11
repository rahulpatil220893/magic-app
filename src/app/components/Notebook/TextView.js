import React from 'react';
import TextEditorContainer from "../../../activity/containers/NotebookTextEditorContainer";

function TextView() {
  return (<div className="default-text-view"><TextEditorContainer className="textarea" placeholder="Type your notes here..." /></div>
  )
}

export default TextView;