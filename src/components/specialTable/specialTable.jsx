import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SpecialTableTr } from "./specialTableTr.jsx";
import "./specialTable.sass";
import { SpecialTableHeaderTr } from "./specilTableHeaderTr.jsx";

export const SpecialTable = () => {
  const cloneFilter = (objFikter) => {
    let newObjFilter = {};
    for (let key in objFikter) {
      newObjFilter[key] = [];
      objFikter[key].forEach((obj) => {
        newObjFilter[key].push({ ...obj });
      });
    }
    return newObjFilter;
  };

  const addTable = useSelector((state) => state.oderReducer.addtable);
  const ordersList = useSelector((state) => state.oderReducer.odersList);
  const customerList = useSelector((state) => state.oderReducer.clientList);

  const [currentId, setCurrentId] = useState(null);
  const [tableDataOrigin, setTableDataOrigin] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterDataOrigin, setFilterDataOrigin] = useState({
    customerId: [],
    safe: [],
    card: [],
    customerPayment: [],
    returnPayment: [],
  });
  const [filterData, setFilterData] = useState({
    customerId: [],
    safe: [],
    card: [],
    customerPayment: [],
    returnPayment: [],
  });
  const [sum, setSum] = useState(0);

  const getCurrentId = (id) => {
    setCurrentId(id);
  };
  const isCondition = (filterObj, elem) => {
    let checkConditions = true;
    for (let key in filterObj) {
      let isChoisen = filterObj[key].find(
        (elemFilter) => elemFilter.id == elem[key]
      );
      if (checkConditions) checkConditions = isChoisen?.checked;
    }
    return checkConditions;
  };
  const getFilteredList = (name, list) => {
    const getUniqueKey = (tableArr, fiterObj, key) => {
      let newFilterArrKey = [];
      tableArr.forEach((elem) => {
        if (newFilterArrKey.findIndex((item) => item.id == elem[key]) == -1) {
          let newElem = fiterObj[key].find((item) => item.id == elem[key]);
          newFilterArrKey.push(newElem);
        }
      });
      return newFilterArrKey;
    };

    let objFilter = cloneFilter(filterDataOrigin);
    objFilter[name] = list;
    setFilterDataOrigin(objFilter);

    let arrTable = tableDataOrigin.filter((elem) =>
      isCondition(objFilter, elem)
    );
    setTableData(arrTable);

    let newFilter = {};
    for (let key in objFilter) {
      let filterObjKey = {};
      for (let key in objFilter) {
        filterObjKey[key] = [];
        objFilter[key].forEach((obj) => {
          filterObjKey[key].push({ ...obj });
        });
      }
      filterObjKey[key].forEach((elem) => {
        elem.checked = true;
      });
      let arrTableKey = tableDataOrigin.filter((elem) =>
        isCondition(filterObjKey, elem)
      );
      newFilter[key] = getUniqueKey(arrTableKey, objFilter, key);
    }
    setFilterData(newFilter);
    console.log("test", newFilter);
  };

  useEffect(() => {
    let [...arr] = addTable;
    arr.sort((a, b) => {
      let aOrder = ordersList.find((elem) => elem._id == a.orderId);
      let bOrder = ordersList.find((elem) => elem._id == b.orderId);
      if (aOrder.accountNumber > bOrder.accountNumber) {
        if (aOrder.accountNumber == null) {
          return 1;
        } else {
          return -1;
        }
      }
      if (aOrder.accountNumber == bOrder.accountNumber) return 0;
      if (aOrder.accountNumber < bOrder.accountNumber) {
        if (aOrder.accountNumber == null) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    setTableDataOrigin(arr);

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
    let objFilter = {
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
        { id: 1, value: "Ок", checked: false },
      ],
    };
    setFilterDataOrigin(objFilter);
    setFilterData(cloneFilter(objFilter));
    let arrTable = arr.filter((elem) => isCondition(objFilter, elem));
    setTableData(arrTable);
  }, []);

  useEffect(() => {
    let [...arr] = addTable;
    arr.sort((a, b) => {
      let aOrder = ordersList.find((elem) => elem._id == a.orderId);
      let bOrder = ordersList.find((elem) => elem._id == b.orderId);
      if (aOrder.accountNumber > bOrder.accountNumber) {
        if (aOrder.accountNumber == null) {
          return 1;
        } else {
          return -1;
        }
      }
      if (aOrder.accountNumber == bOrder.accountNumber) return 0;
      if (aOrder.accountNumber < bOrder.accountNumber) {
        if (aOrder.accountNumber == null) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    setTableDataOrigin(arr);
  }, [addTable]);

  useEffect(() => {
    let sum = 0;
    tableData.forEach((elem) => {
      let price = ordersList.find(
        (order) => order._id == elem.orderId
      ).customerPrice;
      sum = sum + ((price - elem.sum) * (100 - elem.interest)) / 100;
    });
    setSum(sum);
  }, [tableData]);
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
        <tfoot className="specialTableBody">
          <tr>
            <td></td>
            <td>{sum}</td>
            <td colSpan={6}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
