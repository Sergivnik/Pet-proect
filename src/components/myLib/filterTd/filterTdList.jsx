import React, { useEffect, useState } from "react";
import { InputText } from "../inputText.jsx";
import "./filterTd.sass";

export const FilterTdList = (props) => {
  const getText = () => {};
  return (
    <td className="filterTd">
      <div className="filterTdDiv">
        <InputText name="customer" typeInput="text" getText={getText} />
        {props.listId.map((id) => {
          let value = props.listElem.find((elem) => elem[props.fieldId] == id)[
            props.fieldValue
          ];
          return (
            <label key={id}>
              <input type="checkbox" />
              {value}
            </label>
          );
        })}
      </div>
    </td>
  );
};
