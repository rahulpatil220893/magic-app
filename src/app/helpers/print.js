export const printStyles = `.print-bg {
  background: #FFFFFF;
}

.print-bg .print-container {
  width: 720px;
  height: 995px;
  position: absolute;
  top: 0px;
  left: 0px;
}

.print-bg .print-container .print-header {
  position: relative;
  top: 35px;
  color: #000000;
  font-size: 20px;
  font-family: AvenirHeavy;
  /*need to embed font*/
  width: 100%;
  height: 120px;
  padding-left: 12px;
  box-sizing: border-box;
  text-align: left;
}

.print-bg .print-container .print-header .same-line {
  display: inline;
}

.print-bg .print-container .print-header .header-info {
  font-family: AvenirRoman;
  border-bottom: 1px solid;
  width: 300px;
  height: 20px;
  display: inline-block;
  position: relative;
}

.print-bg .print-container .print-header label {
  width: 70px;
  display: inline-block;
}

.print-bg .print-container .print-header .header-info_1 {
  width: 290px;
}

.print-bg .print-container .print-header .header-info_2 {
  /*width: 615px;*/
  width: 537px;
}

.print-bg .print-container .print-header .header-info_3 {
  /*width: 625px;*/
  width: 272px;
}

.print-bg .print-container .print-header .header-info2 {
  font-family: AvenirRoman;
}

.print-bg .print-container .print-body {
  position: relative;
  top: 25px;
  color: #000000;
  font-size: 20px;
  font-family: AvenirHeavy;
  width: 100%;
  height: 830px;
  padding: 20px 20px 10px 35px;
  box-sizing: border-box;
}

.print-bg .print-container .print-footer {
  color: #000000;
  font-size: 12px;
  font-family: "AvenirHeavy";
  width: 100%;
  height: 15px;
  box-sizing: border-box;
  position: absolute;
  bottom: -175x;
  text-align: center;
}

.print-section {
  padding-top: 18px;
}

_::-webkit-full-page-media,
_:future,
:root .print-bg .print-container {
  height: 940px;
}

_::-webkit-full-page-media,
_:future,
:root .print-bg .print-container .print-body {
  height: 785px;
}

@media print {
  .print-container {
      display: block;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .print-container {
      height: 990px;
  }

  .print-bg .print-container .print-body {
      height: 860px;
  }
}`;