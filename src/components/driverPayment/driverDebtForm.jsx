import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./driverPaymentForm.sass";

export const DriverDebtForm = () => {
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.originOdersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [idChoisenDriver, setIdChoisenDriver] = useState(null);

  useEffect(() => {
    let [...arr] = odersList.filter(
      (item) => item.idDriver == idChoisenDriver && item.driverPayment != "Ок"
    );
    let clone = [];
    let sum = 0;
    arr.forEach((element) => {
      clone.push(Object.assign({}, element));
      sum =
        sum +
        Number(element.customerPrice) -
        Number(element.partialPaymentAmount);
    });
    console.log(clone);
  }, [idChoisenDriver, driversList]);

  const setValue = () => {};
  return (
    <div className="driverDebtMainDiv">
      <header className="driverDebtHeader">
        <div className="driverDebtHeaderDiv">
          <p className="driverPaymentHeaderP">Перевозчик</p>
          <div className="customeerPaymentWrapperChoiseDiv">
            <div className="divChoise">
              <ChoiseList
                name="oders"
                arrlist={driversList}
                setValue={setValue}
              />
            </div>
          </div>
        </div>
      </header>
      <p>Форма долг </p>
    </div>
  );
};
