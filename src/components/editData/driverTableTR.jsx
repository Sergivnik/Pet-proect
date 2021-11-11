import React, { useEffect, useState } from "react";

import "./editData.sass";

export const DriverTableTR = (props) => {
  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [widthTd, setWidthTd] = useState(null);

  const handleDBLclick = (e) => {
    setColNumber(e.currentTarget.cellIndex);
    props.getCurrentId(elem._id);
    console.log(e.currentTarget.offsetWidth);
    e.currentTarget.width = e.currentTarget.offsetWidth-2 + "px";
  };

  useEffect(() => {
    if (props.currentId != elem._id) setColNumber(null);
  }, [props.currentId]);
  return (
    <tr key={"driver" + elem._id}>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 0 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.value
        )}
      </td>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 1 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.phone
        )}
      </td>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 2 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.compfnyName
        )}
      </td>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 3 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.TIN
        )}
      </td>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 4 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.address
        )}
      </td>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 5 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.currentAccount
        )}
      </td>
      <td
        className="driverTd"
        onDoubleClick={handleDBLclick}
        onMouseDown={(e) => {
          if (e.currentTarget.tagName == "TD") e.preventDefault();
        }}
      >
        {colNumber == 6 ? (
          <input type="text" className="driverTrInput" />
        ) : (
          elem.contract
        )}
      </td>
    </tr>
  );
};
