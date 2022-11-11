import React from "react";

const View23 = (props) => {
  const { t } = props;
  const columnHeading = JSON.parse(t(`notebook.page4.columnHeading`));
  const columnRowData = JSON.parse(t(`notebook.page4.rowData`));
  return (
    <div className="vl-notebook-text-page explore-3">
      <p dangerouslySetInnerHTML={{ __html: t(`notebook.page4.text1`) }} />
      <div className="table-container">
        <table>
          <caption
            dangerouslySetInnerHTML={{ __html: t(`notebook.page4.caption`) }}
          />
          <thead>
            <tr>
              {columnHeading.map((item, i) => (
                <th className="tableheading" key={`explore-3-head-${i}`}>
                  <span>{item}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columnRowData.map((item, i) => (
              <tr key={`explore-3-body-${i}`}>
                <td>{item.val1}</td>
                <td>
                  <div
                    data-column={columnHeading[0]}
                    data-row={i + 1}
                    className="content-editable"
                    aria-label={`${item.val1} row ${i + 1} column 2 ${
                      columnHeading[0]
                    }`}
                    role="textbox"
                    contentEditable="true"
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View23;
