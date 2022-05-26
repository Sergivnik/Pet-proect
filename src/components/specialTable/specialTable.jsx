import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SpecialTableTr } from "./specialTableTr.jsx";
import "./specialTable.sass";
import { SpecialTableHeaderTr } from "./specilTableHeaderTr.jsx";

export const SpecialTable = () => {
  const addTable = useSelector((state) => state.oderReducer.addtable);
  const ordersList = useSelector((state) => state.oderReducer.odersList);
  const customerList = useSelector((state) => state.oderReducer.clientList);

  const [currentId, setCurrentId] = useState(null);
  const [tableDataOrigin, setTableDataOrigin] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState({
    customerId: [],
    safe: [],
    card: [],
    customerPayment: [],
    returnPayment: [],
  });

  const getCurrentId = (id) => {
    console.log(id);
    setCurrentId(id);
  };

  const getFilteredList = (list) => {
    console.log("getFilteredList", list);
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
    setTableDataOrigin(arr);
    setTableData(arr);
    let idList = [];
    let ordersIdList = [];
    arr.forEach((elem) => {
      if (idList.indexOf(elem.customerId) === -1) {
        idList.push(elem.customerId);
      }
    });
    idList.forEach((elem) => {
      let value = customerList.find((customer) => customer._id == elem).value;
      ordersIdList.push({ id: elem, value: value, checked: true });
    });
    setFilterData({
      customerId: ordersIdList,
      safe: [
        { id: 0, value: "нет", checked: true },
        { id: 1, value: "Ок", checked: true },
      ],
      card: [
        { id: 0, value: "нет", checked: true },
        { id: 1, value: "Ок", checked: true },
      ],
      customerPayment: [
        { id: 0, value: "нет", checked: true },
        { id: 1, value: "Ок", checked: true },
      ],
      returnPayment: [
        { id: 0, value: "нет", checked: true },
        { id: 1, value: "Ок", checked: true },
      ],
    });
  }, [addTable]);

  return (
    <div className="specialTableMainDiv">
      <table className="specialTableMainTable">
        <thead className="specialTableThead">
          <SpecialTableHeaderTr
            filterData={filterData}
            getFilteredList={getFilteredList}
          />
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
