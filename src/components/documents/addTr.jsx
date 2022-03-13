import React, { useEffect, useState } from "react";

import "./billsForm.sass";

export const AddTr = (props) => {
  const [strObj, setStrObj] = useState({
    nameService: "",
    numberServices: 1,
    units: "",
    unitPrice: 0,
  });
  const [column, setColumn] = useState(null);

  const handleDblClick = (e) => {
    let col = e.currentTarget.cellIndex;
    setColumn(col);
  };
  const handleChange = (e) => {
    let obj = { ...strObj };
    switch (column) {
      case 1:
        obj.nameService = e.currentTarget.value;
        break;
      case 2:
        obj.numberServices = Number(e.currentTarget.value);
        break;
      case 3:
        obj.units = e.currentTarget.value;
        break;
      case 4:
        obj.unitPrice = Number(e.currentTarget.value);
        break;
      default:
        break;
    }
    setStrObj(obj);
  };
  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      setColumn(null);
      props.getAddStr(strObj);
    }
  };
  useEffect(() => {
    if (props.addStrObj != null) {
      setStrObj(props.addStrObj);
    }
  }, [props.addStrObj]);

  return (
    <tr>
      <td style={{ textAlign: "center", border: "1px solid black" }}>
        {props.numberStr}
      </td>
      <td style={{ border: "1px solid black" }} onDoubleClick={handleDblClick}>
        {column == 1 ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strObj.nameService}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strObj.nameService
        )}
      </td>
      <td
        style={{ textAlign: "center", border: "1px solid black" }}
        onDoubleClick={handleDblClick}
      >
        {column == 2 ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strObj.numberServices}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strObj.numberServices
        )}
      </td>
      <td
        style={{ textAlign: "center", border: "1px solid black" }}
        onDoubleClick={handleDblClick}
      >
        {column == 3 ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strObj.units}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strObj.units
        )}
      </td>
      <td
        style={{ textAlign: "center", border: "1px solid black" }}
        onDoubleClick={handleDblClick}
      >
        {column == 4 ? (
          <input
            type="text"
            className="billsFormInvoiceInput"
            value={strObj.unitPrice}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        ) : (
          strObj.unitPrice
        )}
      </td>
      <td style={{ textAlign: "center", border: "1px solid black" }}>
        {strObj.unitPrice * strObj.numberServices}
      </td>
    </tr>
  );
};
