import React from "react";
import Button from "../Button";
import PropTypes from 'prop-types';
import { t } from "i18next";


function BottomPanel(props) {
  const { addnoteHandler, printHandler, resetHandler, t } = props;
  return (
    <div className="vl-bottom-panel">
      <div className="button-box">
        <Button
          className="imagine-buttons"
          title={t('conclude.bottomPanel.addNote')}
          aria-label={t('conclude.bottomPanel.addNote')}
          onClick={addnoteHandler}
        >
          <span className="icon-add" aria-hidden="true" />
        </Button>

        <Button
          className="imagine-buttons"
          title={t('conclude.bottomPanel.print')}
          aria-label={t('conclude.bottomPanel.print')}
          onClick={printHandler}
        >
          <span className="icon-print imagine-print" aria-hidden="true" />
        </Button>

        <Button
          title={t('conclude.bottomPanel.reset')}
          className="imagine-buttons"
          aria-label={t('conclude.bottomPanel.reset')}
          onClick={resetHandler}
        >
          <span className="icomoon-refresh" aria-hidden="true">
            <span className="path1" />
            <span className="path2" />
          </span>
        </Button>
      </div>
    </div>
  );
}
BottomPanel.propTypes = {
  addnoteHandler: PropTypes.func,
  printHandler: PropTypes.func,
  resetHandler: PropTypes.func,

}

BottomPanel.defaultProps = {
  t: () => { }
};
export default BottomPanel;
