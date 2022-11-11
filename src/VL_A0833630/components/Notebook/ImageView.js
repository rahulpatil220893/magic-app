import React, { useEffect, useRef } from "react";
import NotebookTextEditorContainer from "../../containers/NotebookTextEditorContainer";

function ImageView(props) {
  const canvas = useRef();

  useEffect(() => {
    var canv = canvas.current;
    var ctx = canv.getContext("2d");
    window.devicePixelRatio = 3; //Clear Text
    var width = "571";
    var height = "296";
    var size = 150;
    canv.style.width = width + "px";
    canv.style.height = height + "px";

    var scale = window.devicePixelRatio;

    canv.width = Math.floor(width * scale);
    canv.height = Math.floor(height * scale);

    ctx.scale(scale, scale);
    ctx.font = "16px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0, 571, 296);
    };
    image.src = props.data.image;
  }, [props.data.image]);

  const onChange = (data) => {
    let _screen = {
      [`not_scorable_screen_${props.data.pageDetails}`]: data,
    };
    props.updateNotebookModelsData(_screen);
    if (data == "") {
      props.markCompletedNoteBook(props.data, "remove");
    } else {
      props.markCompletedNoteBook(props.data, "add");
    }
  };
  const { t, heading, screenshotAtext } = props;
  return (
    <div className="vl-notebook-image-page">
      <canvas
        id={canvas}
        ref={canvas}
        className="canvas-container"
        position="absolute"
        width="571"
        height="296"
      ></canvas>
      <div
        role="img"
        className="screenshot-image"
        aria-label={screenshotAtext}
      ></div>
      <NotebookTextEditorContainer
        html={props.model[`not_scorable_screen_${props.data.pageDetails}`]}
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

export default ImageView;
