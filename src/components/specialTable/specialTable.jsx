import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import { SpecialTableTr } from "./specialTableTr.jsx";
import "./specialTable.sass";
import { SpecialTableHeaderTr } from "./specilTableHeaderTr.jsx";

export const SpecialTable = () => {
  const tableData = useSelector((state) => state.oderReducer.addtable);

  const [currentId, setCurrentId] = useState(null);

  const getCurrentId = (id) => {
    console.log(id);
    setCurrentId(id);
  };

  return (
    <div className="specialTableMainDiv">
      <table className="specialTableMainTable">
        <thead className="specialTableThead">
          <SpecialTableHeaderTr />
        </thead>
        <tbody className="specialTableBody">
          {tableData.map((elem) => {
            return (
              <SpecialTableTr
                key={elem.id}
                elem={elem}
                currentId={currentId}
                getCurrentId={getCurrentId}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
