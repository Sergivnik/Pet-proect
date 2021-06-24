import React from "react";

export const TdDate = (props) => {
   const DateStr = (date) => {
      date = new Date(date);
      return date.toLocaleDateString();
   };
   return <td className="odersTd">{DateStr(props.date)}</td>;
}