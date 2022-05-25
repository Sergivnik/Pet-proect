import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import { SpecialTableTr } from "./specialTableTr.jsx";
import "./specialTable.sass";
import { SpecialTableHeaderTr } from "./specilTableHeaderTr.jsx";

export const SpecialTable = () => {
  const addTable = useSelector((state) => state.oderReducer.addtable);
  const ordersList = useSelector((state) => state.oderReducer.odersList);

  const [currentId, setCurrentId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState({
    customerId: [],
    safe: null,
    card: null,
    customerPayment: null,
    returnPayment: null,
  });

  const getCurrentId = (id) => {
    console.log(id);
    setCurrentId(id);
  };
  useEffect(() => {
    let [...arr] = addTable;
    arr.sort((a, b) => {
      let aOrder = ordersList.find((elem) => elem._id == a.orderId);
      let bOrder = ordersList.find((elem) => elem._id == b.orderId);
      if (aOrder.accountNumber > bOrder.accountNumber) return 1;
      if (aOrder.accountNumber == bOrder.accountNumber) return 0;
      if (aOrder.accountNumber < bOrder.accountNumber) return -1;
    });
    setTableData(arr);
    let ordersIdList = [];
    arr.forEach((elem) => {
      if (ordersIdList.indexOf(elem.customerId) === -1)
        ordersIdList.push(elem.customerId);
    });
    setFilterData({
      customerId: ordersIdList,
      safe: null,
      card: null,
      customerPayment: null,
      returnPayment: null,
    });
  }, [addTable]);

  return (
    <div className="specialTableMainDiv">
      <table className="specialTableMainTable">
        <thead className="specialTableThead">
          <SpecialTableHeaderTr filterData={filterData} />
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
