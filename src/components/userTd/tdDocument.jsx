import React, { useState } from "react";

export const TdDocument = (props) => {
  const [oderId, setOderId] = useState(null);
  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const handleMouseOver = (e) => {
    let id = Number(e.target.parentElement.id);
    setOderId(id);
  };
  const handleMouseLeave = (e) => {
    setOderId(null);
  };
  return (
    <td
      className="odersTd"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {props.customerPrice}
      {props.id == oderId && (
        <div className="oderTdTooltip">{DateStr(props.date)}</div>
      )}
    </td>
  );
};
