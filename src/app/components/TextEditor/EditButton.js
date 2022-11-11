import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';

function EditButton(props) {
  const {
    cmd,
    arg,
    // title,
    children,
    ...rest
  } = props;
  return (
    <Button
      type="button"
      {...rest}
      key={cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
    >
      {children && children}
    </Button>
  );
}
EditButton.propTypes = {
  notebookConfirmId: PropTypes.any,
  cmd: PropTypes.any,
  arg: PropTypes.any,
  // title: PropTypes.string,
  children: PropTypes.any,

}
export default EditButton;