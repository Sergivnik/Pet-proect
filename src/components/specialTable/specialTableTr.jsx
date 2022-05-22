import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editAddData } from "../../actions/specialAction";
import { dateLocal, findValueBy_Id } from "../myLib/myLib";
import { TdWithList } from "../myTd/tdWithList.jsx";
import "./specialTable.sass";

export const SpecialTableTr = (props) => {
  const dispatch = useDispatch();
  const elem = props.elem;
  const customers = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const orderPrice = findValueBy_Id(elem.orderId, odersList).customerPrice;

  const sum =
    ((Number(orderPrice) - Number(elem.sum)) * (100 - Number(elem.interest))) /
    100;
  const yesNoList = [
    { _id: 0, value: "нет" },
    { _id: 1, value: "Ок" },
  ];

  const [addData, setAddData] = useState({});
  useEffect(() => {
    setAddData(elem);
  }, [elem]);

  const callBack = (data) => {
    let { ...obj } = addData;
    if (data.name == "customer") {
      obj.customerId = data.id;
    }
    if (data.name == "safe") {
      obj.safe = data.id;
    }
    if (data.name == "card") {
      obj.card = data.id;
    }
    if (data.name == "customerPayment") {
      obj.customerPayment = data.id;
    }
    if (data.name == "returnPayment") {
      let now = new Date();
      obj.returnPayment = data.id;
      if (data.id == 1) {
        obj.date = now;
      } else {
        obj.date = null;
      }
    }
    setAddData(obj);
    dispatch(editAddData(obj));
  };
  return (
    <tr>
      <TdWithList
        name="customer"
        list={customers}
        id={addData.customerId}
        filedId="_id"
        field="value"
        callBack={callBack}
        showChoise={false}
      />
      <td className="specialTableBodyTd">{sum}</td>
      <TdWithList
        name="safe"
        list={yesNoList}
        id={addData.safe}
        filedId="_id"
        field="value"
        callBack={callBack}
        showChoise={true}
      />
      <TdWithList
        name="card"
        list={yesNoList}
        id={addData.card}
        filedId="_id"
        field="value"
        callBack={callBack}
        showChoise={true}
      />
      <td className="specialTableBodyTd">
        {findValueBy_Id(elem.orderId, odersList).accountNumber}
      </td>
      <TdWithList
        name="customerPayment"
        list={yesNoList}
        id={addData.customerPayment}
        filedId="_id"
        field="value"
        callBack={callBack}
        showChoise={true}
      />
      <TdWithList
        name="returnPayment"
        list={yesNoList}
        id={addData.returnPayment}
        filedId="_id"
        field="value"
        callBack={callBack}
        showChoise={true}
      />
      <td className="specialTableBodyTd">{dateLocal(addData.date)}</td>
    </tr>
  );
};
